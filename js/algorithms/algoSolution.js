import { getRandomIntInclusive, equalArrays, createArray2Dim } from "../utils/generalTools.js"
import { convertCellToRoom, convertRoomToCell } from "../utils/specificTools.js"

/****************************************************************************************
ALGO SOLUTION (fonction)
Cet algorithme repose sur l'algorithme de parcourt en profondeur d'un arbre.
-----------------------------------------------------------------------------------------
Principe : l'objectif est de retourner une pile qui contient les cellules parcourues
(une pastille sera affichée aussi bien à l'emplacement des pièces que des des murs indiquant
le chemin). L'algorithme utilise 2 piles : 
    - La pile 'stackSearch', qui contient les coordonnées des cellules visitées (ajoutées, 
      puis retirées si elles appartiennent à un cul de sac)
    - La pile 'stackCells', qui contient la liste de TOUTES les cellules parcourues, avec :
        - Les coordonnées de la cellule
        - Un booléen indiquant s'il faut afficher/masquer la cellule
        - un booléen indiquant si la cellule est élément du chemin final
-----------------------------------------------------------------------------------------
- Calcul des coordonnées de l'entrée et de la sortie : murs (cells) et pièces (rooms)
- Initialisation du tableau mazeSearch (servant à identifier les pièces parcourues)
- Entrée du labyrinthe :
    - Mise à jour des piles avec le mur d'Entrée
    - Mise à jour des piles avec la pièce d'Entrée
    - La pièce 'Entrée' devient la pièce courante
- Tant que la pièce courante est différente de la Sortie :
    - Recherche d'une pièce adjacente à la pièce courante, non visitée et accessible
    - Si cette pièce existe :
        - Mise à jour des piles avec le mur séparant les pièces
        - Mise à jour des piles avec la pièce adjacente
        - La pièce adjacente devient la pièce courante
    - Sinon :
        - Mise à jour des piles : les 2 dernières cellules sont supprimées de la pile
          stackSearch et retirées de l'affichage dans la pile stackCells
        - La dernière pièce dela pile stackSearch devient la pièce courante
- Ajout du mur 'Sortie' à la pile stackCells
- Retourne la pile stackCells qui permet d'afficher la solution du labyrinthe
****************************************************************************************/

const algoSolution = (gridMaze, accessCells) => {
    const entryCell = [...accessCells[0]]
    const exitCell = [...accessCells[1]]
    const entryRoom = [(entryCell[0] - 1) / 2, (entryCell[1]) / 2]
    const exitRoom = [(exitCell[0]- 1 ) / 2, (exitCell[1] - 2 ) / 2]

    let mazeSearch = createArray2Dim((gridMaze.length - 1) / 2, (gridMaze[0].length - 1) / 2, false)
    let stackSearch = [], stackCells = []
    let currentRoom = [], adjacentRoom = []

    updateStacksForward(stackSearch, stackCells, entryCell)
    updateStacksForward(stackSearch, stackCells, convertRoomToCell(entryRoom))

    currentRoom = [...entryRoom]
    mazeSearch[currentRoom[0]][currentRoom[1]] = true

    while (!equalArrays(currentRoom, exitRoom)) {
        adjacentRoom = setAdjacentRoom(currentRoom, mazeSearch, gridMaze)
        if (adjacentRoom) {
            updateStacksForward(stackSearch, stackCells, [currentRoom[0] + adjacentRoom[0] + 1, currentRoom[1] + adjacentRoom[1] + 1])
            updateStacksForward(stackSearch, stackCells, [2 * adjacentRoom[0] + 1, 2 * adjacentRoom[1] + 1])
 
            currentRoom = [...adjacentRoom]
            mazeSearch[currentRoom[0]][currentRoom[1]] = true
        } else {
            updateStacksBackward(stackSearch, stackCells)
            updateStacksBackward(stackSearch, stackCells)

            currentRoom = convertCellToRoom(stackSearch[stackSearch.length - 1])
        }
    }
    stackCells.push({cell: exitCell, display: true, solution: true})

    return stackCells
}

/****************************************************************************************
UPDATE STACKS FORWARD (procédure)
- Ajout de la cellule cell dans la pile stackSearch
- Ajout de la cellule cell en tant que solution dans la pile stackCells
****************************************************************************************/

const updateStacksForward = (stackSearch, stackCells, cell) => {
    stackSearch.push(cell)
    stackCells.push({cell: cell, display: true, solution: true})
}

/****************************************************************************************
UPDATE STACKS BACKWARD (procédure)
- Suppression de la dernière cellule de la pile stackSearch
- Mise à jour de la pile stackCells :
    - La cellule est retirée de l'affichage et du chemin solution
    - La précédente occurence de la cellule est retirée du chemin solution
****************************************************************************************/

const updateStacksBackward = (stackSearch, stackCells) => {
    let cell = stackSearch.pop()

    stackCells.push({cell: cell, display: false, solution: false})
    stackCells.filter(obj => (obj.cell[0] === cell[0]) && (obj.cell[1] === cell[1]) && (obj.solution === true)).map(arr => arr.solution = false)
}

/****************************************************************************************
SET ADJACENT ROOM (fonction)
- Calcul les variables booléennes indiquant si les pièces adjacentes à la pièces courante
  existent, sont accessibles (mur intermédiaire ouvert) et sont non visitées
- Retourne aléatoirement l'une des pièces adjacentes trouvées (null si aucune pièce trouvée)
****************************************************************************************/

const setAdjacentRoom = (room, mazeSearch, gridMaze) => {
    const n = room[0], m = room[1]
    let array = []

    const isNorthAccessible = ((n > 0) && (gridMaze[2 * n][2 * m + 1 ]) && (!mazeSearch[n - 1][m]))
    const isSouthAccessible = ((n < mazeSearch.length - 1) && (gridMaze[2 * n + 2][2 * m + 1]) && (!mazeSearch[n + 1][m]))
    const isWestAccessible = ((m > 0) && (gridMaze[2 * n + 1][2 * m]) && (!mazeSearch[n][m - 1]))
    const isEstAccessible = ((m < mazeSearch[0].length - 1) && (gridMaze[2 * n + 1][2 * m + 2]) && (!mazeSearch[n][m + 1]))

    if (isNorthAccessible) array.push([n - 1, m]) // Pièce nord
    if (isSouthAccessible) array.push([n + 1, m]) // Pièce sud
    if (isWestAccessible) array.push([n, m - 1]) // Pièce ouest
    if (isEstAccessible) array.push([n, m + 1]) // Pièce est

    if(array.length === 0) return null

    const indice = getRandomIntInclusive(0, array.length - 1)
    return array[indice]
}

export { algoSolution }