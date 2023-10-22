import { getRandomIntInclusive } from "../utils/outils.js"
import { addAccessCells } from "./tools.js"

const algoBinarytree = (stackOpenCells, nbGridLines, nbGridColumns) => {
    for (let n = 0; n < nbGridLines; n++) {
        for (let m = 0; m < nbGridColumns; m++) {
            addOpenCells(stackOpenCells, n, m, nbGridLines, nbGridColumns)
        }
    }
    addAccessCells(stackOpenCells, nbGridLines, nbGridColumns)

    return stackOpenCells
}

const randomWallOpen = () => {
    return (getRandomIntInclusive(0,1) == 0)
}

const addOpenCells = (stackOpenCells, n, m, nbGridLines, nbGridColumns) => {
    let cellRooms = [], isRightWallOpen = null

    if((n > 0) && (m < nbGridColumns - 1)) isRightWallOpen = randomWallOpen()
    if((n == 0) && (m < nbGridColumns - 1)) isRightWallOpen = true
    if((n > 0) && (m == nbGridColumns - 1)) isRightWallOpen = false

    cellRooms.push([2 * n + 1, 2 * m + 1])

    if(isRightWallOpen !== null) {
        cellRooms.push(isRightWallOpen ? [2 * n + 1, 2 * m + 2] : [2 * n, 2 * m + 1])
    }

    stackOpenCells.push(cellRooms)
}

export { algoBinarytree }