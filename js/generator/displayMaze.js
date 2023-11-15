import { activateBtn } from "../utils/specificTools.js"

let gblTimeOuts = []
let gblStackCells = []

/****************************************************************************************
DISPLAY MAZE (procédure)
- 1ère partie : Affichage de la structure du labyrinthe
    - Initialisation des variables globales utilisées pour l'arrêt de l'animation
    - Construction de la structure html du labyrinthe (ligne par ligne)
- 2ème partie : Affichage du labyrinthe
    - Affichage du bouton permettant de stoper l'animation
    - Affichage des cellules 'ouvertes' par groupes, en 2 temps à l'aide de 2 couleurs
      (voir fichier README.md pour une explication détaillée)
    - Si animation, utilisation de la fonction setTimeout
    - Affichage des flèches indiquant l'entrée et la sortie
****************************************************************************************/

const displayMaze = (stackOpenCells, structure, speed) => {
    let nbGridLines = 2 * structure.nbLines + 1
    let nbGridColumns = 2 * structure.nbColumns + 1

    // Affichage de la structure du labyrinthe
    let section = document.querySelector("#maze")

    section.replaceChildren()
    gblTimeOuts = []
    gblStackCells = stackOpenCells

    for (let numLine = 0; numLine < nbGridLines; numLine++) {
        let line = document.createElement("div")

        line.appendChild(addBorderCell("left-wall-" + numLine, "maze-border"))
        for (let numColumn = 0; numColumn < nbGridColumns; numColumn++) {
            const id = numLine + "-" + numColumn
            if ((numLine % 2 == 1) && (numColumn % 2 == 1)) line.appendChild(addMazeCell(id, structure.maxCellLength, structure.maxCellLength, "maze-room")) // Pièce
            if ((numLine % 2 == 0) && (numColumn % 2 == 0)) line.appendChild(addMazeCell(id, structure.minCellLength, structure.minCellLength, "maze-wall")) // Intersection
            if ((numLine % 2 == 1) && (numColumn % 2 == 0)) line.appendChild(addMazeCell(id, structure.minCellLength, structure.maxCellLength, "maze-wall")) // Mur vertical
            if ((numLine % 2 == 0) && (numColumn % 2 == 1)) line.appendChild(addMazeCell(id, structure.maxCellLength, structure.minCellLength, "maze-wall")) // Mur horizontal
        }
        line.appendChild(addBorderCell("right-wall-" + numLine, "maze-border"))
        section.appendChild(line)
    }

    // Affichage du labyrinthe
    if (speed > 0) {
        let interval = 0, intervalTemp = 0

        document.querySelector("#stop-maze-animation").style.visibility = "visible"
        stackOpenCells.map(array => {
            intervalTemp = interval
            array.map(cell => {
                gblTimeOuts.push(setTimeout(displayCells, intervalTemp, [cell], "maze-open-temp"))
                intervalTemp += speed        
            })

            interval += array.length * speed
            gblTimeOuts.push(setTimeout(displayCells, interval, array, "labyrinth-open"))
        })
        gblTimeOuts.push(setTimeout(endDisplayMaze, interval, stackOpenCells.slice(-1)))
    } else {
        stackOpenCells.map(array => displayCells(array, "labyrinth-open"))
        endDisplayMaze(stackOpenCells.slice(-1))
    }
}

/****************************************************************************************
ADD BORDER CELL (fonction)
- Création des élément de la structure utilisés 
  pour représenter les bordures gauches et droites des lignes
****************************************************************************************/

const addBorderCell = (id, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.className = className

    return cell
}

/****************************************************************************************
ADD MAZE CELL (fonction)
- Création des élément de la structure utilisés
  pour représenter les pièces, murs et intersections des lignes
****************************************************************************************/

const addMazeCell = (id, width, height, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.style.width = width + "px"
    cell.style.height = height + "px"
    cell.className = className

    return cell
}

/****************************************************************************************
DISPLAY CELLS (procédure)
- Ouverture des cellules (pièces et murs) constituant les chemins du labyrinthe
- La classe correspond à la phase d'affichage (initiale ou finale) 
****************************************************************************************/

const displayCells = (arrCells, className) => {
    let id = ""

    arrCells.map(cell => {
        if(cell.length > 0) {
            id = cell[0] + "-" + cell[1]
            document.getElementById(id).className = className
        }
    })
}

/****************************************************************************************
END DISPLAY MAZE (procédure)
- Affichage des flèches indiquant l'entrée et la sortie (bordures gauche et droite)
- Réactivation des boutons 'générer'
- Masquage du bouton permettant de stoper l'animation
****************************************************************************************/

const endDisplayMaze = (arrAccess) => {
    let id

    id = "left-wall-" + arrAccess[0][0][0]
    document.getElementById(id).classList.add("maze-access") 
    id = "right-wall-" + arrAccess[0][1][0]
    document.getElementById(id).classList.add("maze-access") 

    activateBtn("#btn-generate", true)
    activateBtn("#btn-solution", true)
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************
STOP MAZE ANIMATION (procédure)
Fonction appelée en cliquant sur le bouton 'Terminer'
- Arrêt de l'animation
- Affichage complet du labyrinthe (sans les bordures)
- Appel de la procédure terminant l'affichage du labyrinthe
****************************************************************************************/

const stopMazeAnimation = () => {
    gblTimeOuts.map(timeOut => clearTimeout(timeOut))
    gblStackCells.map(stackCells => displayCells(stackCells, "maze-open"))
    endDisplayMaze(gblStackCells.slice(-1))
}

export { displayMaze, stopMazeAnimation }