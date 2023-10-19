let gblTimeOuts = []
let backupStackCells = [], backupDiameter

const displaySolution = (stackSolutionCells, diameter, speed) => {
    clearImgTags()
    gblTimeOuts = []
    backupStackCells = stackSolutionCells
    backupDiameter = diameter

    stackSolutionCells.map((solutionCell, index) => {
        if(speed !== 0) {
            document.querySelector("#stop-solution-animation").style.visibility = "visible"
            gblTimeOuts.push(setTimeout(displayCell, speed * index, solutionCell.cell, diameter, solutionCell.display))
        } else {
            displayCell(solutionCell.cell, diameter, solutionCell.display)
        }
    })

    if(speed !== 0) {
        gblTimeOuts.push(setTimeout(() => document.querySelector("#stop-solution-animation").style.visibility = "hidden", stackSolutionCells.length*speed))
    }
}

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

const clearImgTags = () => {
    document.querySelectorAll("img").forEach(element => {
        if (element.id.substring(0,3) === "img") element.remove()
    })
}

/****************************************************************************************
ARRET DE L'ANIMATION
****************************************************************************************/

const stopSolutionAnimation = () => {
    for(var i=0; i<gblTimeOuts.length; i++) clearTimeout(gblTimeOuts[i]);
    clearImgTags()
    displaySolution(backupStackCells, backupDiameter, 0)
    document.querySelector("#stop-solution-animation").style.visibility = "hidden"
}

document.querySelector("#btn-solution-stop").addEventListener("click", stopSolutionAnimation)

export { displaySolution }