import { getRandomIntInclusive, createArray2Dim, notEqual } from "../utils/outils.js"
import { backUpMaze } from "../pages/generator.js"

const solutionAlgoBacktracking = (stackSolutionRooms, stackSearchSolutionRooms, gridMaze, RoomEntry, RoomExit) => {
    let currentRoom = [], adjacentRoom = []
    let gridRooms = createArray2Dim(backUpMaze.nbGridLines, backUpMaze.nbGridColumns, false)

    // Pièce de départ : Entrée du labyrinthe
    currentRoom = [...RoomEntry]
    gridRooms[currentRoom[0]][currentRoom[1]] = true
    stackSolutionRooms.push({room: currentRoom, direction: null, display: true})
    stackSearchSolutionRooms.push({room: currentRoom, direction: null, display: true})

    // Algorithme de recherche du chemin solution
    while(notEqual(currentRoom, RoomExit)) {
        adjacentRoom = setAdjacentRoom(currentRoom, gridRooms, gridMaze)
        if(adjacentRoom) {
            currentRoom = [...adjacentRoom.room]
            gridRooms[currentRoom[0]][currentRoom[1]] = true
            stackSolutionRooms.push({room: currentRoom, direction: adjacentRoom.direction, display: true})
            stackSearchSolutionRooms.push({room: currentRoom, direction: adjacentRoom.direction, display: true})
        }
        else {
            stackSearchSolutionRooms.push({room: currentRoom, direction: stackSolutionRooms[stackSolutionRooms.length - 1].direction, display: false})
            stackSolutionRooms.pop()
            currentRoom = [...stackSolutionRooms[stackSolutionRooms.length - 1].room]
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

    if(isNorthAccessible) array.push({room: [n - 1, m], direction: "N"}) // Pièce nord
    if(isSouthAccessible) array.push({room: [n + 1, m], direction: "S"}) // Pièce sud
    if(isWestAccessible) array.push({room: [n, m - 1], direction: "W"}) // Pièce ouest
    if(isEstAccessible) array.push({room: [n, m + 1], direction: "E"}) // Pièce est

    if(array.length === 0) return null

    const indice = getRandomIntInclusive(0, array.length - 1)
    return array[indice]
}

export { solutionAlgoBacktracking }