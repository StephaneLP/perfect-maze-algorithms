import { algoSolution } from "../algorithms/algoSolution.js"
import { displaySolution } from "./displaySolution.js"
import { createArray2Dim } from "../utils/generalTools.js"
import { backUpMaze } from "./generateMaze.js"

/**
 * Génération de la solution (click sur le bouton 'Générer la solution')
 * (description détaillée : README_GENERATOR.md)
 * @param {object} event 
 */
const generateSolution = (event) => {
    event.preventDefault()

    const animationChecked = document.querySelector("#animation-checkbox").checked
    const animationSpeed = document.querySelector("#animation-speed").value
    const search = document.querySelector("#solution-search").checked

    const stackOpenCells = backUpMaze.stackOpenCells
    const structure = backUpMaze.structure

    const imgSolutionDiameter = Math.floor(structure.maxCellLength * 0.5)
    const factor = Math.sqrt(600 / (structure.nbLines * structure.nbColumns))
    const speed = (animationChecked ? (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor : 0)

    const nbGridLines = 2 * structure.nbLines + 1
    const nbGridColumns = 2 * structure.nbColumns + 1
    let gridMaze = createArray2Dim(nbGridLines, nbGridColumns, false)
    stackOpenCells.map(array => array.map(element => gridMaze[element[0]][element[1]] = true))
    const accessCells = stackOpenCells.slice(-1)[0]

    const stackCells = algoSolution(gridMaze, accessCells)
    displaySolution(stackCells, imgSolutionDiameter, speed, search)
}

export { generateSolution }