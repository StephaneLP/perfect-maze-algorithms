import { getRandomIntInclusive, shuffleArrayDim, createArray2Dim } from "../utils/tools.js"

const algoFusion = (stackOpenCells, nbGridLines, nbGridColumns) => {
    let gridRooms = initGridRooms(nbGridLines, nbGridColumns)
    let stackWalls = initStackWalls(nbGridLines, nbGridColumns)
    let wall = [], room0 = [], room1 = [], numBranch0 = 0, numBranch1 = 0

    stackWalls = shuffleArrayDim(stackWalls)

    while(stackWalls.length > 0) {
        wall = stackWalls[stackWalls.length - 1]
        room0 = getCoordinates(wall[0], nbGridColumns)
        room1 = getCoordinates(wall[1], nbGridColumns)
        numBranch0 = gridRooms[room0[0]][room0[1]].numBranch
        numBranch1 = gridRooms[room1[0]][room1[1]].numBranch

        if (numBranch0 !== numBranch1) {
            updateNumBranches(gridRooms, numBranch0, numBranch1)
            addOpenCells(stackOpenCells, gridRooms, room0, room1)
        }
        stackWalls.pop()
    }

    return stackOpenCells
}

const initGridRooms = (nbLin, nbCol) => {
    let arr = createArray2Dim(nbLin, nbCol)
    arr = arr.map((arr, n) => arr.map((el, m) => el = {numBranch: m + n * nbCol, visited: false}))

    return arr
}

const initStackWalls = (nbLin, nbCol) => {
    let arr = []

    for (let n = 0; n < nbLin; n++) {
        for (let m = 0; m < nbCol; m++) {
            if(m < nbCol - 1) arr.push([setRoomNumber(n, m, nbCol), setRoomNumber(n, m + 1, nbCol)])
            if(n < nbLin - 1) arr.push([setRoomNumber(n, m, nbCol), setRoomNumber(n + 1, m, nbCol)])
        }
    }
    return arr
}

const setRoomNumber = (n, m, nbCol) => {
    return (m + n * nbCol)
}

const getCoordinates = (nbRoom, nbCol) => {
    return [Math.floor(nbRoom / nbCol), nbRoom % nbCol]
}

const updateNumBranches = (gridRooms, numBranch0, numBranch1) => {
    gridRooms.map((arr, n) => arr.map((room, m) => {
        if (room.numBranch == numBranch1) gridRooms[n][m].numBranch = numBranch0
    }))
}
    
const addOpenCells = (stackOpenCells, gridRooms, room0, room1) => {
    let cellRooms = []

    cellRooms.push([room0[0] + room1[0] + 1, room0[1] + room1[1] + 1])
    if (!gridRooms[room0[0]][room0[1]].visited) {
        cellRooms.push([2 * room0[0] + 1, 2 * room0[1] + 1])
        gridRooms[room0[0]][room0[1]].visited = true
    }
    if(!gridRooms[room1[0]][room1[1]].visited) {
        cellRooms.push([2 * room1[0] + 1, 2 * room1[1] + 1])
        gridRooms[room1[0]][room1[1]].visited = true
    }
    stackOpenCells.push(cellRooms)
}

export { algoFusion }