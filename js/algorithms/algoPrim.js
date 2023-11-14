import { getRandomIntInclusive, createArray2Dim } from "../utils/generalTools.js"

/****************************************************************************************

****************************************************************************************/

const algoPrim = (nbLines, nbColumns) => {
    let maze = createArray2Dim(nbLines, nbColumns, false)
    let stackOpenCells = [], stackWalls = [], currentWall = [], startRoom = [], newRoom = [], index = 0

    startRoom = [getRandomIntInclusive(0, nbLines - 1), getRandomIntInclusive(0, nbColumns - 1)]
    maze[startRoom[0]][startRoom[1]] = true
    addWalls(stackWalls, startRoom, nbLines, nbColumns)
    stackOpenCells.push([[2 * startRoom[0] + 1, 2 * startRoom[1] + 1]])

    while (stackWalls.length > 0) {
        index = getRandomIntInclusive(0, stackWalls.length - 1)
        currentWall = stackWalls[index]
        newRoom = setNewRoom(currentWall, maze)
        
        if (newRoom !== null) {
            maze[newRoom[0]][newRoom[1]] = true
            addWalls(stackWalls, newRoom, nbLines, nbColumns)
            stackOpenCells.push([currentWall, [2 * newRoom[0] + 1, 2 * newRoom[1] + 1]])
        }
        stackWalls.splice(index, 1)
    }

    return stackOpenCells
}

/****************************************************************************************

****************************************************************************************/

const addWalls = (stackWalls, room, nbLines, nbColumns) => {
    let n = room[0]
    let m = room[1]
    let array = []

    if (n > 0) array.push([2 * n, 2 * m + 1]) // Mur nord
    if (m < nbColumns - 1) array.push([2 * n + 1, 2 * m + 2]) // Mur est
    if (n < nbLines - 1) array.push([2 * n + 2, 2 * m + 1]) // Mur sud
    if (m > 0) array.push([2 * n + 1, 2 * m]) // Mur ouest
    
    array.map(arr => stackWalls.push(arr))
}

/****************************************************************************************

****************************************************************************************/

const setNewRoom = (wall, maze) => {
    let room0 = [], room1 = [], res = null

    if (wall[0] % 2 == 0) {
        room0 = [(wall[0] - 2) / 2, (wall[1] - 1) / 2]
        room1 = [(wall[0]) / 2, (wall[1] - 1) / 2]
    } else {
        room0 = [(wall[0] - 1) / 2, (wall[1] - 2) / 2]
        room1 = [(wall[0] - 1) / 2, (wall[1]) / 2]
    }

    if (maze[room0[0]][room0[1]] && maze[room1[0]][room1[1]]) return null

    return (maze[room0[0]][room0[1]] ? room1 : room0)
}

export { algoPrim }