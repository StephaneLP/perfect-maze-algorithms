const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
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
    let array = new Array(nbLines)

    for(let n=0; n<nbLines; n++) {
        array[n] = new Array(nbColumns)
    }
    if(defaultValue !== undefined) {
        for(let n=0; n<nbLines; n++) {
            for(let m=0; m<nbColumns; m++) {
                array[n][m] = defaultValue
            }
        }        
    }
    return array
}

function buttonActive(id, blnActive) {
    if(!blnActive) {
        document.querySelector(id).disabled = true
        document.querySelector(id).classList.add("btn-disabled");
    }
    else {
        document.querySelector(id).disabled = false
        document.querySelector(id).classList.remove("btn-disabled");
    }
}

export { getRandomIntInclusive, shuffleArray2Dim, createArray2Dim, buttonActive }