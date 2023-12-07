import { getRandomIntInclusive } from "./generalTools.js"

/****************************************************************************************
ACTIVATE BTN (procédure)
- Afficher / masquer les boutons et filtres de la section Générateur
****************************************************************************************/

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

/****************************************************************************************
ADD ACCESS CELLS (fonction)
- Ajout des murs 'Entrée' et 'Sortie' à la pile contenant les cellules de la grille 
  du labyrinthe, devant être ouvertes
****************************************************************************************/

function addAccessCells(nbLines, nbColumns) {
    const indexEntry = 2 * getRandomIntInclusive(0, nbLines -1 ) + 1
    const indexExit = 2 * getRandomIntInclusive(0, nbLines - 1) + 1

    return [[indexEntry, 0], [indexExit, 2 * nbColumns]]
}

/****************************************************************************************
CONVERT CELL TO ROOM (fonction)
- Conversion des coordonnées : Cellule de la grille du labyrinthe => Pièce du labyrinthe
****************************************************************************************/

function convertCellToRoom(cell) {
    return [(cell[0] - 1) / 2, (cell[1] - 1) / 2]
}

/****************************************************************************************
CONVERT ROOM TO CELL (fonction)
- Conversion des coordonnées : Pièce du labyrinthe => Cellule de la grille du labyrinthe
****************************************************************************************/

function convertRoomToCell(room) {
    return [2 * room[0] + 1, 2 * room[1] + 1]
}

export { activateBtnSolution, convertCellToRoom, convertRoomToCell, addAccessCells }