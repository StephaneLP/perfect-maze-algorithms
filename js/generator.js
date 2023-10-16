import { algoProfondeur } from "./algoBacktracking.js"
import { displayMaze } from "./displayMaze.js"
import { solutionAlgoBacktracking } from "./solutionAlgoBacktracking.js"
import { displaySolution, displaySearchSolution } from "./displaySolution.js"
import { createArray2Dim, buttonActive } from "./outils.js"

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
    let speed = (document.querySelector("#animation-sans").checked ? 0 : 10 - Number(animationSpeed))

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
    } else {
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

document.querySelector("#generateur-filtre").addEventListener("submit", generateMaze)

/****************************************************************************************
FONCTION AFFICHER LA SOLUTION DU LABYRINTHE
****************************************************************************************/

const generateSolution = () => {
    const nbLines = 2 * backUpMaze.nbGridLines + 1
    const nbColumns = 2 * backUpMaze.nbGridColumns + 1
    const stackOpenCells = backUpMaze.stackOpenCells
    const imgSolutionDiameter = Math.floor(backUpMaze.maxCellLength * 0.5).toString() + "px"
    const animationSpeed = "1"

    let speed = (document.querySelector("#animation-sans").checked ? 0 : 10 - Number(animationSpeed))

    // Initialisation du tableau contenant le labyrinthe
    let gridMaze = createArray2Dim(nbLines, nbColumns, false)

    stackOpenCells.map(array => array.map(element => gridMaze[element[0]][element[1]] = true))

    // Calcul des coordonnées des pièces "Entrée" et "Sortie"
    let accessCells = [], RoomEntry = [], RoomExit = []

    accessCells = stackOpenCells.slice(-1)[0]
    RoomEntry = [(accessCells[0][0] - 1) / 2, (accessCells[0][1]) / 2]
    RoomExit = [(accessCells[1][0]- 1 ) / 2, (accessCells[1][1] - 2 ) / 2]
    
    // Piles de recherche du chemin solution
    let stackSolutionRooms = [], stackSearchSolutionRooms = []

    solutionAlgoBacktracking(stackSolutionRooms, stackSearchSolutionRooms, gridMaze, RoomEntry, RoomExit)
    // displaySolution(stackSolutionRooms, imgSolutionDiameter, speed)
    displaySearchSolution(stackSearchSolutionRooms, imgSolutionDiameter, speed)
}

document.querySelector("#btn-solution").addEventListener("click", generateSolution)

export { backUpMaze }