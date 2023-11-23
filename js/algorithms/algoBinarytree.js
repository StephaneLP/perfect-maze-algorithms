import { getRandomIntInclusive } from "../utils/generalTools.js"

/****************************************************************************************
ALGO BINARY TREE (fonction)
- Parcourt le labyrinthe ligne par ligne (du haut vers le bas, et de la gauche vers la droite)
- Pour chaque pièce visitée :
    - Ouverture aléatoire du mur droit ou du mur haut
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
****************************************************************************************/

const algoBinarytree = (nbLines, nbColumns) => {
    let stackOpenCells = []

    for (let n = 0; n < nbLines; n++) {
        for (let m = 0; m < nbColumns; m++) {
            stackOpenCells.push(addOpenCells(n, m, nbColumns))
            stackOpenCells.push(addOpenCells(n, m, nbColumns))
        }
    }

    return stackOpenCells
}

/****************************************************************************************
ADD OPEN CELLS (fonction)
Construit un tableau contenant les cellules 'ouvertes' :
    - Ajout de la cellule correspondant à la pièce visitée
    - Ajout du mur adjacent à la pièce :
        - Si première ligne : mur droit
        - Si dernière colonne : mur haut
        - Si dernière pièce de la première ligne : aucun ajout
        - Sinon : mur droit ou mur haut (aléatoirement)
****************************************************************************************/

const addOpenCells = (n, m, nbColumns) => {
    let cellRooms = [], isRightWallOpen = null

    if ((n > 0) && (m < nbColumns - 1)) isRightWallOpen = (getRandomIntInclusive(0,1) == 0)
    if ((n == 0) && (m < nbColumns - 1)) isRightWallOpen = true
    if ((n > 0) && (m == nbColumns - 1)) isRightWallOpen = false

    cellRooms.push([2 * n + 1, 2 * m + 1])
    if (isRightWallOpen !== null) cellRooms.push(isRightWallOpen ? [2 * n + 1, 2 * m + 2] : [2 * n, 2 * m + 1])

    return cellRooms
}

export { algoBinarytree }