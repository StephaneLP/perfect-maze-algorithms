import { getRandomIntInclusive, equalArrays, createArray2Dim } from "../utils/generalTools.js"
import { convertCellToRoom, convertRoomToCell } from "../utils/specificTools.js"

/****************************************************************************************

****************************************************************************************/

const algoSolution = (gridMaze, accessCells) => {
    let currentRoom = [], adjacentRoom = [], stackSolution = [], stackCells = [], cell = []

    let gridMazeTrace = createArray2Dim(gridMaze.length, gridMaze[0].length, false)
    const entryCell = [...accessCells[0]]
    const exitCell = [...accessCells[1]]
    const entryRoom = [(entryCell[0] - 1) / 2, (entryCell[1]) / 2]
    const exitRoom = [(exitCell[0]- 1 ) / 2, (exitCell[1] - 2 ) / 2]


    stackCells.push({cell: entryCell, display: true, solution: true})
    stackSolution.push(entryCell)
    
    stackCells.push({cell: convertRoomToCell(entryRoom), display: true, solution: true})
    stackSolution.push(convertRoomToCell(entryRoom))

    gridMazeTrace[entryRoom[0]][entryRoom[1]] = true
    currentRoom = [...entryRoom]

    while (!equalArrays(currentRoom, exitRoom)) {
        adjacentRoom = setAdjacentRoom(currentRoom, gridMazeTrace, gridMaze)
        if (adjacentRoom) {
            stackCells.push({cell: [currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1], display: true, solution: true})
            stackSolution.push([currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1])

            stackCells.push({cell: [2 * adjacentRoom[0] + 1, 2 * adjacentRoom[1] + 1], display: true, solution: true})
            stackSolution.push([2 * adjacentRoom[0] + 1, 2 * adjacentRoom[1] + 1])

            gridMazeTrace[adjacentRoom[0]][adjacentRoom[1]] = true
            currentRoom = [...adjacentRoom]
        } else {
            cell = stackSolution[stackSolution.length - 1]
            stackCells.push({cell: [...cell], display: false, solution: false})
            stackCells.filter(obj => obj.cell[0] === cell[0] && obj.cell[1] === cell[1]).map(arr => arr.solution = false)
            stackSolution.pop() 

            cell = stackSolution[stackSolution.length - 1]
            stackCells.push({cell: [...cell], display: false, solution: false})
            stackCells.filter(obj => obj.cell[0] === cell[0] && obj.cell[1] === cell[1]).map(arr => arr.solution = false)
            stackSolution.pop() 

            currentRoom = [...convertCellToRoom(stackSolution[stackSolution.length - 1])]
        }
    }
    stackCells.push({cell: exitCell, display: true, solution: true})

    return stackCells
}



/****************************************************************************************

****************************************************************************************/

// Retourne aléatoirement une pièce adjacente accessible non visitée
const setAdjacentRoom = (room, gridMazeTrace, gridMaze) => {
    const n = room[0], m = room[1], array = []

    const isNorthAccessible = ((n > 0) && (gridMaze[2 * n][2 * m + 1 ]) && (!gridMazeTrace[n - 1][m]))
    const isSouthAccessible = ((n < gridMazeTrace.length - 1) && (gridMaze[2 * n + 2][2 * m + 1]) && (!gridMazeTrace[n + 1][m]))
    const isWestAccessible = ((m > 0) && (gridMaze[2 * n + 1][2 * m]) && (!gridMazeTrace[n][m - 1]))
    const isEstAccessible = ((m < gridMazeTrace[0].length - 1) && (gridMaze[2 * n + 1][2 * m + 2]) && (!gridMazeTrace[n][m + 1]))

    if (isNorthAccessible) array.push([n - 1, m]) // Pièce nord
    if (isSouthAccessible) array.push([n + 1, m]) // Pièce sud
    if (isWestAccessible) array.push([n, m - 1]) // Pièce ouest
    if (isEstAccessible) array.push([n, m + 1]) // Pièce est

    if(array.length === 0) return null

    const indice = getRandomIntInclusive(0, array.length - 1)
    return array[indice]
}

export { algoSolution }