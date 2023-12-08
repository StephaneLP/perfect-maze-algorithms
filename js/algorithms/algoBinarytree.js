import { getRandomIntInclusive } from "../utils/generalTools.js"

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 3
 */
const algoBinarytree = (nbLines, nbColumns) => {
    let stackOpenCells = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            stackOpenCells.push(addOpenCells(n, m, nbColumns))
        }
    }

    return stackOpenCells
}

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} n 
 * @param {integer} m 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 2
 */
const addOpenCells = (n, m, nbColumns) => {
    let cellRooms = [], isRightWallOpen = null

    if ((n > 0) && (m < nbColumns - 1)) isRightWallOpen = (getRandomIntInclusive(0,1) == 0)
    if ((n == 0) && (m < nbColumns - 1)) isRightWallOpen = true
    if ((n > 0) && (m == nbColumns - 1)) isRightWallOpen = false

    cellRooms.push([2 * n + 1, 2 * m + 1])
    if (isRightWallOpen !== null) cellRooms.push(isRightWallOpen ? [2 * n + 1, 2 * m + 2] : [2 * n, 2 * m + 1])

    return cellRooms
}

export { algoBinarytree }