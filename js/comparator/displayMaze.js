let gblTimeOuts = new Array()
let gblMaze = new Object()

/****************************************************************************************

****************************************************************************************/

const displayMaze = (stackOpenCells, params, speed) => {
    const nbLines = 2 * params.nbLines + 1
    const nbColumns = 2 * params.nbColumns + 1

    let mazeSection = document.getElementById("maze" + params.idStructure)

    mazeSection.replaceChildren()
    gblMaze.push({id: params.idStructure, stackOpenCells: stackOpenCells})

    

    let line = "", idElement = ""
    for (let n = 0; n < nbLines; n++) {
        line = document.createElement("div")

        for (let m = 0; m < nbColumns; m++) {
            idElement = params.idStructure + "-" + n + "-" + m
            if ((n % 2 == 1) && (m % 2 == 1)) addMazeCell(line, idElement, params.maxCellLength, params.maxCellLength, "maze-room") // Pièce
            if ((n % 2 == 0) && (m % 2 == 0)) addMazeCell(line, idElement, params.minCellLength, params.minCellLength, "maze-wall") // Intersection
            if ((n % 2 == 1) && (m % 2 == 0)) addMazeCell(line, idElement, params.minCellLength, params.maxCellLength, "maze-wall") // Mur vertical
            if ((n % 2 == 0) && (m % 2 == 1)) addMazeCell(line, idElement, params.maxCellLength, params.minCellLength, "maze-wall") // Mur horizontal
        }

        mazeSection.appendChild(line)
    }

    let interval = 0
    for(let i = 0; i < stackOpenCells.length; i++) {
        openCellsTemp(params.idStructure, stackOpenCells[i], interval, speed)
        interval += stackOpenCells[i].length * speed
        gblTimeOuts.push(setTimeout(openCells, interval, params.idStructure, stackOpenCells[i], "maze-open"))
    }

    gblTimeOuts.push(setTimeout(endDisplayMaze, interval))
}

/****************************************************************************************

****************************************************************************************/

const addMazeCell = (line, idElement, width, height, className) => {
    let cell = document.createElement("div")

    cell.id = idElement
    cell.style.width = width + "px"
    cell.style.height = height + "px"
    cell.className = className
    line.appendChild(cell)
}

/****************************************************************************************

****************************************************************************************/

const openCells = (idStructure, arrCells, className) => {
    let idElement = ""

    for (let i = 0; i < arrCells.length; i++) {
        idElement = idStructure + "-" + arrCells[i][0] + "-" + arrCells[i][1]
        document.getElementById(idElement).className = className
    }
}

/****************************************************************************************

****************************************************************************************/

const openCellsTemp = (idStructure, arrCells, interval, speed) => {
    let intervalTemp = interval

    for (let i = 0; i < arrCells.length; i++) {
        gblTimeOuts.push(setTimeout(openCells, intervalTemp, idStructure, [arrCells[i]], "maze-open-temp"))
        intervalTemp += speed
    }
}

/****************************************************************************************

****************************************************************************************/

const endDisplayMaze = () => {
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopMazeAnimation = () => {
    gblTimeOuts.map(element => clearTimeout(element))

    gblMaze.forEach(obj => obj.stackOpenCells.forEach(array => openCells(obj.id, array, "maze-open")))
    gblMaze = []
    endDisplayMaze()
}

export { displayMaze, stopMazeAnimation }