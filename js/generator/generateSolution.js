import { algoSolution } from "../algorithms/algoSolution.js"
import { displaySolution } from "./displaySolution.js"
import { createArray2Dim } from "../utils/generalTools.js"
import { backUpMaze } from "./generateMaze.js"

/****************************************************************************************
GENERATE SOLUTION (procédure)
Fonction appelée en cliquant sur le bouton 'Générer la solution' :
- Reccueil des paramètres renseignés par l'utilisateur dans la zone de filtre :
    - avec ou sans animation
    - vitesse d'animation
    - avec/sans algorithme de recherche (recherche de solution ou solution directe)
- Récupération de la structure du labyrinthe (pièces) et de la pile des cellules à 'ouvrir'
- Calcul du diamètre de l'image indiquant le chemin et calcul de la vitesse d'animation
- Création et initialisation de la grille du labyrinthe (pièces + murs + intersections + entrée/sortie)
- Appel de l'algorithme et constitution la pile 'stackCells' qui contient les cellules du chemin à afficher
- Appel de la procédure permettant d'afficher la solution du labyrinthe. Elle necessite 4 paramètres :
    - pile des cellules constituant le chemin
    - diamètre de l'image indiquant le chemin
    - vitesse d'animation
    - booléen avec/sans recherche du chemin solution
****************************************************************************************/

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