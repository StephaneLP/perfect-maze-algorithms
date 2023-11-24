let gblTimeOuts = new Array()
let gblMazes = new Map()

/****************************************************************************************
DISPLAY MAZE (procédure)
- Ajout du labyrinthe (pile stackOpenCells) dans une variable globale (type Map)
- 1ère partie : Construction de la structure html du labyrinthe (ligne par ligne)
- 2ème partie : Affichage du labyrinthe
    - Affichage des cellules 'ouvertes' par groupes, en 2 temps à l'aide de 2 couleurs
      (voir fichier README.md pour une explication détaillée)
****************************************************************************************/

const displayMaze = (stackOpenCells, params, speed) => {
    const nbLines = 2 * params.nbLines + 1
    const nbColumns = 2 * params.nbColumns + 1

    gblMazes.set(params.idStructure, stackOpenCells)

    // Affichage de la structure du labyrinthe
    let section = document.getElementById("maze" + params.idStructure)
    let line = "", idElement = ""

    for (let n = 0; n < nbLines; n++) {
        line = document.createElement("div")

        for (let m = 0; m < nbColumns; m++) {
            idElement = params.idStructure + "-" + n + "-" + m
            if ((n % 2 == 1) && (m % 2 == 1)) line.appendChild(addMazeCell(idElement, params.maxCellLength, params.maxCellLength, "maze-room")) // Pièce
            if ((n % 2 == 0) && (m % 2 == 0)) line.appendChild(addMazeCell(idElement, params.minCellLength, params.minCellLength, "maze-wall")) // Intersection
            if ((n % 2 == 1) && (m % 2 == 0)) line.appendChild(addMazeCell(idElement, params.minCellLength, params.maxCellLength, "maze-wall")) // Mur vertical
            if ((n % 2 == 0) && (m % 2 == 1)) line.appendChild(addMazeCell(idElement, params.maxCellLength, params.minCellLength, "maze-wall")) // Mur horizontal
        }

        section.appendChild(line)
    }

    // Affichage du labyrinthe
    let interval = 0, intervalTemp = 0

    stackOpenCells.map(array => {
        intervalTemp = interval
        array.map(cell => {
            gblTimeOuts.push(setTimeout(displayCells, intervalTemp,  params.idStructure, [cell], "maze-open-temp"))
            intervalTemp += speed
        })

        interval += array.length * speed
        gblTimeOuts.push(setTimeout(displayCells, interval, params.idStructure, array, "maze-open"))
    })
    gblTimeOuts.push(setTimeout(endDisplayMaze, interval, params.idStructure))
}

/****************************************************************************************
ADD MAZE CELL (fonction)
- Création des élément de la structure utilisés
  pour représenter les pièces, murs et intersections des lignes
****************************************************************************************/

const addMazeCell = (idElement, width, height, className) => {
    let cell = document.createElement("div")

    cell.id = idElement
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

const displayCells = (idStructure, arrCells, className) => {
    let idElement = ""

    arrCells.forEach(cell => {
        if(cell.length > 0) {
            idElement = idStructure + "-" + cell[0] + "-" + cell[1]
            document.getElementById(idElement).className = className
        }
    })
}

/****************************************************************************************
END DISPLAY MAZE (procédure)
- Suppression du labyrinthe de la variable globale gblMazes
- Si tous les labyrinthes sont affichés : Masquage du bouton permettant de stoper l'animation
****************************************************************************************/

const endDisplayMaze = (id) => {
    gblMazes.delete(id)
    if (gblMazes.size === 0) document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************
STOP MAZE ANIMATION (procédure)
Fonction appelée en cliquant sur le bouton 'Terminer'
- Arrêt de l'animation
- Affichage complet des labyrinthes
- Masquage du bouton permettant de stoper l'animation
****************************************************************************************/

const stopMazeAnimation = () => {
    gblTimeOuts.map(element => clearTimeout(element))
    gblMazes.forEach((stack, id) => stack.forEach(array => displayCells(id, array, "maze-open")))
    gblMazes.clear()
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

export { displayMaze, stopMazeAnimation }