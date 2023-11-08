import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"

import { displayMaze } from "./displayMaze.js"
import { displayMessage } from "./initGenerator.js"
import { activateBtn, addAccessCells } from "../utils/specificTools.js"

let backUpMaze = {stackOpenCells: [], structure: {nbLines: 0, nbColumns: 0, maxCellLength: 0, minCellLength: 0}}

/****************************************************************************************
FONCTION GENERER UN LABYRINTHE
****************************************************************************************/

const generateMaze = (event) => {
    event.preventDefault()

    // Mise à jour du rôle des boutons
    activateBtn("#btn-generate", false)
    activateBtn("#btn-solution", false)

    // Parametres du formulaire
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

    // Structure du labyrinthe : {nb lignes, nb colonnes, largeurs max cellules, largeurs min cellules}
    const structure = defineStructure(thickness, size, customSize, customNbLines, customNbColumns)

    // Calcul de la vitesse d'animation
    const factor = Math.sqrt(600 / (structure.nbLines * structure.nbColumns))
    const speed = (animationChecked ? (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor : 0)

    // Création du labyrinthe
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

    // Affichage du labyrinthe
    displayMaze(stackOpenCells, structure, speed)

    // BackUp du labyrinthe pour afficher la solution
    backUpMaze = {stackOpenCells: stackOpenCells, structure: structure }
}

/****************************************************************************************

****************************************************************************************/

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
        if (formatWindow > formatMaze) {
            maxCellLength =  widthWindow / (nbColumns + thicknessFactor * (nbColumns + 1))
        } else {
            maxCellLength =  heightWindow / (nbLines + thicknessFactor * (nbLines + 1))
        }
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