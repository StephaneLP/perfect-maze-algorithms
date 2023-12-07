import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"

import { displayMaze } from "./displayMaze.js"
import { displayMessage } from "./initGenerator.js"
import { activateBtnSolution, addAccessCells } from "../utils/specificTools.js"

let backUpMaze = {stackOpenCells: [], structure: {nbLines: 0, nbColumns: 0, maxCellLength: 0, minCellLength: 0}}

/**
 * Génération du labyrinthe (click sur le bouton 'Générer le labyrinthe').
 * (description détaillée : README_GENERATOR.md)
 * @param {object} event 
 */
const generateMaze = (event) => {
    event.preventDefault()

    activateBtnSolution(false)

    const algorithm = event.target.algorithm.value
    const size = event.target.size.value
    const thickness = event.target.thickness.value
    const animationChecked = event.target.animationChecked.checked
    const animationSpeed = event.target.animationSpeed.value
    const customSize = event.target.customSize.checked
    const customNbLines = event.target.customNbLines.value
    const customNbColumns = event.target.customNbColumns.value

    if (customSize && (customNbLines === "" || customNbColumns === "")) {
        displayMessage(true, "Veuillez renseigner les nombres de lignes et de colonnes S.V.P.")
        return
    }

    const structure = defineStructure(thickness, size, customSize, customNbLines, customNbColumns)
    const factor = Math.sqrt(600 / (structure.nbLines * structure.nbColumns))
    const speed = (animationChecked ? (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor : 0)

    let stackOpenCells = []
    switch (algorithm) {
        case "profondeur":
            stackOpenCells = algoProfondeur(structure.nbLines, structure.nbColumns)
            break
        case "fusion":
            stackOpenCells = algoFusion(structure.nbLines, structure.nbColumns)
            break
        case "prim":
            stackOpenCells = algoPrim(structure.nbLines, structure.nbColumns)
            break
        case "sidewinder":
            stackOpenCells = algoSidewinder(structure.nbLines, structure.nbColumns)
            break
        case "binarytree":
            stackOpenCells = algoBinarytree(structure.nbLines, structure.nbColumns)
            break
    }
    stackOpenCells.push(addAccessCells(structure.nbLines, structure.nbColumns))

    displayMaze(stackOpenCells, structure, speed)
    backUpMaze = {stackOpenCells: stackOpenCells, structure: structure }
}

/**
 * Calcul de la structure du labyrinthe (dimensions du labyrinthe et des cellules)
 * (description détaillée : README_GENERATOR.md)
 * @param {string} thickness 
 * @param {string} size 
 * @param {boolean} customSize 
 * @param {string} customNbLines 
 * @param {string} customNbColumns 
 * @returns {object} Nombres de lignes et colonnes, taille des pièces, murs et intersections
 */
const defineStructure = (thickness, size, customSize, customNbLines, customNbColumns) => {
    const heightWindow = window.innerHeight - 40
    const widthWindow = window.innerWidth - 380
    const thicknessFactor = Number(thickness) / 100

    let nbLines, nbColumns, maxCellLength, minCellLength

    if (customSize) {
        const formatWindow = (heightWindow / widthWindow)
        const formatMaze = (nbLines / nbColumns)

        nbLines = Number(customNbLines)
        nbColumns = Number(customNbColumns)
        maxCellLength = (formatWindow > formatMaze ? widthWindow / (nbColumns + thicknessFactor * (nbColumns + 1)) : heightWindow / (nbLines + thicknessFactor * (nbLines + 1)))
        minCellLength = maxCellLength * thicknessFactor
    } else {
        nbLines = Number(size)
        maxCellLength = heightWindow / (nbLines + thicknessFactor * (nbLines + 1))
        minCellLength = maxCellLength * thicknessFactor
        nbColumns = Math.floor((widthWindow-minCellLength) / (minCellLength + maxCellLength))
    }

    return {nbLines: nbLines, nbColumns: nbColumns, maxCellLength: maxCellLength, minCellLength: minCellLength}
}

export { generateMaze, backUpMaze }