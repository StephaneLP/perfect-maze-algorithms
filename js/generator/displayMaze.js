import { activateBtn } from "../utils/tools.js"

let gblTimeOuts = []
let gblStackCells = []

/****************************************************************************************

****************************************************************************************/

const displayMaze = (stackOpenCells, structure, speed) => {
    let nbLines = 2 * structure.nbLines + 1
    let nbColumns = 2 * structure.nbColumns + 1

    // Affichage de la structure du maze
    let section = document.querySelector("#maze")

    section.replaceChildren()
    gblTimeOuts = []
    gblStackCells = stackOpenCells

    for(let n = 0; n < nbLines; n++) {
        let line = document.createElement("div")

        line.appendChild(addBorderCell("left-wall-" + n, "maze-border"))
        for(let m = 0; m < nbColumns; m++) {
            const id = n + "-" + m
            if((n % 2 == 1) && (m % 2 == 1)) line.appendChild(addMazeCell(id, structure.maxCellLength, structure.maxCellLength, "maze-room")) // Pièce
            if((n % 2 == 0) && (m % 2 == 0)) line.appendChild(addMazeCell(id, structure.minCellLength, structure.minCellLength, "maze-wall")) // Intersection
            if((n % 2 == 1) && (m % 2 == 0)) line.appendChild(addMazeCell(id, structure.minCellLength, structure.maxCellLength, "maze-wall")) // Mur vertical
            if((n % 2 == 0) && (m % 2 == 1)) line.appendChild(addMazeCell(id, structure.maxCellLength, structure.minCellLength, "maze-wall")) // Mur horizontal
        }
        line.appendChild(addBorderCell("right-wall-" + n, "maze-border"))
        section.appendChild(line)
    }

    if(speed > 0) {
        let interval = 0

        document.querySelector("#stop-maze-animation").style.visibility = "visible"
        stackOpenCells.map(array => {
            displayCellsProgress(array, interval, speed)
            interval += array.length * speed
            gblTimeOuts.push(setTimeout(displayCells, interval, array, "labyrinth-open"))
        })
        gblTimeOuts.push(setTimeout(displayArrowAccess, interval, stackOpenCells.slice(-1)))
    } else {
        stackOpenCells.map(array => displayCells(array, "labyrinth-open"))
        displayArrowAccess(stackOpenCells.slice(-1))
    }
}

/****************************************************************************************

****************************************************************************************/

const addBorderCell = (id, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.className = className

    return cell
}

/****************************************************************************************

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

****************************************************************************************/

const displayCells = (arrCells, className) => {
    let id = ""

    for(let i = 0; i < arrCells.length; i++) {
        id = arrCells[i][0] + "-" + arrCells[i][1]
        document.getElementById(id).className = className
    }
}

/****************************************************************************************

****************************************************************************************/

const displayCellsProgress = (arrCells, interval, speed) => {
    let intervalTemp = interval

    for(let i = 0; i < arrCells.length; i++) {
        gblTimeOuts.push(setTimeout(displayCells, intervalTemp, [arrCells[i]], "maze-open-temp"))
        intervalTemp += speed
    }
}

/****************************************************************************************

****************************************************************************************/

const displayArrowAccess = (arrAccess) => {
    let id

    id = "left-wall-" + arrAccess[0][0][0]
    document.getElementById(id).classList.add("maze-access") 
    id = "right-wall-" + arrAccess[0][1][0]
    document.getElementById(id).classList.add("maze-access") 

    endDisplayMaze()
}

/****************************************************************************************

****************************************************************************************/

const endDisplayMaze = () => {
    activateBtn("#btn-generate", true)
    activateBtn("#btn-solution", true)
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopMazeAnimation = () => {
    for(var i = 0; i < gblTimeOuts.length; i++) {
        clearTimeout(gblTimeOuts[i]);
    }
    for(let i = 0; i < gblStackCells.length; i++) {
        displayCells(gblStackCells[i], "maze-open")
    }
    displayArrowAccess(gblStackCells.slice(-1))
}

export { displayMaze, stopMazeAnimation }