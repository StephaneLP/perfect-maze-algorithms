import { activateBtn } from "../utils/specificTools.js"

let gblTimeOuts = []
let gblStackCells = []

/****************************************************************************************

****************************************************************************************/

const displayMaze = (stackOpenCells, structure, speed) => {
    let nbGridLines = 2 * structure.nbLines + 1
    let nbGridColumns = 2 * structure.nbColumns + 1

    // Affichage de la structure du labyrinthe
    let section = document.querySelector("#maze")

    section.replaceChildren()
    gblTimeOuts = []
    gblStackCells = stackOpenCells

    for (let n = 0; n < nbGridLines; n++) {
        let line = document.createElement("div")

        line.appendChild(addBorderCell("left-wall-" + n, "maze-border"))
        for (let m = 0; m < nbGridColumns; m++) {
            const id = n + "-" + m
            if ((n % 2 == 1) && (m % 2 == 1)) line.appendChild(addMazeCell(id, structure.maxCellLength, structure.maxCellLength, "maze-room")) // Pièce
            if ((n % 2 == 0) && (m % 2 == 0)) line.appendChild(addMazeCell(id, structure.minCellLength, structure.minCellLength, "maze-wall")) // Intersection
            if ((n % 2 == 1) && (m % 2 == 0)) line.appendChild(addMazeCell(id, structure.minCellLength, structure.maxCellLength, "maze-wall")) // Mur vertical
            if ((n % 2 == 0) && (m % 2 == 1)) line.appendChild(addMazeCell(id, structure.maxCellLength, structure.minCellLength, "maze-wall")) // Mur horizontal
        }
        line.appendChild(addBorderCell("right-wall-" + n, "maze-border"))
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

    arrCells.map(cell => {
        id = cell[0] + "-" + cell[1]
        document.getElementById(id).className = className
    })
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
    gblTimeOuts.map(timeOut => clearTimeout(timeOut))
    gblStackCells.map(stackCells => displayCells(stackCells, "maze-open"))
    displayArrowAccess(gblStackCells.slice(-1))
}

export { displayMaze, stopMazeAnimation }