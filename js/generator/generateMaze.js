import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"

import { addAccessCells } from "./tools.js"
import { displayMaze } from "../display/displayMaze.js"
import { displayMessage } from "./initGenerator.js"
import { activateBtn } from "../utils/tools.js"

/****************************************************************************************
FONCTION GENERER UN LABYRINTHE
****************************************************************************************/

let backUpMaze = {stackOpenCells: [], nbGridLines: 0, nbGridColumns: 0, maxCellLength: 0}

const generateMaze = (event) => {
    event.preventDefault()

    // Mise à jour du rôle des boutons
    activateBtn("#btn-generate", false)
    activateBtn("#btn-solution", false)

    // Parametres
    const algorithme = event.target.algorithme.value
    const taille = event.target.taille.value
    const thickness = event.target.thickness.value
    const animationChecked = event.target.animationChecked.checked
    const animationSpeed = event.target.animationSpeed.value
    const lines = event.target.lines.value
    const columns = event.target.columns.value

    // Calcul des nombres de lignes et colonnes en fonction de la fenêtre
    const hauteurFenetre = window.innerHeight - 40
    const largeurFenetre = window.innerWidth - 380
    const thicknessFactor = Number(thickness) / 100
    let nbGridLines, nbGridColumns, minCellLength, maxCellLength

    if(!document.querySelector("#taille-perso").checked) {
        nbGridLines = Number(taille)
        maxCellLength = hauteurFenetre / (nbGridLines + thicknessFactor * (nbGridLines + 1))
        minCellLength = maxCellLength * thicknessFactor
        nbGridColumns = Math.floor((largeurFenetre-minCellLength) / (minCellLength + maxCellLength))
    } else {
        if(lines==="" || columns==="") {
            displayMessage(true, "Veuillez renseigner les nombres de lignes et de colonnes S.V.P.")
            return
        }
        nbGridLines = Number(lines)
        nbGridColumns = Number(columns)

        if((hauteurFenetre/largeurFenetre)>(nbGridLines/nbGridColumns)) {
            maxCellLength =  largeurFenetre / (nbGridColumns + thicknessFactor * (nbGridColumns + 1))
        }
        else {
            maxCellLength =  hauteurFenetre / (nbGridLines + thicknessFactor * (nbGridLines + 1))
        }

        minCellLength = maxCellLength * thicknessFactor
    }
  
    // Calcul de la vitesse d'animation
    const factor = Math.sqrt(600 / (nbGridLines * nbGridColumns))
    const speed = (animationChecked ? (Math.pow(10 - Number(animationSpeed), 2) + 5) * factor : 0)

    // Création du labyrinthe
    let stackOpenCells = []

    switch(algorithme) {
        case "profondeur":
            algoProfondeur(stackOpenCells, nbGridLines, nbGridColumns)
            break
        case "fusion":
            algoFusion(stackOpenCells, nbGridLines, nbGridColumns)
            break
        case "prim":
            algoPrim(stackOpenCells, nbGridLines, nbGridColumns)
            break
        case "sidewinder":
            algoSidewinder(stackOpenCells, nbGridLines, nbGridColumns)
            break
        case "binarytree":
            algoBinarytree(stackOpenCells, nbGridLines, nbGridColumns)
            break
    }

    // Ajout Entrée & Sortie
    addAccessCells(stackOpenCells, nbGridLines, nbGridColumns)

    // Affichage du labyrinthe
    displayMaze(stackOpenCells, nbGridLines, nbGridColumns, minCellLength, maxCellLength, speed)

    // BackUp du labyrinthe pour afficher la solution
    backUpMaze = {stackOpenCells: stackOpenCells, nbGridLines: nbGridLines, nbGridColumns: nbGridColumns, maxCellLength: maxCellLength }
}

export { generateMaze, backUpMaze }