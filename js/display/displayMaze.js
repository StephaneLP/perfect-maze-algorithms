import { buttonActive } from "../utils/outils.js"

let gblTimeOuts = []
let stackCells = []

function displayMaze(stackOpenCells, nbGridLines, nbGridColumns, minLength, maxLength, speed) {
    let nbLines = 2*nbGridLines+1
    let nbColumns = 2*nbGridColumns+1

    // Affichage de la structure du labyrinthe
    let ligne, cellule
    let section = document.querySelector("#labyrinthe")

    section.replaceChildren()
    gblTimeOuts = []
    stackCells = stackOpenCells

    for(let n=0; n<nbLines; n++) {
        ligne = document.createElement("div")
        
        cellule = document.createElement("div")
        cellule.id = "left-wall-"+n
        cellule.className = "labyrinthe-border"
        ligne.appendChild(cellule)

        for(let m=0; m<nbColumns; m++) {
            cellule = document.createElement("div")

            cellule.id = n+"-"+m
            if((n%2==1) && (m%2==1)) { // Pièce
                cellule.style.width = maxLength + "px"
                cellule.style.height = maxLength + "px"
                cellule.className = "labyrinthe-room"
            }
            else if((n%2==0) && (m%2==0)) { // Intersection
                cellule.style.width = minLength + "px"
                cellule.style.height = minLength + "px"
                cellule.className = "labyrinthe-wall"
            }
            else if((n%2==1) && (m%2==0)) { // Mur vertical
                cellule.style.width = minLength + "px"
                cellule.style.height = maxLength + "px"
                cellule.className = "labyrinthe-wall"
            }
            else if((n%2==0) && (m%2==1)) { // Mur horizontal
                cellule.style.width = maxLength + "px"
                cellule.style.height = minLength + "px"
                cellule.className = "labyrinthe-wall"
            }

            ligne.appendChild(cellule)
        }

        cellule = document.createElement("div")
        cellule.id = "right-wall-"+n
        cellule.className = "labyrinthe-border"
        ligne.appendChild(cellule)

        section.appendChild(ligne)
    }

    // Affichage du labyrinthe
    const stackLength = stackOpenCells.length

    if(speed !== 0) {
        document.querySelector("#stop-maze-animation").style.visibility = "visible"
        speed = speed*10

        for(let i=0; i<stackLength; i++) {
            gblTimeOuts.push(setTimeout(openCells, i*speed, stackOpenCells[i]))
        }
        gblTimeOuts.push(setTimeout(displayArrowAccess, stackLength*speed, stackOpenCells.slice(-1)))
    }
    else {
        for(let i=0; i<stackLength; i++) {
            openCells(stackOpenCells[i])
        }
        displayArrowAccess(stackOpenCells.slice(-1))
    }
}

function openCells(arrCells) {
    for(let i=0; i<arrCells.length; i++) {
        const id = arrCells[i][0]+"-"+arrCells[i][1]
        document.getElementById(id).className = "labyrinth-open"
    }
}

function displayArrowAccess(arrAccess) {
    let id

    id = "left-wall-" + arrAccess[0][0][0]
    document.getElementById(id).classList.add("labyrinthe-access") 

    id = "right-wall-" + arrAccess[0][1][0]
    document.getElementById(id).classList.add("labyrinthe-access") 

    endDisplayMaze()
}

function endDisplayMaze() {
    buttonActive("#btn-generate", true)
    buttonActive("#btn-solution", true)
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

document.querySelector("#btn-maze-stop").addEventListener("click", stopMazeAnimation)

export { displayMaze }