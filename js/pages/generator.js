import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { displayMaze } from "../display/displayMaze.js"
import { solutionAlgoBacktracking } from "../algorithms/solutionAlgoBacktracking.js"
import { displaySolution } from "../display/displaySolution.js"
import { createArray2Dim, buttonActive } from "../utils/outils.js"

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

let backUpMaze = {stackOpenCells: [], nbGridLines: 0, nbGridColumns: 0, maxCellLength: 0}

const generateMaze = (event) => {
    event.preventDefault()

    // Mise à jour du rôle des boutons
    buttonActive("#btn-generate", false)
    buttonActive("#btn-solution", false)

    // Parametres
    const algorithme = event.target.algorithme.value
    const animationSpeed = event.target.animation.value
    const dimension = event.target.dimension.value
    const lines = event.target.lignes.value
    const columns = event.target.colonnes.value
    const thickness = event.target.epaisseur.value

    // Calcul de la vitesse d'animation
    let speed = (document.querySelector("#animation-sans").checked ? 0 : (2 * (10 - Number(animationSpeed)) - 1) * 10)

    // Calcul des nombres de lignes et colonnes en fonction de la fenêtre
    const hauteurFenetre = window.innerHeight - 40
    const largeurFenetre = window.innerWidth - 380
    const thicknessFactor = Number(thickness) / 10
    let nbGridLines, nbGridColumns, minCellLength, maxCellLength

    if(!document.querySelector("#dimension-perso").checked) {
        nbGridLines = Number(dimension)
        maxCellLength = hauteurFenetre / (nbGridLines + thicknessFactor * (nbGridLines + 1))
        minCellLength = maxCellLength * thicknessFactor
        nbGridColumns = Math.floor((largeurFenetre-minCellLength) / (minCellLength + maxCellLength))
    } else {
        if(lines==="" || columns==="") {
            displayMessage(true)
            return
        }
        nbGridLines = Number(lines)
        nbGridColumns = Number(columns)

        if((hauteurFenetre/largeurFenetre)>(nbGridLines/nbGridColumns)) {
            maxCellLength =  largeurFenetre / (nbGridColumns + thicknessFactor * (nbGridColumns + 1))
        }
        else {
            maxCellLength =  hauteurFenetre / (nbGridLines + thicknessFactor * (nbGridLines + 1))
        }

        minCellLength = maxCellLength * thicknessFactor
    }
  
    // Création du labyrinthe
    let stackOpenCells = []

    switch(algorithme) {
        case "profondeur":
            algoProfondeur(stackOpenCells, nbGridLines, nbGridColumns)
            break
    }

    // Affichage du labyrinthe
    displayMaze(stackOpenCells, nbGridLines, nbGridColumns, minCellLength, maxCellLength, speed)

    // BackUp du labyrinthe pour afficher la solution
    backUpMaze = {stackOpenCells: stackOpenCells, nbGridLines: nbGridLines, nbGridColumns: nbGridColumns, maxCellLength: maxCellLength}
}

document.querySelector("#generator-labyrinth").addEventListener("submit", generateMaze)

/****************************************************************************************
FONCTION AFFICHER LA SOLUTION DU LABYRINTHE
****************************************************************************************/

const generateSolution = (event) => {
    event.preventDefault()

    const nbMazeLines = 2 * backUpMaze.nbGridLines + 1
    const nbMazeColumns = 2 * backUpMaze.nbGridColumns + 1
    const stackOpenCells = backUpMaze.stackOpenCells
    const imgSolutionDiameter = Math.floor(backUpMaze.maxCellLength * 0.5)

    const search = event.target.search.value
    const animation = event.target.animation.checked
    const speed = (animation ? 0 :  (2 * (10 - Number(event.target.speed.value)) - 1) * 10)

    // Initialisation du tableau contenant le labyrinthe
    let gridMaze = createArray2Dim(nbMazeLines, nbMazeColumns, false)
    stackOpenCells.map(array => array.map(element => gridMaze[element[0]][element[1]] = true))

    // Cellules Entrée et Sortie
    const accessCells = stackOpenCells.slice(-1)[0]
    
    // Piles de recherche du chemin solution
    let stackSolutionCells = [], stackSearchSolutionRooms = []
    solutionAlgoBacktracking(stackSolutionCells, gridMaze, accessCells)

    const stackRooms = (search === "ok" ? stackSearchSolutionRooms : stackSolutionRooms)
    displaySolution(stackSolutionCells, imgSolutionDiameter, speed)
}

document.querySelector("#generator-solution").addEventListener("submit", generateSolution)
