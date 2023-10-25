import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"

import { displayMaze } from "./displayMaze.js"

/****************************************************************************************

****************************************************************************************/

const generateMaze = (algo, structure, labyrinth, animationSpeed) => {
    const hauteurStructure = document.getElementById(structure).clientHeight - 56
    const largeurStructure = document.getElementById(structure).clientWidth - 2
    const thicknessFactor = 0.30

    let nbLines, nbColumns, minCellLength, maxCellLength

    nbLines = Math.floor(hauteurStructure / 30)

    maxCellLength = hauteurStructure / (nbLines + thicknessFactor * (nbLines + 1))
    minCellLength = maxCellLength * thicknessFactor
    nbColumns = Math.floor((largeurStructure - minCellLength) / (minCellLength + maxCellLength))

    // Calcul de la vitesse d'animation
    const factor = Math.sqrt(600 / (nbLines * nbColumns))
    const speed = (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor

    // Création du labyrinthe
    let stackOpenCells = []

    switch(algo) {
        case "profondeur":
            algoProfondeur(stackOpenCells, nbLines, nbColumns)
            break
        case "fusion":
            algoFusion(stackOpenCells, nbLines, nbColumns)
            break
        case "prim":
            algoPrim(stackOpenCells, nbLines, nbColumns)
            break
        case "sidewinder":
            algoSidewinder(stackOpenCells, nbLines, nbColumns)
            break
        case "binarytree":
            algoBinarytree(stackOpenCells, nbLines, nbColumns)
            break
    }

    // Affichage du labyrinthe
    const maze = {id: labyrinth, stackOpenCells: stackOpenCells}
    const params = {nbLines: nbLines, nbColumns: nbColumns, minCellLength: minCellLength, maxCellLength: maxCellLength}

    displayMaze(maze, params, speed)
}

export { generateMaze }