import { shuffleArray2Dim, createArray2Dim, notEqual } from "./outils.js"
import { backUpMaze } from "./generator.js"

const solutionAlgoBacktracking = (stackSolutionRooms, stackSearchSolutionRooms, gridMaze, RoomEntry, RoomExit) => {
    let currentRoom = [], adjacentRoom = []
    let gridRooms = createArray2Dim(backUpMaze.nbGridLines, backUpMaze.nbGridColumns, false)

    // Pièce de départ : Entrée du labyrinthe
    currentRoom = [...RoomEntry]
    gridRooms[currentRoom[0]][currentRoom[1]] = true
    stackSolutionRooms.push(currentRoom)
    stackSearchSolutionRooms.push({room: currentRoom, display: true})

    // Algorithme de recherche du chemin solution
    while(notEqual(currentRoom, RoomExit)) {
        adjacentRoom = setAdjacentRoom(currentRoom, gridRooms, gridMaze)
        if(adjacentRoom) {
            currentRoom = [adjacentRoom[0],adjacentRoom[1]]
            gridRooms[currentRoom[0]][currentRoom[1]] = true
            stackSolutionRooms.push(currentRoom)
            stackSearchSolutionRooms.push({room: currentRoom, display: true})
        }
        else {
            stackSearchSolutionRooms.push({room: currentRoom, display: false})
            stackSolutionRooms.pop()
            currentRoom = stackSolutionRooms[stackSolutionRooms.length - 1]
        }
    } 
}

// Retourne aléatoirement une pièce adjacente accessible non visitée
const setAdjacentRoom = (room, gridRooms, gridMaze) => {
    const n = room[0], m = room[1], array = []

    const isNorthAccessible = ((n > 0) && (gridMaze[2 * n][2 * m + 1 ]) && (!gridRooms[n - 1][m]))
    const isSouthAccessible = ((n < gridRooms.length - 1) && (gridMaze[2 * n + 2][2 * m + 1]) && (!gridRooms[n + 1][m]))
    const isWestAccessible = ((m > 0) && (gridMaze[2 * n + 1][2 * m]) && (!gridRooms[n][m-1]))
    const isEstAccessible = ((m < gridRooms[0].length - 1) && (gridMaze[2 * n + 1][2 * m + 2]) && (!gridRooms[n][m + 1]))

    if(isNorthAccessible) array.push([n - 1, m]) // Pièce nord
    if(isSouthAccessible) array.push([n + 1, m]) // Pièce sud
    if(isWestAccessible) array.push([n, m - 1]) // Pièce ouest
    if(isEstAccessible) array.push([n, m + 1]) // Pièce est

    if(array.length > 0) return shuffleArray2Dim(array)[0]

    return null 
}

export { solutionAlgoBacktracking }