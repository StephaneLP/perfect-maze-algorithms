import { getRandomIntInclusive, equalArrays, createArray2Dim } from "../utils/generalTools.js"
import { convertCellToRoom, convertRoomToCell } from "../utils/specificTools.js"

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {array} gridMaze Tableau de dimension 2
 * @param {array} accessCells Tableau de dimension 2
 * @returns {array} tableau contenant des objets
 */
const algoSolution = (gridMaze, accessCells) => {
    const entryCell = [...accessCells[0]]
    const exitCell = [...accessCells[1]]
    const entryRoom = [(entryCell[0] - 1) / 2, (entryCell[1]) / 2]
    const exitRoom = [(exitCell[0]- 1 ) / 2, (exitCell[1] - 2 ) / 2]

    let mazeSearch = createArray2Dim((gridMaze.length - 1) / 2, (gridMaze[0].length - 1) / 2, false)
    let stackSearch = [], stackCells = []
    let currentRoom = [], adjacentRoom = []

    updateStacksForward(stackSearch, stackCells, entryCell)
    updateStacksForward(stackSearch, stackCells, convertRoomToCell(entryRoom))

    currentRoom = [...entryRoom]
    mazeSearch[currentRoom[0]][currentRoom[1]] = true

    while (!equalArrays(currentRoom, exitRoom)) {
        adjacentRoom = setAdjacentRoom(currentRoom, mazeSearch, gridMaze)
        if (adjacentRoom) {
            updateStacksForward(stackSearch, stackCells, [currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1])
            updateStacksForward(stackSearch, stackCells, [2 * adjacentRoom[0] + 1, 2 * adjacentRoom[1] + 1])
 
            currentRoom = [...adjacentRoom]
            mazeSearch[currentRoom[0]][currentRoom[1]] = true
        } else {
            updateStacksBackward(stackSearch, stackCells)
            updateStacksBackward(stackSearch, stackCells)

            currentRoom = convertCellToRoom(stackSearch[stackSearch.length - 1])
        }
    }
    stackCells.push({cell: exitCell, display: true, solution: true})

    return stackCells
}

/**
 * Ajout de la cellule cell dans les piles stackSearch et stackCells (en tant que solution)
 * @param {array} stackSearch Tableau de dimension 2
 * @param {array} stackCells Tableau contenant des objets
 * @param {array} cell
 */
const updateStacksForward = (stackSearch, stackCells, cell) => {
    stackSearch.push(cell)
    stackCells.push({cell: cell, display: true, solution: true})
}

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {array} stackSearch Tableau de dimension 2
 * @param {array} stackCells Tableau contenant des objets
 */
const updateStacksBackward = (stackSearch, stackCells) => {
    let cell = stackSearch.pop()

    stackCells.push({cell: cell, display: false, solution: false})
    stackCells.filter(obj => (obj.cell[0] === cell[0]) && (obj.cell[1] === cell[1]) && (obj.solution === true)).map(arr => arr.solution = false)
}

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {array} room 
 * @param {array} mazeSearch Tableau de dimension 2
 * @param {array} gridMaze Tableau de dimension 2
 * @returns {array|null}
 */
const setAdjacentRoom = (room, mazeSearch, gridMaze) => {
    const n = room[0], m = room[1]
    let array = []

    const isNorthAccessible = ((n > 0) && (gridMaze[2 * n][2 * m + 1 ]) && (!mazeSearch[n - 1][m]))
    const isSouthAccessible = ((n < mazeSearch.length - 1) && (gridMaze[2 * n + 2][2 * m + 1]) && (!mazeSearch[n + 1][m]))
    const isWestAccessible = ((m > 0) && (gridMaze[2 * n + 1][2 * m]) && (!mazeSearch[n][m - 1]))
    const isEstAccessible = ((m < mazeSearch[0].length - 1) && (gridMaze[2 * n + 1][2 * m + 2]) && (!mazeSearch[n][m + 1]))

    if (isNorthAccessible) array.push([n - 1, m]) // Pièce nord
    if (isSouthAccessible) array.push([n + 1, m]) // Pièce sud
    if (isWestAccessible) array.push([n, m - 1]) // Pièce ouest
    if (isEstAccessible) array.push([n, m + 1]) // Pièce est

    if(array.length === 0) return null

    const indice = getRandomIntInclusive(0, array.length - 1)
    return array[indice]
}

export { algoSolution }