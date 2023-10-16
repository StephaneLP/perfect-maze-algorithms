import { algoProfondeur } from "./algoBacktracking.js"
import { displayMaze } from "./displayMaze.js"
import { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim, buttonActive } from "./outils.js"

/****************************************************************************************
LOAD : INITIALISATION DES NOMBRES DE LIGNES ET COLONNES
****************************************************************************************/

const initSelect = (element, pas, max) => {
    let select = document.querySelector(element)
    let option = document.createElement("option")

    option.text = "--"
    option.value = ""
    select.appendChild(option)

    for(let n=pas; n<=max; n+=pas) {
        option = document.createElement("option")
        option.text = n
        option.value = n
        select.appendChild(option)
    }
}

window.addEventListener('load', initSelect("#lignes", 5, 80), initSelect("#colonnes", 5, 80))

/****************************************************************************************
LOAD : INITIALISATION DU FILTRE DIMENSION
****************************************************************************************/

const handleCheckboxDimensionClick = () => {
    const dimensionPerso = document.querySelector("#dimension-perso")

    document.querySelector("#select-perso").style.display = (dimensionPerso.checked ? "block" : "none")
}

document.querySelector("#dimension-perso").addEventListener("click", handleCheckboxDimensionClick)

/****************************************************************************************
FONCTION FENETRE MODALE MESSAGE
****************************************************************************************/

const displayMessage = (blnDisplay) => {
    document.querySelector(".message").style.visibility = (blnDisplay ? "visible" : "hidden")
    buttonActive("#btn-generate", true)
}

document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false))

/****************************************************************************************
FONCTION GENERER UN LABYRINTHE
****************************************************************************************/

let backUpMaze = {stackOpenCells: [], nbGridLines: 0, nbGridColumns: 0}

const generateMaze = (event) => {
    event.preventDefault()

    // Parametres
    const algorithme = event.target.algorithme.value
    const animationSpeed = event.target.animation.value
    const dimension = event.target.dimension.value
    const lines = event.target.lignes.value
    const columns = event.target.colonnes.value
    const thickness = event.target.epaisseur.value

    // Mise à jour du rôle des boutons
    buttonActive("#btn-generate", false)
    buttonActive("#btn-solution", false)

    // Calcul de la vitesse d'animation
    let speed

    if(document.querySelector("#animation-sans").checked) {
        speed = 0
    }
    else {
        speed = 10 - Number(animationSpeed)
    }

    // Calcul des nombres de lignes et colonnes en fonction de la fenêtre
    const hauteurFenetre = window.innerHeight - 40
    const largeurFenetre = window.innerWidth - 380
    const thicknessFactor = 10-Number(thickness)
    let nbGridLines, nbGridColumns, minCellLength, maxCellLength

    if(!document.querySelector("#dimension-perso").checked) {
        nbGridLines = Number(dimension)
        minCellLength = hauteurFenetre/(nbGridLines*(thicknessFactor+1)+1)
        maxCellLength = minCellLength*thicknessFactor
        nbGridColumns = Math.floor((largeurFenetre-minCellLength)/(minCellLength + maxCellLength))
    }
    else {
        if(lines==="" || columns==="") {
            displayMessage(true)
            return
        }
        nbGridLines = Number(lines)
        nbGridColumns = Number(columns)

        if((hauteurFenetre/largeurFenetre)>(nbGridLines/nbGridColumns)) {
            minCellLength = largeurFenetre/(nbGridColumns*(thicknessFactor+1)+1)
        }
        else {
            minCellLength = hauteurFenetre/(nbGridLines*(thicknessFactor+1)+1)
        }
        maxCellLength = minCellLength*thicknessFactor 
    }
  
    // Création du labyrinthe
    let stackOpenCells = []

    switch(algorithme) {
        case "profondeur":
            algoProfondeur(stackOpenCells, nbGridLines, nbGridColumns)
            break
    }

    // Affichage du labyrinthe
    displayMaze(stackOpenCells, nbGridLines, nbGridColumns, minCellLength, maxCellLength, speed)

    // BackUp du labyrinthe pour afficher la solution
    backUpMaze = {stackOpenCells: stackOpenCells, nbGridLines: nbGridLines, nbGridColumns: nbGridColumns}
}

