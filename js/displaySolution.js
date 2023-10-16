const displaySolution = (stackRooms, diameter, speed) => {
    let lastRoom = null
    let idRoom, idWall = null

    // Effacer les traces présentes
    document.querySelectorAll("img").forEach(element => {
        if (element.id.substring(0,3) === "img") element.remove()
    })

    speed = speed*10

    stackRooms.map((room, index) => {
        idRoom = (2 * room[0] + 1).toString() + "-" + (2 * room[1] + 1).toString()
        if(lastRoom) idWall = (room[0] + 1 + lastRoom[0]).toString() + "-" + (room[1] + 1 + lastRoom[1]).toString()
        setTimeout(displayPath, speed * index, [idRoom, idWall], diameter, true)
        lastRoom = [...room]
    })
}

const displaySearchSolution = (stackRooms, diameter, speed) => {
    let lastRoom = null, displayCells = []
    let idRoom, idWall, room

    // Effacer les traces présentes
    document.querySelectorAll("img").forEach(element => {
        if (element.id.substring(0,3) === "img") element.remove()
    })

    speed = speed*10

    stackRooms.map((cell, index) => {
        if(cell.display) {
            room = [...cell.room]
            idRoom = (2 * room[0] + 1).toString() + "-" + (2 * room[1] + 1).toString()
            if(lastRoom)  idWall = (room[0] + 1 + lastRoom[0]).toString() + "-" + (room[1] + 1 + lastRoom[1]).toString()
            setTimeout(displayPath, speed * index, [idRoom, idWall], diameter, true)
            displayCells.push([idRoom, idWall])
            lastRoom = [...room]
        } else {
            setTimeout(displayPath, speed * index, displayCells.pop(), diameter, false)
        }
    })
}

const displayPath = (stackId, diameter, blnDisplay) => {
    let imgElement

    stackId.map(id => {
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

export { displaySolution, displaySearchSolution }