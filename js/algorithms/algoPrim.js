import { getRandomIntInclusive, createArray2Dim } from "../utils/generalTools.js"

/****************************************************************************************
ALGO PRIM (fonction)
- Choix aléatoire d'une pièce de départ
- Initialisation des piles stackOpenCells et stackWalls
  et mise à jour du tableau maze (voir procédure updateStacks)
- Tant que la pile stackWalls contient des murs :
    - Choix aléatoire d'un mur
    - Si une des deux pièce attenantes n'a pas encore été visitée :
        - Mise à jour des piles stackOpenCells et stackWalls
          et mise à jour du tableau maze (voir procédure updateStacks)
    - Le mur est retiré de la pile stackWalls
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
****************************************************************************************/

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

/****************************************************************************************
UPDATE STACKS (procédure)
- Marque la pièce currentRoom comme visitée (dans le tableau maze)
- Ajoute à la pile des murs (stackWalls) les murs attenants à la pièce currentRoom
- Met à jour la pile des pièces à 'ouvrir' stackOpenCells pour l'affichage du labyrinthe
  (remarque : aucun mur n'est associé à la pièce de départ lors de la 1ère mise à jour)
****************************************************************************************/

const updateStacks = (currentRoom, currentWall, stackWalls, stackOpenCells, maze, nbLines, nbColumns) => {
    maze[currentRoom[0]][currentRoom[1]] = true
    adjacentWalls(currentRoom, nbLines, nbColumns).map(wall => stackWalls.push(wall))
    stackOpenCells.push(currentWall ? [currentWall, [2 * currentRoom[0] + 1, 2 * currentRoom[1] + 1]] : [[2 * currentRoom[0] + 1, 2 * currentRoom[1] + 1]])
}

/****************************************************************************************
ADJACENT WALLS (fonction)
- Retourne les murs 'existants' qui entourent une pièce
****************************************************************************************/

const adjacentWalls = (room, nbLines, nbColumns) => {
    let line = room[0], column = room[1]
    let array = []

    if (line > 0) array.push([2 * line, 2 * column + 1]) // Mur nord
    if (column < nbColumns - 1) array.push([2 * line + 1, 2 * column + 2]) // Mur est
    if (line < nbLines - 1) array.push([2 * line + 2, 2 * column + 1]) // Mur sud
    if (column > 0) array.push([2 * line + 1, 2 * column]) // Mur ouest
    
    return array
}

/****************************************************************************************
SET CURRENT ROOM (fonction)
- Détermine les coordonnées des deux pièces attenantes à un mur
  (2 cas : le mur est horizontal ou vertical)
- Retourne les coordonnées d'une éventuelle pièce non visitée (null sinon)
****************************************************************************************/

const setCurrentRoom = (wall, maze) => {
    let room0 = [], room1 = []

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