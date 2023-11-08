import { shuffleArray2Dim, createArray2Dim } from "../utils/generalTools.js"

/****************************************************************************************

****************************************************************************************/

const algoFusion = (nbLines, nbColumns) => {
    let maze = initMaze(nbLines, nbColumns)
    let stackWalls = initStackWalls(nbLines, nbColumns)
    let stackOpenCells = [], wall = [], room0 = [], room1 = [], numBranch0 = 0, numBranch1 = 0

    stackWalls = shuffleArray2Dim(stackWalls)

    while (stackWalls.length > 0) {
        wall = stackWalls[stackWalls.length - 1]
        room0 = [Math.floor(wall[0] / nbColumns), wall[0] % nbColumns]
        room1 = [Math.floor(wall[1] / nbColumns), wall[1] % nbColumns]
        numBranch0 = maze[room0[0]][room0[1]].numBranch
        numBranch1 = maze[room1[0]][room1[1]].numBranch

        if (numBranch0 !== numBranch1) {
            updateNumBranches(maze, numBranch0, numBranch1)
            addOpenCells(stackOpenCells, maze, room0, room1)
        }
        stackWalls.pop()
    }

    return stackOpenCells
}

/****************************************************************************************

****************************************************************************************/

const initMaze = (nbLines, nbColumns) => {
    let arr = createArray2Dim(nbLines, nbColumns)
    arr = arr.map((arr, n) => arr.map((el, m) => el = {numBranch: m + n * nbColumns, visited: false}))

    return arr
}

/****************************************************************************************

****************************************************************************************/

const initStackWalls = (nbLines, nbColumns) => {
    let arr = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            if (m < nbColumns - 1) arr.push([m + n * nbColumns, m + 1 + n * nbColumns])
            if (n < nbLines - 1) arr.push([m + n * nbColumns, m + (n + 1) * nbColumns])
        }
    }
    return arr
}

/****************************************************************************************

****************************************************************************************/

const updateNumBranches = (maze, numBranch0, numBranch1) => {
    maze.map((arr, n) => arr.map((room, m) => {
        if (room.numBranch === numBranch1) maze[n][m].numBranch = numBranch0
    }))
}
    
/****************************************************************************************

****************************************************************************************/

const addOpenCells = (stackOpenCells, maze, room0, room1) => {
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
    stackOpenCells.push(cells)
}

export { algoFusion }