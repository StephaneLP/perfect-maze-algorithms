import { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim } from "./outils.js"

// Retourne aléatoirement une pièce adjacente non visitée
const setAdjacentRoom = (room, gridRooms) => {
    let n = room[0]
    let m = room[1]
    let array = []
    
    if(n>0 && !gridRooms[n-1][m]) array.push([n-1, m]) // Pièce nord
    if(n<gridRooms.length-1 && !gridRooms[n+1][m]) array.push([n+1, m]) // Pièce sud
    if(m>0 && !gridRooms[n][m-1]) array.push([n, m-1]) // Pièce ouest
    if(m<gridRooms[0].length-1 && !gridRooms[n][m+1]) array.push([n, m+1]) // Pièce est

    if(array.length>0) return shuffleArray2Dim(array)[0]

    return null 
}

const addAdjacentMazeCells = (stackCells, currentRoom, adjacentRoom) => {
    let cellsToAdd = []

    if(adjacentRoom[0] < currentRoom[0]) {
        cellsToAdd.push([2*currentRoom[0], 2*currentRoom[1]+1]) // Mur nord
    }
    else if(adjacentRoom[0] > currentRoom[0]) {
        cellsToAdd.push([2*currentRoom[0]+2, 2*currentRoom[1]+1]) // Mur sud
    }
    else if(adjacentRoom[1] < currentRoom[1]) {
        cellsToAdd.push([2*currentRoom[0]+1, 2*currentRoom[1]]) // Mur ouest
    }
    else {
        cellsToAdd.push([2*currentRoom[0]+1, 2*currentRoom[1]+2]) // Mur est
    }
    cellsToAdd.push([2*adjacentRoom[0]+1, 2*adjacentRoom[1]+1])

    stackCells.push(cellsToAdd)
}

const algoProfondeur = (stackMazeCells, nbGridLines, nbGridColumns) => {
    let gridRooms = createArray2Dim(nbGridLines, nbGridColumns, false)
    let stackRooms = [], currentRoom = [], adjacentRoom = []

    // Cellule de départ déterminée aléatoirement
    currentRoom = [getRandomIntInclusive(0, nbGridLines-1),getRandomIntInclusive(0, nbGridColumns-1)]
    gridRooms[currentRoom[0]][currentRoom[1]] = true
    stackRooms.push(currentRoom)
    stackMazeCells.push([[2*currentRoom[0]+1, 2*currentRoom[1]+1]])

    // Algorithme de création du labyrinthe
    while(stackRooms.length > 0) {
        currentRoom = stackRooms[stackRooms.length-1]
        adjacentRoom = setAdjacentRoom(currentRoom, gridRooms)

        if(adjacentRoom) {
            gridRooms[adjacentRoom[0]][adjacentRoom[1]] = true
            stackRooms.push(adjacentRoom)
            addAdjacentMazeCells(stackMazeCells, currentRoom, adjacentRoom)
        }
        else {
            stackRooms.pop()
        }
    }

    return stackMazeCells
}

export { algoProfondeur }