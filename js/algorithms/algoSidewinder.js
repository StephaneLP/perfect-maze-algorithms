import { getRandomIntInclusive } from "../utils/generalTools.js"

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 3
 */

const algoSidewinder = (nbLines, nbColumns) => {
    let stackOpenCells = [], currentRoom = [], stackRooms = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            currentRoom = [n, m]
            stackRooms.push(currentRoom)
            if (((n !== 0) && rightWallClose()) || (m == nbColumns - 1)) {
                stackOpenCells.push(addOpenCells(stackRooms))
                stackRooms = []
            }
        }
    }

    return stackOpenCells
}

/****************************************************************************************/

/**
 * Retourne aléatoirement un booléen (true : mur droit fermé / false : mur droit ouvert)
 * @returns {boolean}
 */

const rightWallClose = () => {
    return (getRandomIntInclusive(0,1) == 0)
}

/****************************************************************************************/

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {array} stackRooms Tableau de dimension 2
 * @returns {array} Tableau de dimension 2
 */

const addOpenCells = (stackRooms) => {
    let cells = [], crossingRoom = []

    stackRooms.map((room, index) => {
        cells.push([2 * room[0] + 1, 2 * room[1] + 1])
        if(index < stackRooms.length - 1) cells.push([2 * room[0] + 1, 2 * room[1] + 2]) 
    })

    crossingRoom = stackRooms[getRandomIntInclusive(0, stackRooms.length - 1)]
    if(crossingRoom[0] !== 0) cells.push([2 * crossingRoom[0], 2 * crossingRoom[1] + 1])

    return cells
}

export { algoSidewinder }