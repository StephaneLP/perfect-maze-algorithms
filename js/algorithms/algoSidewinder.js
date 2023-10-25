import { getRandomIntInclusive, shuffleArrayDim, createArray2Dim } from "../utils/tools.js"

/****************************************************************************************

****************************************************************************************/

const algoSidewinder = (stackOpenCells, nbGridLines, nbGridColumns) => {
    let currentRoom = [], stackRooms = []

    for (let n = 0; n < nbGridLines; n++) {
        for (let m = 0; m < nbGridColumns; m++) {
            currentRoom = [n, m]
            stackRooms.push(currentRoom)
            if((n !== 0 && rightWallClose()) || (m == nbGridColumns - 1)) {
                addOpenCells(stackOpenCells, stackRooms)
                stackRooms = []
            }
        }
    }

    return stackOpenCells
}

/****************************************************************************************

****************************************************************************************/

const rightWallClose = () => {
    return (getRandomIntInclusive(0,1) == 0)
}

/****************************************************************************************

****************************************************************************************/

const addOpenCells = (stackOpenCells, stackRooms) => {
    let cellRooms = [], crossingRoom = []

    stackRooms.map((room, index) => {
        cellRooms.push([2 * room[0] + 1, 2 * room[1] + 1])
        if(index < stackRooms.length - 1) cellRooms.push([2 * room[0] + 1, 2 * room[1] + 2]) 
    })

    crossingRoom = stackRooms[getRandomIntInclusive(0, stackRooms.length -1)]
    if(crossingRoom[0] !== 0) cellRooms.push([2 * crossingRoom[0], 2 * crossingRoom[1] + 1])

    stackOpenCells.push(cellRooms)
}

export { algoSidewinder }