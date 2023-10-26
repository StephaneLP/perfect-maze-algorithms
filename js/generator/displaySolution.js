let gblTimeOuts = []
let gblStackCells = [], gblDiameter

/****************************************************************************************

****************************************************************************************/

const displaySolution = (stackSolutionCells, diameter, speed) => {
    clearImgTags()
    gblTimeOuts = []
    gblStackCells = stackSolutionCells
    gblDiameter = diameter

    if(speed > 0) {
        document.querySelector("#stop-solution-animation").style.visibility = "visible"
        stackSolutionCells.map((solutionCell, index) => {
            gblTimeOuts.push(setTimeout(displayCell, speed * index, solutionCell.cell, diameter, solutionCell.display))
        })
        gblTimeOuts.push(setTimeout(() => document.querySelector("#stop-solution-animation").style.visibility = "hidden", stackSolutionCells.length * speed))
    } else {
        stackSolutionCells.map(solutionCell => displayCell(solutionCell.cell, diameter, solutionCell.display))
    }
}

/****************************************************************************************

****************************************************************************************/

const displayCell = (cell, diameter, blnDisplay) => {
    let imgElement
    const id = cell[0] + "-" + cell[1]
  
    if(blnDisplay) {
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
        if(element.id.substring(0,3) === "img") element.remove()
    })
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopSolutionAnimation = () => {
    for(var i=0; i<gblTimeOuts.length; i++) clearTimeout(gblTimeOuts[i]);
    clearImgTags()
    displaySolution(gblStackCells, gblDiameter, 0)
    document.querySelector("#stop-solution-animation").style.visibility = "hidden"
}

export { displaySolution, stopSolutionAnimation }