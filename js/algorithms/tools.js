// Ajout des cellules (murs) Entrée et Sortie (dernier tableau de la pile)
const addAccessCells = (stackOpenCells, nbGridLines, nbGridColumns) => {
    let indexEntry, indexExit

    indexEntry = 2 * getRandomIntInclusive(0, nbGridLines -1 ) + 1
    indexExit = 2 * getRandomIntInclusive(0, nbGridLines - 1) + 1

    stackOpenCells.push([[indexEntry, 0],[indexExit, 2 * nbGridColumns]])
}

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

export { addAccessCells }