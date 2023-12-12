import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"
import { displayMaze } from "./displayMaze.js"

/**
 * Génération du labyrinthe (click sur le bouton 'Générer le labyrinthe').
 * (description détaillée : README_COMPARATOR.md)
 * @param {*} idMaze 
 * @param {*} algo 
 * @param {*} animationSpeed 
 */

const generateMaze = (idMaze, algo, animationSpeed) => {
    const structureHeight = document.getElementById("maze-container" + idMaze).clientHeight - 56
    const structureWidth = document.getElementById("maze-container" + idMaze).clientWidth - 2
    const thicknessFactor = 0.30

    const nbLines = Math.floor(structureHeight / 30)
    const maxCellLength = structureHeight / (nbLines + thicknessFactor * (nbLines + 1))
    const minCellLength = maxCellLength * thicknessFactor
    const nbColumns = Math.floor((structureWidth - minCellLength) / (minCellLength + maxCellLength))

    const factor = Math.sqrt(600 / (nbLines * nbColumns))
    const speed = (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor

    let stackOpenCells = []

    switch (algo) {
        case "profondeur":
            stackOpenCells = algoProfondeur(nbLines, nbColumns)
            break
        case "fusion":
            stackOpenCells = algoFusion(nbLines, nbColumns)
            break
        case "prim":
            stackOpenCells = algoPrim(nbLines, nbColumns)
            break
        case "sidewinder":
            stackOpenCells = algoSidewinder(nbLines, nbColumns)
            break
        case "binarytree":
            stackOpenCells = algoBinarytree(nbLines, nbColumns)
            break
    }

    const structure = {idMaze: idMaze, nbLines: nbLines, nbColumns: nbColumns, minCellLength: minCellLength, maxCellLength: maxCellLength}

    displayMaze(stackOpenCells, structure, speed)
}

export { generateMaze }