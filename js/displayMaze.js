import { getRandomIntInclusive, buttonActive } from "./outils.js"

let gblTimeOuts = []

function displayMaze(stackMazeCells, nbGridLines, nbGridColumns, minLength, maxLength, speed) {
    let nbLines = 2*nbGridLines+1
    let nbColumns = 2*nbGridColumns+1

    // Affichage de la structure du labyrinthe
    let ligne, cellule
    let section = document.querySelector("#labyrinthe")

    section.replaceChildren()

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
    const stackLength = stackMazeCells.length

    if(speed !== 0) {
        document.querySelector("#btn-stop").style.visibility = "visible"
        speed = speed*10

        gblTimeOuts = []
        for(let i=0; i<stackLength; i++) {
            gblTimeOuts.push(setTimeout(displayCells, i*speed, stackMazeCells[i]))
        }
        gblTimeOuts.push(setTimeout(displayMazeAccess, stackLength*speed, nbGridLines, nbGridColumns))
    }
    else {
        for(let i=0; i<stackLength; i++) {
            displayCells(stackMazeCells[i])
        }
        displayMazeAccess(nbGridLines, nbGridColumns)
    }
}

function displayCells(arrCells) {
    for(let i=0; i<arrCells.length; i++) {
        const id = arrCells[i][0]+"-"+arrCells[i][1]
        document.getElementById(id).style.backgroundColor = "transparent"
    }
}

function displayMazeAccess(nbLines, nbColumns) {
    let index, id

    // Entrée
    index = 2*getRandomIntInclusive(0, nbLines-1)+1
    id = "left-wall-"+index
    document.getElementById(id).classList.add("labyrinthe-access");
    id = index+"-0"
    document.getElementById(id).style.backgroundColor = "transparent"

    // Sortie
    index = 2*getRandomIntInclusive(0, nbLines-1)+1
    id = "right-wall-"+index
    document.getElementById(id).classList.add("labyrinthe-access");
    id = index+"-"+(2*nbColumns)
    document.getElementById(id).style.backgroundColor = "transparent"

    endDisplayMaze()
}

function endDisplayMaze() {
    buttonActive("#btn-generate", true)
    buttonActive("#btn-solution", true)
    document.querySelector("#btn-stop").style.visibility = "hidden"
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopAnimation = () => {
    for(var i=0; i<gblTimeOuts.length; i++) {
        clearTimeout(gblTimeOuts[i]);
    }
    endDisplayMaze()
    buttonActive("#btn-solution", false)
}

document.querySelector("#btn-stop").addEventListener("click", stopAnimation)

export { displayMaze }