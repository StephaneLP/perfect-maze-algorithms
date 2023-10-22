import { getRandomIntInclusive, shuffleArrayDim, createArray2Dim } from "../utils/outils.js"
import { addAccessCells } from "./tools.js"

const algoSpiral = (stackOpenCells, nbLines, nbColumns) => {
    let gridRooms = createArray2Dim(nbLines, nbColumns, false)
    let stackRooms = [], startRoom = [], currentRoom = []

    startRoom = [getRandomIntInclusive(0, nbLines - 1), getRandomIntInclusive(0, nbColumns - 1)]
    gridRooms[startRoom[0]][startRoom[1]] = true
    stackOpenCells.push([[2 * startRoom[0] + 1, 2 * startRoom[1] + 1]])

    stackRooms.push(startRoom)
    addAdjacentRooms(stackOpenCells, stackRooms, startRoom, gridRooms, nbLines, nbColumns)

    while(stackRooms.length > 0) {
        currentRoom = stackRooms[0]
        addAdjacentRooms(stackOpenCells, stackRooms, currentRoom, gridRooms, nbLines, nbColumns)
        stackRooms.shift()
    }

    addAccessCells(stackOpenCells, nbLines, nbColumns)

    return stackOpenCells 
}

const addAdjacentRooms = (stackOpenCells, stackRooms, currentRoom, gridRooms, nbLines, nbColumns) => {
    let stackAdjacentRooms = setAdjacentRooms(currentRoom, gridRooms, nbLines, nbColumns)

    stackAdjacentRooms.map(room => {
        gridRooms[room[0]][room[1]] = true
        stackRooms.push(room)
        addOpenCells(stackOpenCells, currentRoom, room)
    })

}

const setAdjacentRooms = (room, gridRooms, nbLines, nbColumns) => {
    let n = room[0]
    let m = room[1]
    let array = []

    if(n > 0 && !gridRooms[n-1][m]) array.push([n-1, m]) // Pièce nord
    if(n < nbLines - 1 && !gridRooms[n+1][m]) array.push([n+1, m]) // Pièce sud
    if(m > 0 && !gridRooms[n][m-1]) array.push([n, m-1]) // Pièce ouest
    if(m < nbColumns - 1 && !gridRooms[n][m+1]) array.push([n, m+1]) // Pièce est

    return shuffleArrayDim(array)
}

const addOpenCells = (stackOpenCells, currentRoom, adjacentRoom) => {
    let cellsToAdd = []

    cellsToAdd.push([currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1])
    cellsToAdd.push([2*adjacentRoom[0]+1, 2*adjacentRoom[1]+1])

    stackOpenCells.push(cellsToAdd)
}

export { algoSpiral }