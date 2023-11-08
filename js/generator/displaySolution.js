let gblTimeOuts = []
let gblStackCells = []
let gblDiameter = 0

/****************************************************************************************

****************************************************************************************/

const displaySolution = (stack, diameter, speed, search) => {
    const stackCells = (search ? stack : stack.filter(obj => obj.solution))

    clearImgTags()
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

****************************************************************************************/

const clearImgTags = () => {
    document.querySelectorAll("img").forEach(element => {
        if (element.id.substring(0, 3) === "img") element.remove()
    })
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopSolutionAnimation = () => {
    gblTimeOuts.map(timeOut => clearTimeout(timeOut))
    clearImgTags()
    displaySolution(gblStackCells, gblDiameter, 0)
    document.querySelector("#stop-solution-animation").style.visibility = "hidden"
}

export { displaySolution, stopSolutionAnimation }