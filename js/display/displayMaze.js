import { activateBtn } from "../utils/tools.js"

let gblTimeOuts = []
let stackCells = []

const displayMaze = (stackOpenCells, nbGridLines, nbGridColumns, minLength, maxLength, speed) => {
    let nbLines = 2 * nbGridLines + 1
    let nbColumns = 2 * nbGridColumns + 1

    // Affichage de la structure du labyrinthe
    let line, id
    let section = document.querySelector("#labyrinthe")

    section.replaceChildren()
    gblTimeOuts = []
    stackCells = stackOpenCells

    for(let n = 0; n < nbLines; n++) {
        line = document.createElement("div")

        addBorderCell(line, "left-wall-" + n, "labyrinthe-border")
        for(let m = 0; m < nbColumns; m++) {
            id = n + "-" + m
            if((n % 2 == 1) && (m % 2 == 1)) addMazeCell(line, id, maxLength, maxLength, "labyrinthe-room") // Pièce
            if((n % 2 == 0) && (m % 2 == 0)) addMazeCell(line, id, minLength, minLength, "labyrinthe-wall") // Intersection
            if((n % 2 == 1) && (m % 2 == 0)) addMazeCell(line, id, minLength, maxLength, "labyrinthe-wall") // Mur vertical
            if((n % 2 == 0) && (m % 2 == 1)) addMazeCell(line, id, maxLength, minLength, "labyrinthe-wall") // Mur horizontal
        }
        addBorderCell(line, "right-wall-" + n, "labyrinthe-border")

        section.appendChild(line)
    }

    // Affichage du labyrinthe
    let interval = 0

    if(speed > 0) document.querySelector("#stop-maze-animation").style.visibility = "visible"

    for(let i = 0; i < stackOpenCells.length; i++) {
        if(speed > 0) {
            openCellsTemp(stackOpenCells[i], interval, speed)
            interval += stackOpenCells[i].length * speed
            gblTimeOuts.push(setTimeout(openCells, interval, stackOpenCells[i], "labyrinth-open"))
        } else {
            openCells(stackOpenCells[i], "labyrinth-open")
        }
    }

    if(speed > 0) {
        gblTimeOuts.push(setTimeout(displayArrowAccess, interval, stackOpenCells.slice(-1)))
    } else {
        displayArrowAccess(stackOpenCells.slice(-1))
    }
}

const addBorderCell = (line, id, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.className = className
    line.appendChild(cell)
}

const addMazeCell = (line, id, width, height, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.style.width = width + "px"
    cell.style.height = height + "px"
    cell.className = className
    line.appendChild(cell)
}

const openCells = (arrCells, className) => {
    let id = ""

    for(let i = 0; i < arrCells.length; i++) {
        id = arrCells[i][0] + "-" + arrCells[i][1]
        document.getElementById(id).className = className
    }
}

const openCellsTemp = (arrCells, interval, speed) => {
    let intervalTemp = interval

    for(let i = 0; i < arrCells.length; i++) {
        gblTimeOuts.push(setTimeout(openCells, intervalTemp, [arrCells[i]], "labyrinth-open-temp"))
        intervalTemp += speed
    }
}

const displayArrowAccess = (arrAccess) => {
    let id

    id = "left-wall-" + arrAccess[0][0][0]
    document.getElementById(id).classList.add("labyrinthe-access") 
    id = "right-wall-" + arrAccess[0][1][0]
    document.getElementById(id).classList.add("labyrinthe-access") 

    endDisplayMaze()
}

const endDisplayMaze = () => {
    activateBtn("#btn-generate", true)
    activateBtn("#btn-solution", true)
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopMazeAnimation = () => {
    for(var i=0; i<gblTimeOuts.length; i++) {
        clearTimeout(gblTimeOuts[i]);
    }

    for(let i=0; i<stackCells.length; i++) {
        openCells(stackCells[i])
    }
    displayArrowAccess(stackCells.slice(-1))
}

export { displayMaze, stopMazeAnimation }