import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"
import { displayMaze } from "./displayMaze.js"

/****************************************************************************************
GENERATE MAZE (procédure)
- Initialisation des paramètres du labyrinthe :
    - Dimensions de la structure
    - Calcul des nombres de lignes et colonnes
    - Calcul de la largeur des pièces, murs et intersections
- Appel de l'algorithme sélectionné et constitution la pile 'stackOpenCells'
  qui contient les cellules à 'ouvrir'
- Appel de la procédure permettant d'afficher le labyrinthe. Elle necessite 3 paramètres :
    - Pile des cellules à 'ouvrir'
    - Paramètres du labyrinthe
    - Vitesse d'animation
****************************************************************************************/

const generateMaze = (idStructure, algo, animationSpeed) => {
    const structureHeight = document.getElementById("structure" + idStructure).clientHeight - 56
    const structureWidth = document.getElementById("structure" + idStructure).clientWidth - 2
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

    const mazeParams = {idStructure: idStructure, nbLines: nbLines, nbColumns: nbColumns, minCellLength: minCellLength, maxCellLength: maxCellLength}

    displayMaze(stackOpenCells, mazeParams, speed)
}

export { generateMaze }