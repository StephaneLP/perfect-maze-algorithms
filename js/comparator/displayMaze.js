let gblTimeOuts = new Array()
let gblMazes = new Map()

/**
 * Affichage du labyrinthe
 * (description détaillée : README_COMPARATOR.md)
 * @param {array} stackOpenCells Tableau de dimension 3
 * @param {object} structure 
 * @param {integer} speed 
 */

const displayMaze = (stackOpenCells, structure, speed) => {
    const nbLines = 2 * structure.nbLines + 1
    const nbColumns = 2 * structure.nbColumns + 1

    gblMazes.set(structure.idMaze, stackOpenCells)

    // Affichage de la structure du labyrinthe
    let section = document.getElementById("maze" + structure.idMaze)
    let line = "", idElement = ""

    for (let n = 0; n < nbLines; n++) {
        line = document.createElement("div")

        for (let m = 0; m < nbColumns; m++) {
            idElement = structure.idMaze + "-" + n + "-" + m
            if ((n % 2 == 1) && (m % 2 == 1)) line.appendChild(addMazeCell(idElement, structure.maxCellLength, structure.maxCellLength, "maze-room")) // Pièce
            if ((n % 2 == 0) && (m % 2 == 0)) line.appendChild(addMazeCell(idElement, structure.minCellLength, structure.minCellLength, "maze-wall")) // Intersection
            if ((n % 2 == 1) && (m % 2 == 0)) line.appendChild(addMazeCell(idElement, structure.minCellLength, structure.maxCellLength, "maze-wall")) // Mur vertical
            if ((n % 2 == 0) && (m % 2 == 1)) line.appendChild(addMazeCell(idElement, structure.maxCellLength, structure.minCellLength, "maze-wall")) // Mur horizontal
        }

        section.appendChild(line)
    }

    // Affichage du labyrinthe
    let interval = 0, intervalTemp = 0

    stackOpenCells.map(array => {
        intervalTemp = interval
        array.map(cell => {
            gblTimeOuts.push(setTimeout(displayCells, intervalTemp,  structure.idMaze, [cell], "maze-open-temp"))
            intervalTemp += speed
        })

        interval += array.length * speed
        gblTimeOuts.push(setTimeout(displayCells, interval, structure.idMaze, array, "maze-open"))
    })
    gblTimeOuts.push(setTimeout(endDisplayMaze, interval, structure.idMaze))
}

/****************************************************************************************/

/**
 * Création des éléments HTML constituant les pièces, murs et intersections
 * @param {string} idElement 
 * @param {integer} width 
 * @param {integer} height 
 * @param {string} className 
 * @returns  {object} Élément HTML
 */

const addMazeCell = (idElement, width, height, className) => {
    let cell = document.createElement("div")

    cell.id = idElement
    cell.style.width = width + "px"
    cell.style.height = height + "px"
    cell.className = className

    return cell
}

/****************************************************************************************/

/**
 * Ouverture des cellules (pièces et murs) constituant les chemins du labyrinthe
 * (la classe correspond à la phase d'affichage : initiale ou finale) 
 * @param {string} idMaze 
 * @param {array} arrCells Tableau de dimension 2
 * @param {*} className 
 */

const displayCells = (idMaze, arrCells, className) => {
    let idElement = ""

    arrCells.forEach(cell => {
        if(cell.length > 0) {
            idElement = idMaze + "-" + cell[0] + "-" + cell[1]
            document.getElementById(idElement).className = className
        }
    })
}

/****************************************************************************************/

/**
 * Suppression du labyrinthe de la variable globale gblMazes
 * Si tous les labyrinthes sont affichés : Masquage du bouton permettant de stoper l'animation
 * @param {*} id 
 */

const endDisplayMaze = (id) => {
    gblMazes.delete(id)
    if (gblMazes.size === 0) document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************/

/**
 * Arrêt des animations et affichage complet des labyrinthes
 * Masquage du bouton permettant de stoper l'animation
 */

const stopMazeAnimation = () => {
    gblTimeOuts.map(element => clearTimeout(element))
    gblMazes.forEach((stack, id) => stack.forEach(array => displayCells(id, array, "maze-open")))
    gblMazes.clear()
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

export { displayMaze, stopMazeAnimation }