import { getRandomIntInclusive } from "./generalTools.js"

/**
 * Afficher / masquer le bouton et filtres 'Solution' de la section Générateur
 * @param {boolean} blnActive 
 */

function activateBtnSolution(blnActive) {
    const btnGenerateSolution = document.querySelector("#btn-generate-solution")
    const animationCheckbox = document.querySelector("#animation-checkbox")
    const solutionSearch = document.querySelector(".solution-search")
    
    if (blnActive) {
        btnGenerateSolution.disabled = false
        btnGenerateSolution.classList.remove("btn-disabled")
        if (animationCheckbox.checked) solutionSearch.style.display = "block"
    } else {
        btnGenerateSolution.disabled = true
        btnGenerateSolution.classList.add("btn-disabled")
        solutionSearch.style.display = "none"
    }
}

/****************************************************************************************/

/**
 * Calcul aléatoire des coordonnées des murs 'Entrée' et 'Sortie' du labyrinthe
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 2
 */

function addAccessCells(nbLines, nbColumns) {
    const indexEntry = 2 * getRandomIntInclusive(0, nbLines -1 ) + 1
    const indexExit = 2 * getRandomIntInclusive(0, nbLines - 1) + 1

    return [[indexEntry, 0], [indexExit, 2 * nbColumns]]
}

/****************************************************************************************/

/**
 * Conversion des coordonnées : Cellule de la grille du labyrinthe => Pièce du labyrinthe
 * @param {array} cell 
 * @returns {array}
 */

function convertCellToRoom(cell) {
    return [(cell[0] - 1) / 2, (cell[1] - 1) / 2]
}

/****************************************************************************************/

/**
 * Conversion des coordonnées : Pièce du labyrinthe => Cellule de la grille du labyrinthe
 * @param {array} room 
 * @returns {array}
 */

function convertRoomToCell(room) {
    return [2 * room[0] + 1, 2 * room[1] + 1]
}

export { activateBtnSolution, convertCellToRoom, convertRoomToCell, addAccessCells }