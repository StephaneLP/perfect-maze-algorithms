import { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim } from "../utils/generalTools.js"

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 3
 */

const algoProfondeur = (nbLines, nbColumns) => {
    let maze = createArray2Dim(nbLines, nbColumns, false)
    let stackOpenCells = [], stackRooms = []
    let lastRoom = [], newRoom = []

    newRoom = [getRandomIntInclusive(0, nbLines - 1), getRandomIntInclusive(0, nbColumns - 1)]
    updateStacks(null, newRoom, stackRooms, stackOpenCells, maze)

    while (stackRooms.length > 0) {
        lastRoom = stackRooms[stackRooms.length - 1]
        newRoom = searchAdjacentRoom(lastRoom, maze)

        if (newRoom) updateStacks(lastRoom, newRoom, stackRooms, stackOpenCells, maze)
        else stackRooms.pop()
    }

    return stackOpenCells
}

/****************************************************************************************/

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {array} lastRoom 
 * @param {array} newRoom 
 * @param {array[2dim]} stackRooms 
 * @param {array} stackOpenCells Tableau de dimension 3
 * @param {array} maze Tableau de dimension 2
 */

const updateStacks = (lastRoom, newRoom, stackRooms, stackOpenCells, maze) => {
    maze[newRoom[0]][newRoom[1]] = true
    stackRooms.push(newRoom)
    if (lastRoom) {
        stackOpenCells.push(addOpenCells(lastRoom, newRoom))
    } else {
        stackOpenCells.push([[2 * newRoom[0] + 1, 2 * newRoom[1] + 1]])
    }
}

/****************************************************************************************/

/**
 * Retourne aléatoirement les coordonnées d'une pièce adjacente non visitée (null si aucune)
 * @param {array} room 
 * @param {array} maze Tableau de dimension 2
 * @returns {array} Coordonnées d'une pièce adjacente
 */

const searchAdjacentRoom = (room, maze) => {
    let n = room[0]
    let m = room[1]
    let array = []

    if ((n > 0) && (!maze[n - 1][m])) array.push([n - 1, m]) // Pièce nord
    if ((n < maze.length - 1) && (!maze[n + 1][m])) array.push([n + 1, m]) // Pièce sud
    if ((m > 0) && (!maze[n][m - 1])) array.push([n, m - 1]) // Pièce ouest
    if ((m < maze[0].length - 1) && (!maze[n][m + 1])) array.push([n, m + 1]) // Pièce est

    if (array.length === 0) return null 

    return shuffleArray2Dim(array)[0]
}

/****************************************************************************************/

/**
 * Détermine les coordonnées des 2 cellules (mur et pièce) à ouvrir pour visiter une nouvelle pièce
 * @param {array} lastRoom 
 * @param {array} newRoom 
 * @returns {array} Tableau de dimension 2
 */

const addOpenCells = (lastRoom, newRoom) => {
    let cellsToAdd = []

    cellsToAdd.push([lastRoom[0] + newRoom[0] + 1, lastRoom[1] + newRoom[1] + 1])
    cellsToAdd.push([2 * newRoom[0] + 1, 2 * newRoom[1] + 1])

    return cellsToAdd
}

export { algoProfondeur }