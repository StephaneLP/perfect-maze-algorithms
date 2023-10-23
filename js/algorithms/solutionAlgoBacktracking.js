import { getRandomIntInclusive, createArray2Dim, convertCellToRoom, convertRoomToCell } from "../utils/tools.js"

const solutionAlgoBacktracking = (stackSolutionCells, stackSearchSolutionCells, gridMaze, accessCells) => {
    let currentRoom = [], adjacentRoom = []
    let gridRooms = createArray2Dim(gridMaze.length, gridMaze[0].length, false)
    const entryCell = [...accessCells[0]]
    const exitCell = [...accessCells[1]]
    const entryRoom = [(entryCell[0] - 1) / 2, (entryCell[1]) / 2]
    const exitRoom = [(exitCell[0]- 1 ) / 2, (exitCell[1] - 2 ) / 2]

    stackSearchSolutionCells.push({cell: entryCell, display: true})
    currentRoom = [...entryRoom]
    gridRooms[currentRoom[0]][currentRoom[1]] = true
    stackSearchSolutionCells.push({cell: convertRoomToCell(currentRoom), display: true})
    addCells(stackSolutionCells, stackSearchSolutionCells.slice(-2))

    while(notCurrentRoomExit(currentRoom, exitRoom)) {
        adjacentRoom = setAdjacentRoom(currentRoom, gridRooms, gridMaze)
        if(adjacentRoom) {
            gridRooms[adjacentRoom[0]][adjacentRoom[1]] = true
            addSolutionCells(stackSearchSolutionCells, currentRoom, adjacentRoom)
            addCells(stackSolutionCells, stackSearchSolutionCells.slice(-2))
            currentRoom = [...adjacentRoom]
        }
        else {
            updateSolutionCells(stackSearchSolutionCells, stackSolutionCells)
            currentRoom = convertCellToRoom(stackSolutionCells[stackSolutionCells.length - 1].cell)
        }
    }
    stackSearchSolutionCells.push({cell: exitCell, display: true})
    stackSolutionCells.push({cell: exitCell, display: true})
}

const addCells = (stackSolutionCells, arrCells) => {
    arrCells.map(obj => stackSolutionCells.push({cell: [...obj.cell],display: obj.display}))
}

const addSolutionCells = (stackSearchSolutionCells, currentRoom, adjacentRoom) => {
    stackSearchSolutionCells.push({cell: [currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1], display: true})
    stackSearchSolutionCells.push({cell: [2*adjacentRoom[0]+1, 2*adjacentRoom[1]+1], display: true})
}

const updateSolutionCells = (stackSearchSolutionCells, stackSolutionCells) => {
    let obj

    for(let i = 0; i < 2; i++) {
        obj = stackSolutionCells[stackSolutionCells.length - 1]
        stackSearchSolutionCells.push({cell: [...obj.cell], display: false})
        stackSolutionCells.pop()        
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

    if(array.length === 0) return null

    const indice = getRandomIntInclusive(0, array.length - 1)
    return array[indice]
}


function notCurrentRoomExit(room1, room2) {
    return (room1[0] !== room2[0])||(room1[1] !== room2[1])
}

export { solutionAlgoBacktracking }