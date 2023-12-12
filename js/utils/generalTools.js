/**
 * Retourne aléatoirement un nombre entier élément de l'intervalle {min ; ... ; max}
 * @param {integer} min 
 * @param {integer} max 
 * @returns {integer}
 */

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/****************************************************************************************/

/**
 * Compare deux tableaux : retourne 'true' si identiques, 'false' sinon
 * Attention : uniquement pour des tableaux qui ne contiennent ni tableau ni objet
 * @param {array} array1 
 * @param {array} array2 
 * @returns {boolean}
 */

function equalArrays(array1, array2) {
    if (array1.length !== array2.length) return false
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false
    }
    return true
}

/****************************************************************************************/

/**
 * Création d'un tableau à 2 dimensions, initialisé avec une valeur parc défaut (null sinon)
 * @param {integer} nbLines 
 * @param {integer} nbColumns 
 * @param {*} defaultValue ATTENTION : donnée de type primitif
 * @returns {array} Tableau de dimension 2
 */

function createArray2Dim(nbLines, nbColumns, defaultValue) {
    let value = (defaultValue !== undefined ? defaultValue : null)
    let array = new Array(nbLines).fill(null).map(() => new Array(nbColumns).fill(value))

    return array
}

/****************************************************************************************/

/**
 * Mélange les éléments d'un tableau à 2 dimensions
 * @param {array} array ATTENTION : données doivent être de type primitif
 * @returns {array} Tableau de dimension 2
 */

function shuffleArray2Dim(array) {
    let arrCopy = array.map(arr => [...arr])
    let arrResult = []
    let index

    while (arrCopy.length > 0) {
        index = getRandomIntInclusive(0, arrCopy.length - 1)
        arrResult.push([...arrCopy[index]])
        arrCopy.splice(index, 1)
    }
    return arrResult
}

export { getRandomIntInclusive, equalArrays, createArray2Dim, shuffleArray2Dim }