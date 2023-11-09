/****************************************************************************************
GET RANDOM INCLUSIVE (fonction)
- Retourne aléatoirement un nombre entier élément de l'intervalle {min ; ... ; max}
****************************************************************************************/

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/****************************************************************************************
EQUAL ARRAYS (fonction)
- Compare deux tableaux : retourne 'true' si identiques, 'false' sinon
- Uniquement pour des tableaux qui ne contiennent ni tableau ni objet
****************************************************************************************/

function equalArrays(array1, array2) {
    if (array1.length !== array2.length) return false
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false
    }
    return true
}

/****************************************************************************************
CREATE ARRAY 2 DIM (fonction)
- Création d'un tableau à 2 dimensions
- Chaque élément du tableau reçoit une valeur passée en paramètre, sinon la valeur null
- Attention : ne pas passer d'objet (ou tableau) en paramètre
****************************************************************************************/

function createArray2Dim(nbLines, nbColumns, defaultValue) {
    let value = (defaultValue !== undefined ? defaultValue : null)
    let array = new Array(nbLines).fill(null).map(() => new Array(nbColumns).fill(value))

    return array
}

/****************************************************************************************
SHUFFLE ARRAY 2 DIM (fonction)
- Mélange les tableaux du tableau conteneur
- Attention : les tableaux de 2ème niveau ne doivent pas contenir des objets (ou tableau)
****************************************************************************************/

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