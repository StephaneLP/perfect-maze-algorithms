import { generateMaze } from "./generateMaze.js"
import { stopMazeAnimation } from "./displayMaze.js"

/****************************************************************************************
AFFICHER / MASQUER LES STRUCTURES DE LABYRINTHES CORRESPONDANT AUX ALGORITHMES SELECTIONNES
****************************************************************************************/

const initMazesStructure = () => {
    let largeurFenetre, largeurLabyrinthe, structure, select, title, maze
    let nbAlgos = 0

    for (let i = 1; i < 4; i++) {
        select = document.getElementById("algorithm" + i)
        nbAlgos += (select.selectedIndex !== 0 ? 1 : 0)
    }

    if (nbAlgos !== 0) {
        largeurFenetre = window.innerWidth
        largeurLabyrinthe = (nbAlgos > 1 ? Math.floor(largeurFenetre / nbAlgos) - 2 : largeurFenetre)
    }

    for (let i = 1; i < 4; i++) {
        select = document.getElementById("algorithm" + i)
        structure = document.getElementById("structure" + i)
        title = document.getElementById("title" + i)
        maze = document.getElementById("labyrinth" + i)

        structure.style.display = (select.selectedIndex !== 0 ? "block" : "none")
        structure.style.width = largeurLabyrinthe + "px"
        title.textContent = (select.selectedIndex !== 0 ? select.options[select.selectedIndex].text : "")
        maze.replaceChildren()
    }
}

/****************************************************************************************
AFFICHER / MASQUER LA FENETRE MODALE MESSAGE
****************************************************************************************/

const displayMessage = (blnDisplay, msg) => {
    document.querySelector(".message").style.visibility = (blnDisplay ? "visible" : "hidden")
    document.querySelector("#libelle-message").textContent = msg
    activateBtn("#btn-generate", true)
}

/****************************************************************************************

****************************************************************************************/

const prepareGeneratingMazes = (event) => {
    event.preventDefault()

    const algo1 = event.target.algorithm1.value
    const algo2 = event.target.algorithm2.value
    const algo3 = event.target.algorithm3.value
    const animationSpeed = event.target.animationSpeed.value

    if ((algo1 === "") && (algo2 === "") && (algo3 === "")) {
        displayMessage(true, "Veuillez sélectionner au moins un algorithme S.V.P.")
        return
    }
    if (algo1 !== "") generateMaze(algo1, "structure1", "labyrinth1", animationSpeed)
    if (algo2 !== "") generateMaze(algo2, "structure2", "labyrinth2", animationSpeed)
    if (algo3 !== "") generateMaze(algo3, "structure3", "labyrinth3", animationSpeed)
}

/****************************************************************************************
INITIALISATION DES EVENNEMENTS
****************************************************************************************/

document.querySelector("#algorithm1").addEventListener("change", initMazesStructure)
document.querySelector("#algorithm2").addEventListener("change", initMazesStructure)
document.querySelector("#algorithm3").addEventListener("change", initMazesStructure)
document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false, ""))
document.querySelector("#comparator-labyrinth").addEventListener("submit", prepareGeneratingMazes)
document.querySelector("#btn-maze-stop").addEventListener("click", stopMazeAnimation)

export { displayMessage }