import { solutionAlgoBacktracking } from "../algorithms/solutionAlgoBacktracking.js"
import { displaySolution } from "./displaySolution.js"
import { createArray2Dim } from "../utils/tools.js"
import { backUpMaze } from "./generateMaze.js"

/****************************************************************************************
FONCTION AFFICHER LA SOLUTION DU LABYRINTHE
****************************************************************************************/

const generateSolution = (event) => {
    event.preventDefault()

    const animationChecked = document.querySelector("#animation-checkbox").checked
    const animationSpeed = document.querySelector("#animation-speed").value
    const solutionSearch = document.querySelector("#solution-search").checked

    const stackOpenCells = backUpMaze.stackOpenCells
    const structure = backUpMaze.structure

    const nbMazeLines = 2 * structure.nbLines + 1
    const nbMazeColumns = 2 * structure.nbColumns + 1
    const imgSolutionDiameter = Math.floor(structure.maxCellLength * 0.5)
    const factor = Math.sqrt(600 / (structure.nbLines * structure.nbColumns))
    const speed = (animationChecked ? (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor : 0)

    // Initialisation du tableau contenant le labyrinthe
    let gridMaze = createArray2Dim(nbMazeLines, nbMazeColumns, false)
    stackOpenCells.map(array => array.map(element => gridMaze[element[0]][element[1]] = true))

    // Cellules Entrée et Sortie
    const accessCells = stackOpenCells.slice(-1)[0]
    
    // Piles de recherche du chemin solution
    let solution = solutionAlgoBacktracking(gridMaze, accessCells)

    const stackCells = (solutionSearch ? solution.stackSearchSolutionCells : solution.stackSolutionCells)
    displaySolution(stackCells, imgSolutionDiameter, speed)
}

export { generateSolution }