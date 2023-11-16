import { getRandomIntInclusive } from "../utils/generalTools.js"

/****************************************************************************************
ALGO SIDEWINDER (fonction)
- Parcourt le labyrinthe ligne par ligne (du haut vers le bas, et de la gauche vers la droite)
- Pour chaque pièce visitée :
    - Si le mur droit est ouvert (test aléatoire à chaque boucle) :
        - Ajout des cellules (pièces et murs droits) à une pile temporaire
    - Si le mur droit est fermé :
        - Ajoute la pile temporaire à la pile stackOpenCells (appel de la fonction addOpenCells)
        - Vide la pile temporaire
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
****************************************************************************************/

const algoSidewinder = (nbLines, nbColumns) => {
    let stackOpenCells = [], currentRoom = [], stackRooms = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            currentRoom = [n, m]
            stackRooms.push(currentRoom)
            if (((n !== 0) && rightWallClose()) || (m == nbColumns - 1)) {
                stackOpenCells.push(addOpenCells(stackRooms))
                stackRooms = []
            }
        }
    }

    return stackOpenCells
}

/****************************************************************************************
RIGHT WALL CLOSE (fonction)
- Retourne aléatoirement un booléen (true : mur droit fermé / false : mur droit ouvert)
****************************************************************************************/

const rightWallClose = () => {
    return (getRandomIntInclusive(0,1) == 0)
}

/****************************************************************************************
ADD OPEN CELLS (fonction)
Construit un tableau contenant les cellules (pièces et murs) correspondantes aux pièces
de la pile stackRooms :
- Ajoute les cellules 'pièce' et les cellules 'murs droits' (sauf pour la dernière pièce)
- Ajoute aléatoirement un passage vers le haut à partir de l'une des pièces de la pile
  (sauf pour la première ligne)
- Retourne l'ensemble des cellules 'ouvertes' de la rangée en cours (pile stackRooms)
****************************************************************************************/

const addOpenCells = (stackRooms) => {
    let cells = [], crossingRoom = []

    stackRooms.map((room, index) => {
        cells.push([2 * room[0] + 1, 2 * room[1] + 1])
        if(index < stackRooms.length - 1) cells.push([2 * room[0] + 1, 2 * room[1] + 2]) 
    })

    crossingRoom = stackRooms[getRandomIntInclusive(0, stackRooms.length - 1)]
    if(crossingRoom[0] !== 0) cells.push([2 * crossingRoom[0], 2 * crossingRoom[1] + 1])

    return cells
}

export { algoSidewinder }