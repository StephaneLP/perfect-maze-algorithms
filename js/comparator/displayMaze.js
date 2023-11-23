let gblTimeOuts = new Array()
let gblMazes = new Map()

/****************************************************************************************

****************************************************************************************/

const displayMaze = (stackOpenCells, params, speed) => {
    const nbLines = 2 * params.nbLines + 1
    const nbColumns = 2 * params.nbColumns + 1

    gblMazes.set(params.idStructure, stackOpenCells)

    let mazeSection = document.getElementById("maze" + params.idStructure)
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

        mazeSection.appendChild(line)
    }

    let interval = 0
    for(let i = 0; i < stackOpenCells.length; i++) {
        openCellsTemp(params.idStructure, stackOpenCells[i], interval, speed)
        interval += stackOpenCells[i].length * speed
        gblTimeOuts.push(setTimeout(openCells, interval, params.idStructure, stackOpenCells[i], "maze-open"))
    }

    gblTimeOuts.push(setTimeout(endDisplayMaze, interval, params.idStructure))
}

/****************************************************************************************

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

const endDisplayMaze = (id) => {
    gblMazes.delete(id)
    if (gblMazes.size === 0) document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopMazeAnimation = () => {
    gblTimeOuts.map(element => clearTimeout(element))

    gblMazes.forEach((stack, id) => stack.forEach(array => openCells(id, array, "maze-open")))
    gblMazes.clear()
    document.querySelector("#stop-maze-animation").style.visibility = "hidden"
}

export { displayMaze, stopMazeAnimation }