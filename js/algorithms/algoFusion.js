import { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim } from "../utils/outils.js"

const algoFusion = (stackOpenCells, nbGridLines, nbGridColumns) => {
    // Initialisation du tableau contenant les branches (pièces) du labyrinthe
    // Chaque élément contient les coordonnées n et m et un numéro de branche
    let arrBranches = []
    let numBranche = 0

    for(let n=0; n<nbGridLines; n++) {
        for(let m=0; m<nbGridColumns; m++) {
            arrBranches.push({
                n: n,
                m: m,
                branche: numBranche
            })
            numBranche += 1
        }
    }

    let nbBranches = nbGridLines*nbGridColumns
    let isCelluleParcours = []
    let arrCellulesAdjacentes = []

    while(nbBranches>1) {

        isCelluleParcours = arrBranches[getRandomIntInclusive(0, nbGridLines*nbGridColumns-1)]
        arrCellulesAdjacentes = setArrCellulesAdjacentes(isCelluleParcours, arrBranches, nbGridLines, nbGridColumns)








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

    // Ajout des cellules (murs) Entrée et Sortie (dernier tableau de la pile)
    let indexEntry, indexExit

    indexEntry = 2*getRandomIntInclusive(0, nbGridLines-1)+1
    indexExit = 2*getRandomIntInclusive(0, nbGridLines-1)+1

    stackOpenCells.push([[indexEntry, 0],[indexExit, 2 * nbGridColumns]])

    return stackOpenCells
}

// Retourne un tableau contenant les cellules adjacentes
function setArrCellulesAdjacentes(cellule, arrBranches, nbColonnes, nbLignes) {
    let x = cellule.x
    let y = cellule.y
    let tab = []

    if(x>0) tab.push({
        x: x-1,
        y: y,
        branche: getNumBranche(arrBranches, x-1, y)
    })

    if(x<nbColonnes-1) tab.push({
        x: x+1,
        y: y,
        branche: getNumBranche(arrBranches, x+1, y)
    })

    if(y>0) tab.push({
        x: x,
        y: y-1,
        branche: getNumBranche(arrBranches, x, y-1)
    })

    if(y<nbLignes-1) tab.push({
        x: x,
        y: y+1,
        branche: getNumBranche(arrBranches, x, y+1)
    })

    tab = randomArray(tab)
    return tab 
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