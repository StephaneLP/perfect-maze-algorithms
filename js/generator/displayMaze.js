import { activateBtnSolution } from "../utils/specificTools.js"

let gblTimeOuts = []
let gblStackCells = []

/**
 * Affichage du labyrinthe
 * (description détaillée : README_GENERATOR.md)
 * @param {array} stackOpenCells 
 * @param {object} structure 
 * @param {integer} speed 
 */
const displayMaze = (stackOpenCells, structure, speed) => {
    let nbGridLines = 2 * structure.nbLines + 1
    let nbGridColumns = 2 * structure.nbColumns + 1

    gblTimeOuts = []
    gblStackCells = [...stackOpenCells]

    // Affichage de la structure du labyrinthe
    let section = document.querySelector("#maze")
    let line = "", idElement = ""

    section.replaceChildren()
    for (let numLine = 0; numLine < nbGridLines; numLine++) {
        line = document.createElement("div")

        line.appendChild(addBorderCell("left-wall-" + numLine, "maze-border"))
        for (let numColumn = 0; numColumn < nbGridColumns; numColumn++) {
            idElement = numLine + "-" + numColumn
            if ((numLine % 2 == 1) && (numColumn % 2 == 1)) line.appendChild(addMazeCell(idElement, structure.maxCellLength, structure.maxCellLength, "maze-room")) // Pièce
            if ((numLine % 2 == 0) && (numColumn % 2 == 0)) line.appendChild(addMazeCell(idElement, structure.minCellLength, structure.minCellLength, "maze-wall")) // Intersection
            if ((numLine % 2 == 1) && (numColumn % 2 == 0)) line.appendChild(addMazeCell(idElement, structure.minCellLength, structure.maxCellLength, "maze-wall")) // Mur vertical
            if ((numLine % 2 == 0) && (numColumn % 2 == 1)) line.appendChild(addMazeCell(idElement, structure.maxCellLength, structure.minCellLength, "maze-wall")) // Mur horizontal
        }
        line.appendChild(addBorderCell("right-wall-" + numLine, "maze-border"))
        section.appendChild(line)
    }

    // Affichage du labyrinthe
    if (speed > 0) {
        document.querySelector("#stop-maze-animation").style.visibility = "visible"
        
        let interval = 0, intervalTemp = 0

        stackOpenCells.map(array => {
            intervalTemp = interval
            array.map(cell => {
                gblTimeOuts.push(setTimeout(displayCells, intervalTemp, [cell], "maze-open-temp"))
                intervalTemp += speed        
            })

            interval += array.length * speed
            gblTimeOuts.push(setTimeout(displayCells, interval, array, "maze-open"))
        })
        gblTimeOuts.push(setTimeout(endDisplayMaze, interval, stackOpenCells.slice(-1)))
    } else {
        stackOpenCells.map(array => displayCells(array, "maze-open"))
        endDisplayMaze(stackOpenCells.slice(-1))
    }
}

/**
 * Création des éléments HTML constituant les bordures gauches et droites du labyrinthe
 * @param {string} id 
 * @param {string} className 
 * @returns {object} Élément HTML
 */
const addBorderCell = (id, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.className = className

    return cell
}

/**
 * Création des éléments HTML constituant les pièces, murs et intersections
 * @param {string} id 
 * @param {integer} width 
 * @param {integer} height 
 * @param {string} className 
 * @returns {object} Élément HTML
 */
const addMazeCell = (id, width, height, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.style.width = width + "px"
    cell.style.height = height + "px"
    cell.className = className

    return cell
}

/**
 * Ouverture des cellules (pièces et murs) constituant les chemins du labyrinthe
 * (la classe correspond à la phase d'affichage : initiale ou finale) 
 * @param {array} arrCells 
 * @param {string} className 
 */
const displayCells = (arrCells, className) => {
    let idElement = ""

    arrCells.forEach(cell => {
        if(cell.length > 0) {
            idElement = cell[0] + "-" + cell[1]
            document.getElementById(idElement).className = className
        }
    })
}

/**
 * Affichage des flèches indiquant l'entrée et la sortie (bordures gauche et droite)
 * Actualisation de la zone de filtre
 * @param {array} arrAccess 
 */
const endDisplayMaze = (arrAccess) => {
    let id = ""

    id = "left-wall-" + arrAccess[0][0][0]
    document.getElementById(id).classList.add("maze-access") 
    id = "right-wall-" + arrAccess[0][1][0]
    document.getElementById(id).classList.add("maze-access") 

    activateBtnSolution(true)
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/**
 * Arrêt de l'animation et affichage complet du labyrinthe
 */
const stopMazeAnimation = () => {
    gblTimeOuts.map(timeOut => clearTimeout(timeOut))
    gblStackCells.map(stackCells => displayCells(stackCells, "maze-open"))
    endDisplayMaze(gblStackCells.slice(-1))
}

export { displayMaze, stopMazeAnimation }