document.querySelector("#generateur-filtre").addEventListener("submit", generateMaze)

/****************************************************************************************
FONCTION AFFICHER LA SOLUTION DU LABYRINTHE
****************************************************************************************/

const generateSolution = () => {
    const nbLines = 2*backUpMaze.nbGridLines+1
    const nbColumns = 2*backUpMaze.nbGridColumns+1
    const stackOpenCells = backUpMaze.stackOpenCells

    // Initialisation du tableau contenant le labyrinthe
    let gridMaze = createArray2Dim(nbLines, nbColumns, false)

    for(let i=0; i<stackOpenCells.length; i++) {
        for(let j=0; j<stackOpenCells[i].length; j++) {
            gridMaze[stackOpenCells[i][j][0]][stackOpenCells[i][j][1]] = true
        }
    }

    // Calcul des coordonnées des pièces "Entrée" et "Sortie"
    let accessCells = [], RoomEntry = [], RoomExit = []

    accessCells = stackOpenCells.slice(-1)[0]
    RoomEntry = [(accessCells[0][0]-1)/2, (accessCells[0][1])/2]
    RoomExit = [(accessCells[1][0]-1)/2, (accessCells[1][1]-2)/2]
    
    // Pile recherche du chemin solution
    let stackSolutionCells = []

    algoSolutionBacktracking(stackSolutionCells, gridMaze, RoomEntry, RoomExit)
}

// Retourne aléatoirement une pièce adjacente accessible non visitée
const setAdjacentRoom = (room, gridRooms, gridMaze) => {
    let n = room[0]
    let m = room[1]
    let array = []
    
    if(n>0 && gridMaze[2*n][2*m+1] && !gridRooms[n-1][m]) array.push([n-1, m]) // Pièce nord
    if(n<gridRooms.length-1 && gridMaze[2*n+2][2*m+1] && !gridRooms[n+1][m]) array.push([n+1, m]) // Pièce sud
    if(m>0 && gridMaze[2*n+1][2*m] && !gridRooms[n][m-1]) array.push([n, m-1]) // Pièce ouest
    if(m<gridRooms[0].length-1 && gridMaze[2*n+1][2*m+2] && !gridRooms[n][m+1]) array.push([n, m+1]) // Pièce est

    if(array.length>0) return shuffleArray2Dim(array)[0]

    return null 
}

function algoSolutionBacktracking(stackSolutionCells, gridMaze, RoomEntry, RoomExit) {
    let currentRoom = [], adjacentRoom = [], stackSolutionRooms = []
    let gridRooms = createArray2Dim(backUpMaze.nbGridLines, backUpMaze.nbGridColumns, false)

    // Pièce de départ : Entrée du labyrinthe
    currentRoom = RoomEntry
    gridRooms[currentRoom[0]][currentRoom[1]] = true
    stackSolutionRooms.push(currentRoom)
    stackSolutionCells.push({room: currentRoom, solution: true})

    // Algorithme de recherche du chemin solution
    while((currentRoom[0] !== RoomExit[0])||(currentRoom[1] !== RoomExit[1])) {
        adjacentRoom = setAdjacentRoom(currentRoom, gridRooms, gridMaze)
        if(adjacentRoom) {
            currentRoom = [adjacentRoom[0],adjacentRoom[1]]
            gridRooms[currentRoom[0]][currentRoom[1]] = true
            stackSolutionRooms.push(currentRoom)
            stackSolutionCells.push({room: currentRoom, solution: true})
        }
        else {
            stackSolutionCells.push({room: currentRoom, solution: false})
            stackSolutionRooms.pop()
            currentRoom = stackSolutionRooms[stackSolutionRooms.length-1]
        }
    }


    console.log(stackSolutionRooms)
    let id
    for(let i=0; i<stackSolutionRooms.length; i++) {
        id = (2*stackSolutionRooms[i][0]+1).toString() + "-" + (2*stackSolutionRooms[i][1]+1).toString()
        document.getElementById(id).className = "labyrinth-solution"
    }



    // for(let i=0; i<stackSolutionCells.length; i++) {
    //     if
    // }
    // 
}




document.querySelector("#btn-solution").addEventListener("click", generateSolution)