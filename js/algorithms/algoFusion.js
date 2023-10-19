import { getRandomIntInclusive, shuffleArrayDim, createArray2Dim } from "../utils/outils.js"

const algoFusion = (stackOpenCells, nbGridLines, nbGridColumns) => {
    let gridRooms = initGridRooms(nbGridLines, nbGridColumns)
    let stackWalls = initStackWalls(nbGridLines, nbGridColumns)
    let wall = [], cell0 = [], cell1 = []

    stackWalls = shuffleArrayDim(stackWalls)

    while(stackWalls.length > 0) {
        wall = stackWalls[stackWalls.length - 1]

        cell0 = getCoordinates(wall[0], nbGridColumns)
        cell1 = getCoordinates(wall[1], nbGridColumns)

        if (gridRooms[cell0[0]][cell0[1]] !== gridRooms[cell1[0]][cell1[1]]) {
            console.log("ok")
        }
        stackWalls.pop()
    }













    return stackOpenCells
}

const initGridRooms = (nbLin, nbCol) => {
    let arr = createArray2Dim(nbLin, nbCol)
    arr = arr.map((arr, n) => arr.map((el, m) => el = m + n * nbCol))
console.log(arr)
    return arr
}

const initStackWalls = (nbLin, nbCol) => {
    let arr = []

    for (let n = 0; n < nbLin; n++) {
        for (let m = 0; m < nbCol; m++) {
            if (m < nbCol - 1) arr.push([setRoomNumber(n, m, nbCol), setRoomNumber(n, m + 1, nbCol)])
            if (n < nbLin - 1) arr.push([setRoomNumber(n, m, nbCol), setRoomNumber(n + 1, m, nbCol)])
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






// Retourne aléatoirement une pièce adjacente non visitée
const setAdjacentRoom = (room, gridRooms) => {
    let n = room[0]
    let m = room[1]
    let array = []
    
    if(n>0 && !gridRooms[n-1][m]) array.push([n-1, m]) // Pièce nord
    if(n<gridRooms.length-1 && !gridRooms[n+1][m]) array.push([n+1, m]) // Pièce sud
    if(m>0 && !gridRooms[n][m-1]) array.push([n, m-1]) // Pièce ouest
    if(m<gridRooms[0].length-1 && !gridRooms[n][m+1]) array.push([n, m+1]) // Pièce est

    if(array.length == 0) return null 

    return shuffleArray2Dim(array)[0]
}

const addOpenCells = (stackOpenCells, currentRoom, adjacentRoom) => {
    let cellsToAdd = []

    cellsToAdd.push([currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1])
    cellsToAdd.push([2*adjacentRoom[0]+1, 2*adjacentRoom[1]+1])

    stackOpenCells.push(cellsToAdd)
}

export { algoFusion }