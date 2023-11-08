import { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim } from "../utils/generalTools.js"

/****************************************************************************************

****************************************************************************************/

const algoProfondeur = (nbLines, nbColumns) => {
    let maze = createArray2Dim(nbLines, nbColumns, false)
    let stackOpenCells = [], stackRooms = [], currentRoom = [], adjacentRoom = []

    // Pièce de départ déterminée aléatoirement
    currentRoom = [getRandomIntInclusive(0, nbLines - 1), getRandomIntInclusive(0, nbColumns - 1)]
    maze[currentRoom[0]][currentRoom[1]] = true
    stackRooms.push(currentRoom)
    stackOpenCells.push([[2 * currentRoom[0] + 1, 2 * currentRoom[1] + 1]])

    // Algorithme de création du labyrinthe
    while (stackRooms.length > 0) {
        currentRoom = stackRooms[stackRooms.length - 1]
        adjacentRoom = setAdjacentRoom(currentRoom, maze)

        if (adjacentRoom) {
            maze[adjacentRoom[0]][adjacentRoom[1]] = true
            stackRooms.push(adjacentRoom)
            addOpenCells(stackOpenCells, currentRoom, adjacentRoom)
        } else {
            stackRooms.pop()
        }
    }

    return stackOpenCells
}

/****************************************************************************************

****************************************************************************************/

// Retourne aléatoirement une pièce adjacente non visitée
const setAdjacentRoom = (room, maze) => {
    let n = room[0]
    let m = room[1]
    let array = []

    if ((n > 0) && (!maze[n - 1][m])) array.push([n - 1, m]) // Pièce nord
    if ((n < maze.length - 1) && (!maze[n + 1][m])) array.push([n + 1, m]) // Pièce sud
    if ((m > 0) && (!maze[n][m - 1])) array.push([n, m - 1]) // Pièce ouest
    if ((m < maze[0].length - 1) && (!maze[n][m + 1])) array.push([n, m + 1]) // Pièce est

    if (array.length === 0) return null 

    return shuffleArray2Dim(array)[0]
}

/****************************************************************************************

****************************************************************************************/

const addOpenCells = (stackOpenCells, currentRoom, adjacentRoom) => {
    let cellsToAdd = []

    cellsToAdd.push([currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1])
    cellsToAdd.push([2 * adjacentRoom[0] + 1, 2 * adjacentRoom[1] + 1])

    stackOpenCells.push(cellsToAdd)
}

export { algoProfondeur }