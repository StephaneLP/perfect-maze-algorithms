const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

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

const createArray2Dim = (nbLines, nbColumns, defaultValue) => {
    let value = (defaultValue !== undefined ? defaultValue : null)
    let array = new Array(nbLines).fill(null).map(() => new Array(nbColumns).fill(value))

    return array
}

function buttonActive(id, blnActive) {
    const element = document.querySelector(id)
    
    if(blnActive) {
        element.disabled = false
        element.classList.remove("btn-disabled");
    } else {
        element.disabled = true
        element.classList.add("btn-disabled");
    }
}

function convertCellToRoom(cell) {
    return [(cell[0] - 1) / 2, (cell[1] - 1) / 2]
}

function convertRoomToCell(room) {
    return [2 * room[0] + 1, 2 * room[1] + 1]
}

export { getRandomIntInclusive, shuffleArrayDim, shuffleArray2Dim, createArray2Dim, buttonActive, convertCellToRoom, convertRoomToCell }