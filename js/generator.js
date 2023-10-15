import { algoProfondeur } from "./algoBacktracking.js"
import { displayMaze } from "./displayMaze.js"
import { buttonActive } from "./outils.js"

/****************************************************************************************
LOAD : INITIALISATION DES NOMBRES DE LIGNES ET COLONNES
****************************************************************************************/

const initSelect = (element, pas, max) => {
    let select = document.querySelector(element)
    let option = document.createElement("option")

    option.text = "--"
    option.value = ""
    select.appendChild(option)

    for(let n=pas; n<=max; n+=pas) {
        option = document.createElement("option")
        option.text = n
        option.value = n
        select.appendChild(option)
    }
}

window.addEventListener('load', initSelect("#lignes", 5, 80), initSelect("#colonnes", 5, 80))

/****************************************************************************************
LOAD : INITIALISATION DU FILTRE DIMENSION
****************************************************************************************/

const handleCheckboxDimensionClick = () => {
    const dimensionPerso = document.querySelector("#dimension-perso")

    document.querySelector("#select-perso").style.display = (dimensionPerso.checked ? "block" : "none")
}

document.querySelector("#dimension-perso").addEventListener("click", handleCheckboxDimensionClick)

/****************************************************************************************
FONCTION FENETRE MODALE MESSAGE
****************************************************************************************/

const displayMessage = (blnDisplay) => {
    document.querySelector(".message").style.visibility = (blnDisplay ? "visible" : "hidden")
    buttonActive("#btn-generate", true)
}

document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false))

/****************************************************************************************
FONCTION GENERER UN LABYRINTHE
****************************************************************************************/

let backUpMaze = {stackCells: [], nbGridLines: 0, nbGridColumns: 0}

const generateMaze = (event) => {
    event.preventDefault()

    // Parametres
    const algorithme = event.target.algorithme.value
    const animationSpeed = event.target.animation.value
    const dimension = event.target.dimension.value
    const lines = event.target.lignes.value
    const columns = event.target.colonnes.value
    const thickness = event.target.epaisseur.value

    // Mise à jour du rôle des boutons
    buttonActive("#btn-generate", false)
    buttonActive("#btn-solution", false)

    // Calcul de la vitesse d'animation
    let speed

    if(document.querySelector("#animation-sans").checked) {
        speed = 0
    }
    else {
        speed = 10 - Number(animationSpeed)
    }

    // Calcul des nombres de lignes et colonnes en fonction de la fenêtre
    const hauteurFenetre = window.innerHeight - 40
    const largeurFenetre = window.innerWidth - 380
    const thicknessFactor = 10-Number(thickness)
    let nbGridLines, nbGridColumns, minCellLength, maxCellLength

    if(!document.querySelector("#dimension-perso").checked) {
        nbGridLines = Number(dimension)
        minCellLength = hauteurFenetre/(nbGridLines*(thicknessFactor+1)+1)
        maxCellLength = minCellLength*thicknessFactor
        nbGridColumns = Math.floor((largeurFenetre-minCellLength)/(minCellLength + maxCellLength))
    }
    else {
        if(lines==="" || columns==="") {
            displayMessage(true)
            return
        }
        nbGridLines = Number(lines)
        nbGridColumns = Number(columns)

        if((hauteurFenetre/largeurFenetre)>(nbGridLines/nbGridColumns)) {
            minCellLength = largeurFenetre/(nbGridColumns*(thicknessFactor+1)+1)
        }
        else {
            minCellLength = hauteurFenetre/(nbGridLines*(thicknessFactor+1)+1)
        }
        maxCellLength = minCellLength*thicknessFactor 
    }
  
    // Création du labyrinthe
    let stackMazeCells = []

    switch(algorithme) {
        case "profondeur":
            algoProfondeur(stackMazeCells, nbGridLines, nbGridColumns)
            break
    }

    // Affichage du labyrinthe
    displayMaze(stackMazeCells, nbGridLines, nbGridColumns, minCellLength, maxCellLength, speed)

    // BackUp du labyrinthe pour afficher la solution
    backUpMaze = {stackCells: stackMazeCells, nbGridLines: nbGridLines, nbGridColumns: nbGridColumns}
}

document.querySelector("#generateur-filtre").addEventListener("submit", generateMaze)

/****************************************************************************************
FONCTION AFFICHER LA SOLUTION DU LABYRINTHE
****************************************************************************************/

const displaySolution = () => {
    console.log(backUpMaze.stackCells)
}

document.querySelector("#btn-solution").addEventListener("click", displaySolution)