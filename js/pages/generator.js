import { algoProfondeur } from "../algorithms/algoBacktracking.js"
import { algoFusion }  from "../algorithms/algoFusion.js"
import { algoSidewinder }  from "../algorithms/algoSidewinder.js"
import { algoBinarytree }  from "../algorithms/algoBinarytree.js"
import { algoPrim }  from "../algorithms/algoPrim.js"

import { displayMaze } from "../display/displayMaze.js"
import { solutionAlgoBacktracking } from "../algorithms/solutionAlgoBacktracking.js"
import { displaySolution } from "../display/displaySolution.js"
import { createArray2Dim, buttonActive } from "../utils/outils.js"

/****************************************************************************************
LOAD : INITIALISATION DES NOMBRES DE LIGNES ET COLONNES
****************************************************************************************/

const initSelect = (element, pas, max) => {
    let select = document.querySelector(element)
    let option = document.createElement("option")

    option.text = "--"
    option.value = ""
    select.appendChild(option)

    for(let n=pas; n<=max; n+=pas) {
        option = document.createElement("option")
        option.text = n
        option.value = n
        select.appendChild(option)
    }
}

window.addEventListener('load', initSelect("#lines", 5, 80), initSelect("#columns", 5, 80))

/****************************************************************************************
LOAD : INITIALISATION DU FILTRE DIMENSION
****************************************************************************************/

const handleDimensionClick = () => {
    const dimensionPerso = document.querySelector("#taille-perso")

    document.querySelector("#select-taille-perso").style.display = (dimensionPerso.checked ? "block" : "none")
}

document.querySelector("#taille-perso").addEventListener("click", handleDimensionClick)

/****************************************************************************************
LOAD : INITIALISATION DU FILTRE ANIMATION DE LA GENERATION
****************************************************************************************/

const handleAnimationClick = () => {
    const animation = document.querySelector("#animation-checkbox")

    document.querySelector("#animation-div").style.display = (animation.checked ? "flex" : "none")
}

document.querySelector("#animation-checkbox").addEventListener("click", handleAnimationClick)

/****************************************************************************************
LOAD : INITIALISATION DU FILTRE ANIMATION DE LA SOLUTION
****************************************************************************************/

// const handleAnimationSolutionClick = () => {
//     const animationSolution = document.querySelector("#animation-solution-checkbox")

//     document.querySelectorAll(".animation-solution-div").forEach(div => div.style.display = (animationSolution.checked ? "flex" : "none"))
// }

// document.querySelector("#animation-solution-checkbox").addEventListener("click", handleAnimationSolutionClick)

/****************************************************************************************
FONCTION FENETRE MODALE MESSAGE
****************************************************************************************/

const displayMessage = (blnDisplay, msg) => {
    document.querySelector(".message").style.visibility = (blnDisplay ? "visible" : "hidden")
    document.querySelector("#libelle-message").textContent = msg
    buttonActive("#btn-generate", true)
}

document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false, ""))

/****************************************************************************************
FONCTION GENERER UN LABYRINTHE
****************************************************************************************/

let backUpMaze = {stackOpenCells: [], nbGridLines: 0, nbGridColumns: 0, maxCellLength: 0}

const generateMaze = (event) => {
    event.preventDefault()

    // Mise à jour du rôle des boutons
    buttonActive("#btn-generate", false)
    buttonActive("#btn-solution", false)

    // Parametres
    const algorithme = event.target.algorithme.value
    const taille = event.target.taille.value
    const thickness = event.target.thickness.value
    const animationchecked = event.target.animationchecked.checked
    const animation = event.target.animation.value
    const lines = event.target.lines.value
    const columns = event.target.columns.value

    // Calcul de la vitesse d'animation
    const speed = (animationchecked ? (2 * (10 - Number(animation)) - 1) * 10 : 0)

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

    // Affichage du labyrinthe
    displayMaze(stackOpenCells, nbGridLines, nbGridColumns, minCellLength, maxCellLength, speed)

    // BackUp du labyrinthe pour afficher la solution
    backUpMaze = {stackOpenCells: stackOpenCells, nbGridLines: nbGridLines, nbGridColumns: nbGridColumns, maxCellLength: maxCellLength}
}

document.querySelector("#generator-labyrinth").addEventListener("submit", generateMaze)

/****************************************************************************************
FONCTION AFFICHER LA SOLUTION DU LABYRINTHE
****************************************************************************************/

const generateSolution = (event) => {
    event.preventDefault()

    const nbMazeLines = 2 * backUpMaze.nbGridLines + 1
    const nbMazeColumns = 2 * backUpMaze.nbGridColumns + 1
    const stackOpenCells = backUpMaze.stackOpenCells
    const imgSolutionDiameter = Math.floor(backUpMaze.maxCellLength * 0.5)

    const animationchecked = document.querySelector("#animation-generation-checkbox").checked


    const search = event.target.search.value

    const animation = event.target.animation.value

    // Calcul de la vitesse d'animation
    const speed = (animationchecked ? (2 * (10 - Number(animation)) - 1) * 10 : 0)

    // Initialisation du tableau contenant le labyrinthe
    let gridMaze = createArray2Dim(nbMazeLines, nbMazeColumns, false)
    stackOpenCells.map(array => array.map(element => gridMaze[element[0]][element[1]] = true))

    // Cellules Entrée et Sortie
    const accessCells = stackOpenCells.slice(-1)[0]
    
    // Piles de recherche du chemin solution
    let stackSolutionCells = [], stackSearchSolutionCells = []
    solutionAlgoBacktracking(stackSolutionCells, stackSearchSolutionCells, gridMaze, accessCells)

    const stackCells = (search === "ok" ? stackSearchSolutionCells : stackSolutionCells)
    displaySolution(stackCells, imgSolutionDiameter, speed)
}

document.querySelector("#btn-solution").addEventListener("click", generateSolution)
