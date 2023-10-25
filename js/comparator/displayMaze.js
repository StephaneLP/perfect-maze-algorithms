let gblTimeOuts = []
let gblMaze = []

const displayMaze = (maze, params, speed) => {
    const nbLines = 2 * params.nbLines + 1
    const nbColumns = 2 * params.nbColumns + 1
    const idMaze = maze.id
    const stackOpenCells = maze.stackOpenCells

    // Affichage de la params du labyrinthe
    let line, id
    let section = document.getElementById(idMaze)

    section.replaceChildren()
    gblMaze.push(maze)

    for(let n = 0; n < nbLines; n++) {
        line = document.createElement("div")

        for(let m = 0; m < nbColumns; m++) {
            id = idMaze + "-" + n + "-" + m
            if((n % 2 == 1) && (m % 2 == 1)) addMazeCell(line, id, params.maxCellLength, params.maxCellLength, "labyrinthe-room") // Pièce
            if((n % 2 == 0) && (m % 2 == 0)) addMazeCell(line, id, params.minCellLength, params.minCellLength, "labyrinthe-wall") // Intersection
            if((n % 2 == 1) && (m % 2 == 0)) addMazeCell(line, id, params.minCellLength, params.maxCellLength, "labyrinthe-wall") // Mur vertical
            if((n % 2 == 0) && (m % 2 == 1)) addMazeCell(line, id, params.maxCellLength, params.minCellLength, "labyrinthe-wall") // Mur horizontal
        }

        section.appendChild(line)
    }

    // Affichage du labyrinthe
    let interval = 0

    document.querySelector("#stop-maze-animation").style.visibility = "visible"

    for(let i = 0; i < stackOpenCells.length; i++) {
        openCellsTemp(idMaze, stackOpenCells[i], interval, speed)
        interval += stackOpenCells[i].length * speed
        gblTimeOuts.push(setTimeout(openCells, interval, idMaze, stackOpenCells[i], "labyrinth-open"))
    }

    gblTimeOuts.push(setTimeout(endDisplayMaze, interval, stackOpenCells.slice(-1)))
}

const addMazeCell = (line, id, width, height, className) => {
    let cell = document.createElement("div")

    cell.id = id
    cell.style.width = width + "px"
    cell.style.height = height + "px"
    cell.className = className
    line.appendChild(cell)
}

const openCells = (idMaze, arrCells, className) => {
    let id = ""

    for(let i = 0; i < arrCells.length; i++) {
        id = idMaze + "-" + arrCells[i][0] + "-" + arrCells[i][1]
        document.getElementById(id).className = className
    }
}

const openCellsTemp = (idMaze, arrCells, interval, speed) => {
    let intervalTemp = interval

    for(let i = 0; i < arrCells.length; i++) {
        gblTimeOuts.push(setTimeout(openCells, intervalTemp, idMaze, [arrCells[i]], "labyrinth-open-temp"))
        intervalTemp += speed
    }
}

const endDisplayMaze = () => {
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopMazeAnimation = () => {
    gblTimeOuts.map(element => clearTimeout(element))
    gblMaze.map(maze => maze.stackOpenCells.map(array => openCells(maze.id, array, "labyrinth-open")))
    gblMaze = []
    endDisplayMaze()
}

export { displayMaze, stopMazeAnimation }

document.querySelector("#btn-maze-stop").addEventListener("click", stopMazeAnimation)