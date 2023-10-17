import { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim } from "../utils/outils.js"

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

const addOpenCells = (stackOpenCells, currentRoom, adjacentRoom) => {
    let cellsToAdd = []

    if(adjacentRoom[0]<currentRoom[0]) cellsToAdd.push([2*currentRoom[0], 2*currentRoom[1]+1]) // Mur nord
    else if(adjacentRoom[0] > currentRoom[0]) cellsToAdd.push([2*currentRoom[0]+2, 2*currentRoom[1]+1]) // Mur sud
    else if(adjacentRoom[1] < currentRoom[1]) cellsToAdd.push([2*currentRoom[0]+1, 2*currentRoom[1]]) // Mur ouest
    else cellsToAdd.push([2*currentRoom[0]+1, 2*currentRoom[1]+2]) // Mur est

    cellsToAdd.push([2*adjacentRoom[0]+1, 2*adjacentRoom[1]+1])

    stackOpenCells.push(cellsToAdd)
}

const algoProfondeur = (stackOpenCells, nbGridLines, nbGridColumns) => {
    let gridRooms = createArray2Dim(nbGridLines, nbGridColumns, false)
    let stackRooms = [], currentRoom = [], adjacentRoom = []

    // Pièce de départ déterminée aléatoirement
    currentRoom = [getRandomIntInclusive(0, nbGridLines-1),getRandomIntInclusive(0, nbGridColumns-1)]
    gridRooms[currentRoom[0]][currentRoom[1]] = true
    stackRooms.push(currentRoom)
    stackOpenCells.push([[2*currentRoom[0]+1, 2*currentRoom[1]+1]])

    // Algorithme de création du labyrinthe
    while(stackRooms.length > 0) {
        currentRoom = stackRooms[stackRooms.length-1]
        adjacentRoom = setAdjacentRoom(currentRoom, gridRooms)

        if(adjacentRoom) {
            gridRooms[adjacentRoom[0]][adjacentRoom[1]] = true
            stackRooms.push(adjacentRoom)
            addOpenCells(stackOpenCells, currentRoom, adjacentRoom)
        }
        else {
            stackRooms.pop()
        }
    }

    // Ajout de l'entrée et de la sortie (dernier tableau de la pile)
    let indexEntry, indexExit

    indexEntry = 2*getRandomIntInclusive(0, nbGridLines-1)+1
    indexExit = 2*getRandomIntInclusive(0, nbGridLines-1)+1

    stackOpenCells.push([[indexEntry,0],[indexExit,2*nbGridColumns]])

    return stackOpenCells
}

export { algoProfondeur }