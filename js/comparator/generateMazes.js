import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"

import { displayMaze } from "./displayMaze.js"
import { displayMessage } from "./initComparator.js"

const prepareGeneratingMazes = (event) => {
    event.preventDefault()

    const algo1 = event.target.algorithm1.value
    const algo2 = event.target.algorithm2.value
    const algo3 = event.target.algorithm3.value
    const animationSpeed = event.target.animationSpeed.value

    if(algo1 == "" && algo2 == "" && algo3 == "") {
        displayMessage(true, "Veuillez sélectionner au moins un algorithme S.V.P.")
        return
    }
    if(algo1 !== "") generateMaze(algo1, "structure1", "labyrinth1", animationSpeed)
    if(algo2 !== "") generateMaze(algo2, "structure2", "labyrinth2", animationSpeed)
    if(algo3 !== "") generateMaze(algo3, "structure3", "labyrinth3", animationSpeed)
}

const generateMaze = (algo, structure, labyrinth, animationSpeed) => {
    const hauteurStructure = document.getElementById(structure).clientHeight - 56
    const largeurStructure = document.getElementById(structure).clientWidth - 2
    const thicknessFactor = 0.20

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
    displayMaze(labyrinth, stackOpenCells, nbLines, nbColumns, minCellLength, maxCellLength, speed)
}

export { prepareGeneratingMazes }