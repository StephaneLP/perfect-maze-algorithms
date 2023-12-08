import { getRandomIntInclusive, createArray2Dim } from "../utils/generalTools.js"

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 3
 */
const algoPrim = (nbLines, nbColumns) => {
    let maze = createArray2Dim(nbLines, nbColumns, false)
    let stackOpenCells = [], stackWalls = []
    let currentWall = [], currentRoom = []
    let index = 0

    currentRoom = [getRandomIntInclusive(0, nbLines - 1), getRandomIntInclusive(0, nbColumns - 1)]
    updateStacks(currentRoom, null, stackWalls, stackOpenCells, maze, nbLines, nbColumns)

    while (stackWalls.length > 0) {
        index = getRandomIntInclusive(0, stackWalls.length - 1)
        currentWall = stackWalls[index]
        currentRoom = setCurrentRoom(currentWall, maze)
        if (currentRoom !== null) updateStacks(currentRoom, currentWall, stackWalls, stackOpenCells, maze, nbLines, nbColumns)
        stackWalls.splice(index, 1)
    }

    return stackOpenCells
}

/**
 * Description détaillée : README_ALGORITHMS.md
 * @param {array} currentRoom 
 * @param {array} currentWall 
 * @param {array} stackWalls Tableau de dimension 2
 * @param {array} stackOpenCells Tableau de dimension 3
 * @param {array} maze Tableau de dimension 2
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 */
const updateStacks = (currentRoom, currentWall, stackWalls, stackOpenCells, maze, nbLines, nbColumns) => {
    maze[currentRoom[0]][currentRoom[1]] = true
    setAdjacentWalls(currentRoom, nbLines, nbColumns).map(wall => stackWalls.push(wall))
    stackOpenCells.push(currentWall ? [currentWall, [2 * currentRoom[0] + 1, 2 * currentRoom[1] + 1]] : [[2 * currentRoom[0] + 1, 2 * currentRoom[1] + 1]])
}

/**
 * Retourne les murs (sauf les murs extérieurs) qui entourent une pièce
 * @param {array} room 
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @returns {array} Tableau de dimension 2
 */
const setAdjacentWalls = (room, nbLines, nbColumns) => {
    let line = room[0], column = room[1]
    let array = []

    if (line > 0) array.push([2 * line, 2 * column + 1]) // Mur nord
    if (column < nbColumns - 1) array.push([2 * line + 1, 2 * column + 2]) // Mur est
    if (line < nbLines - 1) array.push([2 * line + 2, 2 * column + 1]) // Mur sud
    if (column > 0) array.push([2 * line + 1, 2 * column]) // Mur ouest
    
    return array
}

/**
 * Retourne les coordonnées d'une pièce non visitée adjacente au mur (null si aucune)
 * @param {array} wall 
 * @param {array} maze Tableau de dimension 2
 * @returns {array|null}
 */
const setCurrentRoom = (wall, maze) => {
    let room0 = [], room1 = []

    if (wall[0] % 2 == 0) { // Mur horizontal
        room0 = [(wall[0] - 2) / 2, (wall[1] - 1) / 2]
        room1 = [(wall[0]) / 2, (wall[1] - 1) / 2]
    } else { // Mur vertical
        room0 = [(wall[0] - 1) / 2, (wall[1] - 2) / 2]
        room1 = [(wall[0] - 1) / 2, (wall[1]) / 2]
    }

    if (maze[room0[0]][room0[1]] && maze[room1[0]][room1[1]]) return null

    return (maze[room0[0]][room0[1]] ? room1 : room0)
}

export { algoPrim }