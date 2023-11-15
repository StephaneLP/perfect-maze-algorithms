import { shuffleArray2Dim, createArray2Dim } from "../utils/generalTools.js"

/****************************************************************************************
ALGO FUSION (fonction)
- Initialisation du tableau maze (qui contient les n° branche et l'indication de visite)
- Initialisation (et mélange aléatoire) de la pile stackWalls (qui contient tous les murs)
- Tant que la pile stackWalls contient des murs :
    - Sélection du dernier mur de la pile
    - Calcul des coordonnées des pièces attenantes et lecture de leur n° de branche
    - Si les n° de branche sont différentes :
        - Fusion des n° de branche
        - Mise à jour de la pile stackOpenCells
    - Le mur est retiré de la pile stackWalls
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
****************************************************************************************/

const algoFusion = (nbLines, nbColumns) => {
    let maze = initMaze(nbLines, nbColumns)
    let stackWalls = initStackWalls(nbLines, nbColumns)

    stackWalls = shuffleArray2Dim(stackWalls)

    let stackOpenCells = [], currentWall = [], room0 = [], room1 = []
    let numBranch0 = 0, numBranch1 = 0

    while (stackWalls.length > 0) {
        currentWall = stackWalls[stackWalls.length - 1]
        room0 = [Math.floor(currentWall[0] / nbColumns), currentWall[0] % nbColumns]
        room1 = [Math.floor(currentWall[1] / nbColumns), currentWall[1] % nbColumns]
        numBranch0 = maze[room0[0]][room0[1]].numBranch
        numBranch1 = maze[room1[0]][room1[1]].numBranch

        if (numBranch0 !== numBranch1) {
            maze.forEach(array => {
                array.filter(room => room.numBranch === numBranch1).forEach(room => room.numBranch = numBranch0)
            })
            stackOpenCells.push(addOpenCells(maze, room0, room1))
        }
        stackWalls.pop()
    }

    return stackOpenCells
}

/****************************************************************************************
INIT MAZE (fonction)
- Initialise le tableau représentant le labyrinthe
- Chaque élément du tableau contient un objet ayant 2 propriétés :
    - Un numéro unique de branche
    - Un indicateur booléen de visite initialisé à false
****************************************************************************************/

const initMaze = (nbLines, nbColumns) => {
    let array = createArray2Dim(nbLines, nbColumns)

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            array[n][m] = {numBranch: m + n * nbColumns, visited: false}
        }
    }
    return array
}

/****************************************************************************************
INIT STACK WALLS (fonction)
- Initialisation de la pile contenant tous les murs du labyrinthe
- Attention, chaque élément de la pile contient :
    - Non pas les coordonnées du mur
    - Mais les coordonnées des 2 pièces attenantes, identifiées par un coefficient
      (et non par un couple d'abscisses et d'ordonnées)
****************************************************************************************/

const initStackWalls = (nbLines, nbColumns) => {
    let array = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            if (m < nbColumns - 1) array.push([m + n * nbColumns, m + 1 + n * nbColumns])
            if (n < nbLines - 1) array.push([m + n * nbColumns, m + (n + 1) * nbColumns])
        }
    }
    return array
}
  
/****************************************************************************************
ADD OPEN CELLS (fonction)
Construit un tableau contenant les cellules (pièces et murs) correspondantes aux pièces
de la pile stackRooms :
****************************************************************************************/

const addOpenCells = (maze, room0, room1) => {
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
    return cells
}

export { algoFusion }