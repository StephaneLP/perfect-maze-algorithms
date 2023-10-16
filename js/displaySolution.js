import { inverseArray1Dim } from "./outils.js"

const displaySolution = (stackRooms, diameter, speed) => {
    let room, pathCells

    clearImgTags()
    speed = speed*10

    stackRooms.map((solutionRoom, index) => {
        pathCells = []
        room = solutionRoom.room
        pathCells.push((2 * room[0] + 1).toString() + "-" + (2 * room[1] + 1).toString())

        switch(solutionRoom.direction) {
            case "N":
                pathCells.unshift((2 * room[0] + 2).toString() + "-" + (2 * room[1] + 1).toString())
                break
            case "S":
                pathCells.unshift((2 * room[0]).toString() + "-" + (2 * room[1] + 1).toString())
                break
            case "W":
                pathCells.unshift((2 * room[0] + 1).toString() + "-" + (2 * room[1] + 2).toString())
                break
            case "E":
                pathCells.unshift((2 * room[0] + 1).toString() + "-" + (2 * room[1]).toString())
                break
        }

        setTimeout(displayPath, speed * index, pathCells, diameter, true)
    })
}

const displaySearchSolution = (stackRooms, diameter, speed) => {
    let room, pathCells

    clearImgTags()
    speed = speed*10

    stackRooms.map((solutionRoom, index) => {
        pathCells = []
        room = solutionRoom.room
        pathCells.push((2 * room[0] + 1).toString() + "-" + (2 * room[1] + 1).toString())

        switch(solutionRoom.direction) {
            case "N":
                pathCells.unshift((2 * room[0] + 2).toString() + "-" + (2 * room[1] + 1).toString())
                break
            case "S":
                pathCells.unshift((2 * room[0]).toString() + "-" + (2 * room[1] + 1).toString())
                break
            case "W":
                pathCells.unshift((2 * room[0] + 1).toString() + "-" + (2 * room[1] + 2).toString())
                break
            case "E":
                pathCells.unshift((2 * room[0] + 1).toString() + "-" + (2 * room[1]).toString())
                break
        }

        setTimeout(displayPath, speed * index, pathCells, diameter, solutionRoom.display)
    })
}

const displayPath = (pathCells, diameter, blnDisplay) => {
    let imgElement
  
    if(!blnDisplay) pathCells = inverseArray1Dim(pathCells)

    pathCells.map(id => {
        if(blnDisplay) {
            imgElement = document.createElement("img")
            imgElement.id = "img-" + id
            imgElement.src = "./images/round.png"
            imgElement.style.width = diameter
            imgElement.style.visibility = "visible"

            document.getElementById(id).appendChild(imgElement)
        } else {
            document.getElementById("img-" + id).remove()
        }        
    })
}

const clearImgTags = () => {
    document.querySelectorAll("img").forEach(element => {
        if (element.id.substring(0,3) === "img") element.remove()
    })
}

export { displaySolution, displaySearchSolution }