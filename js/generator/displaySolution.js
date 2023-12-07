let gblTimeOuts = []
let gblStackCells = []
let gblDiameter = 0

/****************************************************************************************
DISPLAY SOLUTION (procédure)
- Filtrage de la pile contenant les cellules constituant le chemin solution
  si l'utilisation de l'algorithme de recherche n'est pas souhaité (i.e. affichage direct)
- Effacement du chemin représentant la solution
- Initialisation des variables globales utilisées pour l'arrêt de l'animation
- Affichage du bouton permettant de stoper l'animation
- Affichage du chemin solution
- Si animation, utilisation de la fonction setTimeout
****************************************************************************************/
/**
 * Affichage de la solution
 * (description détaillée : README_GENERATOR.md)
 * @param {array} stack 
 * @param {*} diameter 
 * @param {*} speed 
 * @param {*} search 
 */
const displaySolution = (stack, diameter, speed, search) => {
    const stackCells = (search ? stack : stack.filter(obj => obj.solution))

    clearPath()
    gblTimeOuts = []
    gblStackCells = stackCells
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

/****************************************************************************************
DISPLAY CELL (procédure)
- Ajout/Retrait dans une cellule de l'image indiquant le chemin solution. en fonction 
  du paramètre 'display' contenu dans la pile retournée par l'agorithme de recherche de solution
****************************************************************************************/

const displayCell = (cell, diameter, blnDisplay) => {
    let imgElement
    const id = cell[0] + "-" + cell[1]
  
    if (blnDisplay) {
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

/****************************************************************************************
CLEAR PATH (procédure)
- Effacement du chemin représentant la solution
****************************************************************************************/

const clearPath = () => {
    document.querySelectorAll("img").forEach(element => {
        if (element.id.substring(0, 3) === "img") element.remove()
    })
}

/****************************************************************************************
STOP SOLUTION ANIMATION (procédure)
Fonction appelée en cliquant sur le bouton 'Terminer'
- Arrêt de l'animation
- Affichage final du chemin solution
- Masquage du bouton permettant de stoper l'animation
****************************************************************************************/

const stopSolutionAnimation = () => {
    gblTimeOuts.map(timeOut => clearTimeout(timeOut))
    clearPath()
    displaySolution(gblStackCells, gblDiameter, 0)
    document.querySelector("#stop-solution-animation").style.visibility = "hidden"
}

export { displaySolution, stopSolutionAnimation }