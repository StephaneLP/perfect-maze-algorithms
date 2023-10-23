import { solutionAlgoBacktracking } from "../algorithms/solutionAlgoBacktracking.js"
import { displaySolution } from "../display/displaySolution.js"
import { createArray2Dim } from "../utils/tools.js"
import { backUpMaze } from "./generateMaze.js"

/****************************************************************************************
FONCTION AFFICHER LA SOLUTION DU LABYRINTHE
****************************************************************************************/

const generateSolution = (event) => {
    event.preventDefault()

    const nbMazeLines = 2 * backUpMaze.nbGridLines + 1
    const nbMazeColumns = 2 * backUpMaze.nbGridColumns + 1
    const stackOpenCells = backUpMaze.stackOpenCells
    const imgSolutionDiameter = Math.floor(backUpMaze.maxCellLength * 0.5)

    const animationChecked = document.querySelector("#animation-checkbox").checked
    const animationSpeed = document.querySelector("#animation-speed").value
    const solutionSearch = document.querySelector("#solution-search").checked

    // Calcul de la vitesse d'animation
    const factor = Math.sqrt(600 / (backUpMaze.nbGridLines * backUpMaze.nbGridColumns))
    const speed = (animationChecked ? (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor : 0)

    // Initialisation du tableau contenant le labyrinthe
    let gridMaze = createArray2Dim(nbMazeLines, nbMazeColumns, false)
    stackOpenCells.map(array => array.map(element => gridMaze[element[0]][element[1]] = true))

    // Cellules Entrée et Sortie
    const accessCells = stackOpenCells.slice(-1)[0]
    
    // Piles de recherche du chemin solution
    let stackSolutionCells = [], stackSearchSolutionCells = []
    solutionAlgoBacktracking(stackSolutionCells, stackSearchSolutionCells, gridMaze, accessCells)

    const stackCells = (solutionSearch ? stackSearchSolutionCells : stackSolutionCells)
    displaySolution(stackCells, imgSolutionDiameter, speed)
}

export { generateSolution }