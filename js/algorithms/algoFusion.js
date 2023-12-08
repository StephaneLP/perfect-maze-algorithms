import { shuffleArray2Dim, createArray2Dim } from "../utils/generalTools.js"

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 3
 */
const algoFusion = (nbLines, nbColumns) => {
    let maze = initMaze(nbLines, nbColumns)
    let stackWalls = initStackWalls(nbLines, nbColumns)

    stackWalls = shuffleArray2Dim(stackWalls)

    let stackOpenCells = [], currentWall = [], room0 = [], room1 = []
    let numBranch0 = 0, numBranch1 = 0

    while (stackWalls.length > 0) {
        currentWall = stackWalls[stackWalls.length - 1]
        room0 = [Math.floor(currentWall[0] / nbColumns), currentWall[0] % nbColumns]
        room1 = [Math.floor(currentWall[1] / nbColumns), currentWall[1] % nbColumns]
        numBranch0 = maze[room0[0]][room0[1]].numBranch
        numBranch1 = maze[room1[0]][room1[1]].numBranch

        if (numBranch0 !== numBranch1) {
            maze.forEach(array => {
                array.filter(room => room.numBranch === numBranch1).forEach(room => room.numBranch = numBranch0)
            })
            stackOpenCells.push(addOpenCells(maze, room0, room1))
        }
        stackWalls.pop()
    }

    return stackOpenCells
}

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 2 qui contient des objets
 */
const initMaze = (nbLines, nbColumns) => {
    let array = createArray2Dim(nbLines, nbColumns)

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            array[n][m] = {numBranch: m + n * nbColumns, visited: false}
        }
    }
    return array
}

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau à 2 dimensions
 */
const initStackWalls = (nbLines, nbColumns) => {
    let array = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            if (m < nbColumns - 1) array.push([m + n * nbColumns, m + 1 + n * nbColumns])
            if (n < nbLines - 1) array.push([m + n * nbColumns, m + (n + 1) * nbColumns])
        }
    }
    return array
}

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {array} maze Tableau de dimension 2
 * @param {array} room0 
 * @param {array} room1 
 * @returns {array} Tableau de dimension 2
 */
const addOpenCells = (maze, room0, room1) => {
    let cells = []

    cells.push([room0[0] + room1[0] + 1, room0[1] + room1[1] + 1])
    if (!maze[room0[0]][room0[1]].visited) {
        cells.push([2 * room0[0] + 1, 2 * room0[1] + 1])
        maze[room0[0]][room0[1]].visited = true
    }
    if (!maze[room1[0]][room1[1]].visited) {
        cells.push([2 * room1[0] + 1, 2 * room1[1] + 1])
        maze[room1[0]][room1[1]].visited = true
    }
    return cells
}

export { algoFusion }