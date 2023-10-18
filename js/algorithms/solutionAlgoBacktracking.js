import { getRandomIntInclusive, createArray2Dim, convertCellToRoom, convertRoomToCell } from "../utils/outils.js"

const solutionAlgoBacktracking = (stackSolutionCells, gridMaze, accessCells) => {
    let currentRoom = [], adjacentRoom = [], stackCells = []
    let gridRooms = createArray2Dim(gridMaze.length, gridMaze[0].length, false)
    const entryCell = [...accessCells[0]]
    const exitCell = [...accessCells[1]]
    const entryRoom = [(entryCell[0] - 1) / 2, (entryCell[1]) / 2]
    const exitRoom = [(exitCell[0]- 1 ) / 2, (exitCell[1] - 2 ) / 2]

    stackSolutionCells.push({cell: entryCell, display: true})
    currentRoom = [...entryRoom]
    gridRooms[currentRoom[0]][currentRoom[1]] = true
    stackSolutionCells.push({cell: convertRoomToCell(currentRoom), display: true})
let c = 0
    while(notCurrentRoomExit(currentRoom, exitRoom)) {
c += 1
if(c==1000) {console.log(stackCells); return}
        adjacentRoom = setAdjacentRoom(currentRoom, gridRooms, gridMaze)
        if(adjacentRoom) {
            gridRooms[adjacentRoom[0]][adjacentRoom[1]] = true
            addSolutionCells(stackSolutionCells, currentRoom, adjacentRoom)
            addCells(stackCells, stackSolutionCells.slice(-2))

            currentRoom = [...adjacentRoom]
        }
        else {
            if(stackCells.length !== 0) {
            updateSolutionCells(stackSolutionCells, stackCells)
            currentRoom = [...stackCells.slice(-1)]                
            }

        }
    }
    
}

const addCells = (stackCells, arrCells) => {
    arrCells.map(arr => stackCells.push([...arr.cell]))
}

const addSolutionCells = (stackSolutionCells, currentRoom, adjacentRoom) => {
    stackSolutionCells.push({cell: [currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1], display: true})
    stackSolutionCells.push({cell: [2*adjacentRoom[0]+1, 2*adjacentRoom[1]+1], display: true})
}

const updateSolutionCells = (stackSolutionCells, stackCells) => {
    let cell

    cell = [...stackCells[stackCells.length - 1]]
    stackSolutionCells.push({cell: cell, display: false})
    stackCells.pop()

    cell = [...stackCells[stackCells.length - 1]]
    stackSolutionCells.push({cell: cell, display: false})
    stackCells.pop()

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

    if(array.length === 0) return null

    const indice = getRandomIntInclusive(0, array.length - 1)
    return array[indice]
}


function notCurrentRoomExit(room1, room2) {
    return (room1[0] !== room2[0])||(room1[1] !== room2[1])
}

export { solutionAlgoBacktracking }