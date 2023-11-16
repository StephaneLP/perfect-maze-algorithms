import { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim } from "../utils/generalTools.js"

/****************************************************************************************
ALGO PROFONDEUR (fonction)
- Choix aléatoire d'une pièce de départ
- Initialisation des piles stackOpenCells et stackRooms
  et mise à jour du tableau maze (voir procédure updateStacks)
- Tant que la pile stackRooms contient des pièces :
    - Sélection de la dernière pièce de la pile
    - Si une pièce attenante non visitée a été trouvée (sélection aléatoire) :
        - Mise à jour des piles stackOpenCells et stackRooms
          et mise à jour du tableau maze (voir procédure updateStacks)
    - Sinon : la dernière pièce est retirée de la pile stackRooms
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
****************************************************************************************/

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

/****************************************************************************************
UPDATE STACKS (procédure)
- Marque la pièce newRoom comme visitée (dans le tableau maze)
- Ajoute la pièce newRoom à la dernière place de la pile des pièces (stackRooms)
- Met à jour la pile des pièces à 'ouvrir' stackOpenCells pour l'affichage du labyrinthe
  (remarque : aucune dernière pièce n'est associé à la pièce de départ lors de la 1ère mise à jour)
****************************************************************************************/

const updateStacks = (lastRoom, newRoom, stackRooms, stackOpenCells, maze) => {
    maze[newRoom[0]][newRoom[1]] = true
    stackRooms.push(newRoom)
    if (lastRoom) {
        stackOpenCells.push(addOpenCells(lastRoom, newRoom))
    } else {
        stackOpenCells.push([[2 * newRoom[0] + 1, 2 * newRoom[1] + 1]])
    }
}

/****************************************************************************************
SET ADJACENT ROOM (fonction)
- Retourne aléatoirement un tableau contenant les coordonnées d'une pièce attenante
  non visitée
- Retourne null si toutes les pièces attenantes ont déjà été visitées
****************************************************************************************/

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

/****************************************************************************************
ADD OPEN CELLS (fonction)
Construit un tableau contenant les 2 cellules (mur et pièce) à ouvrir pour visiter
une nouvelle pièce
****************************************************************************************/

const addOpenCells = (lastRoom, newRoom) => {
    let cellsToAdd = []

    cellsToAdd.push([lastRoom[0] + newRoom[0] + 1, lastRoom[1] + newRoom[1] + 1])
    cellsToAdd.push([2 * newRoom[0] + 1, 2 * newRoom[1] + 1])

    return cellsToAdd
}

export { algoProfondeur }