import { getRandomIntInclusive } from "../utils/generalTools.js"

/****************************************************************************************

****************************************************************************************/

const algoBinarytree = (nbLines, nbColumns) => {
    let stackOpenCells = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            addOpenCells(stackOpenCells, n, m, nbColumns)
        }
    }

    return stackOpenCells
}

/****************************************************************************************

****************************************************************************************/

const addOpenCells = (stackOpenCells, n, m, nbColumns) => {
    let cellRooms = [], isRightWallOpen = null

    if ((n > 0) && (m < nbColumns - 1)) isRightWallOpen = (getRandomIntInclusive(0,1) == 0)
    if ((n == 0) && (m < nbColumns - 1)) isRightWallOpen = true
    if ((n > 0) && (m == nbColumns - 1)) isRightWallOpen = false

    cellRooms.push([2 * n + 1, 2 * m + 1])
    if (isRightWallOpen !== null) cellRooms.push(isRightWallOpen ? [2 * n + 1, 2 * m + 2] : [2 * n, 2 * m + 1])
    stackOpenCells.push(cellRooms)
}

export { algoBinarytree }