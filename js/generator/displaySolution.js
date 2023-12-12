let gblTimeOuts = []
let gblStackCells = []
let gblDiameter = 0

/**
 * Affichage de la solution
 * (description détaillée : README_GENERATOR.md)
 * @param {object} stack Structure : {cell: array(coordonnées), display: booleen, solution: booleen}
 * @param {integer} diameter 
 * @param {integer} speed 
 * @param {boolean} search 
 */

const displaySolution = (stack, diameter, speed, search) => {
    const stackCells = (search ? stack : stack.filter(obj => obj.solution))

    clearPath()
    gblTimeOuts = []
    gblStackCells = stackCells // Attention : copie par référence
    gblDiameter = diameter

    if (speed > 0) {
        document.querySelector("#stop-solution-animation").style.visibility = "visible"
        stackCells.map((solutionCell, index) => {
            gblTimeOuts.push(setTimeout(displayCell, speed * index, solutionCell.cell, diameter, solutionCell.display))
        })
        gblTimeOuts.push(setTimeout(() => document.querySelector("#stop-solution-animation").style.visibility = "hidden", stackCells.length * speed))
    } else {
        stackCells.map(solutionCell => displayCell(solutionCell.cell, diameter, solutionCell.display))
    }
}

/****************************************************************************************/

/**
 * Afficher/Masquer l'image indiquant le chemin solution (en fonction du paramètre 'display')
 * @param {array} cell 
 * @param {integer} diameter 
 * @param {boolean} display 
 */

const displayCell = (cell, diameter, display) => {
    let imgElement
    const id = cell[0] + "-" + cell[1]
  
    if (display) {
        imgElement = document.createElement("img")
        imgElement.id = "img-" + id
        imgElement.src = "../images/round.png"
        imgElement.style.width = diameter.toString() + "px"
        imgElement.style.visibility = "visible"

        document.getElementById(id).appendChild(imgElement)
    } else {
        document.getElementById("img-" + id).remove()
    }        
}

/****************************************************************************************/

/**
 * Effacement du chemin représentant la solution
 */

const clearPath = () => {
    document.querySelectorAll("img").forEach(element => {
        if (element.id.substring(0, 3) === "img") element.remove()
    })
}

/****************************************************************************************/

/**
 * Arrêt de l'animation et affichage complet du chemin solution.
 */

const stopSolutionAnimation = () => {
    gblTimeOuts.map(timeOut => clearTimeout(timeOut))
    clearPath()
    displaySolution(gblStackCells, gblDiameter, 0)
    document.querySelector("#stop-solution-animation").style.visibility = "hidden"
}

export { displaySolution, stopSolutionAnimation }