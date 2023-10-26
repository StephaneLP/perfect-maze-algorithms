/****************************************************************************************

****************************************************************************************/

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

/****************************************************************************************

****************************************************************************************/

const shuffleArrayDim = (arr) => {
    let arrCopy = arr.map(arr => arr.map(cell => cell))
    let array = []
    let index

    while(arrCopy.length > 0) {
        index = getRandomIntInclusive(0, arrCopy.length-1)
        array.push([...arrCopy[index]])
        arrCopy.splice(index, 1)
    }
    return array
}

/****************************************************************************************

****************************************************************************************/

const shuffleArray2Dim = (arr) => {
    let arrCopy = arr.map(arr => arr.map(cell => cell))
    let array = []
    let index

    for(let i=0; i<arrCopy.length; i++){
        index = getRandomIntInclusive(0, arrCopy.length-1)
        array.push(arrCopy[index])
        arrCopy.splice(index,1)
    }
    return array
}

/****************************************************************************************

****************************************************************************************/

const createArray2Dim = (nbLines, nbColumns, defaultValue) => {
    let value = (defaultValue !== undefined ? defaultValue : null)
    let array = new Array(nbLines).fill(null).map(() => new Array(nbColumns).fill(value))

    return array
}

/****************************************************************************************

****************************************************************************************/

function activateBtn(id, blnActive) {
    const element = document.querySelector(id)
    const animationCheckbox = document.querySelector("#animation-checkbox")
    const solutionSearch = document.querySelector(".solution-search")
    
    if(blnActive) {
        element.disabled = false
        element.classList.remove("btn-disabled")
        if(id == "#btn-solution" && animationCheckbox.checked) solutionSearch.style.display = "block"
    } else {
        element.disabled = true
        element.classList.add("btn-disabled")
        if(id == "#btn-solution") solutionSearch.style.display = "none"
    }
}

/****************************************************************************************

****************************************************************************************/

function convertCellToRoom(cell) {
    return [(cell[0] - 1) / 2, (cell[1] - 1) / 2]
}

/****************************************************************************************

****************************************************************************************/

function convertRoomToCell(room) {
    return [2 * room[0] + 1, 2 * room[1] + 1]
}

/****************************************************************************************

****************************************************************************************/

// Ajout des cellules (murs) Entrée et Sortie (dernier tableau de la pile)
const addAccessCells = (nbGridLines, nbGridColumns) => {
    const indexEntry = 2 * getRandomIntInclusive(0, nbGridLines -1 ) + 1
    const indexExit = 2 * getRandomIntInclusive(0, nbGridLines - 1) + 1

    return [[indexEntry, 0],[indexExit, 2 * nbGridColumns]]
}

export { getRandomIntInclusive, shuffleArrayDim, shuffleArray2Dim, createArray2Dim, activateBtn, convertCellToRoom, convertRoomToCell, addAccessCells }