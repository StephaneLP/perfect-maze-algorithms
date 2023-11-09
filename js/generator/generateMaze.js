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
GENERATE MAZE (procédure)
Fonction appelée en cliquant sur le bouton 'Générer le labyrinthe' :
- Désactivation des boutons
- Reccueil des paramètres renseignés par l'utilisateur dans la zone de filtre
- Calcul de la structure du labyrinthe et de la vitesse d'animation
- Appel de l'algorithme et constitution la pile 'stackOpenCells' qui contient les cellules à 'ouvrir'
- Appel de la procédure permettant d'afficher le labyrinthe. Elle necessite 3 paramètres :
    - structure du labyrinthe
    - pile des cellules à 'ouvrir'
    - vitesse d'animation
- Backup du labyrinthe (utilisé pour l'affichage de la solution)
****************************************************************************************/

const generateMaze = (event) => {
    event.preventDefault()

    activateBtn("#btn-generate", false)
    activateBtn("#btn-solution", false)

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

/****************************************************************************************
DEFINE STRUCTURE (fonction)
- Calcul de la taille de la zone permettant d'afficher le labyrinthe
- Calcul du pourcentage épaisseur des murs (largeur mur / largeur pièce)
- En fonction du choix d'une taille personnalisée ou non :
    - Calcul de la taille du labyrinthe : 'nbLines' et 'nbColumns'
    - Calcul de la taille des cellules : deux dimensions 'maxCellLength' et 'minCellLength'
- Retourne un objet contenant ces 4 valeurs {nbLines, nbColumns, maxCellLength, minCellLength}
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