import { prepareGeneratingMazes } from "./generateMazes.js"

/****************************************************************************************
AFFICHER / MASQUER LES STRUCTURES DE LABYRINTHES CORRESPONDANT AUX ALGORITHMES SELECTIONNES
****************************************************************************************/

const initMazesStructure = () => {
    let largeurFenetre, largeurLabyrinthe, structure, select, title, maze
    let nbAlgos = 0

    for(let i = 1; i < 4; i++) {
        select = document.getElementById("algorithm" + i)
        nbAlgos += (select.selectedIndex !== 0 ? 1 : 0)
    }

    if(nbAlgos !== 0) {
        largeurFenetre = window.innerWidth
        largeurLabyrinthe = (nbAlgos > 1 ? Math.floor(largeurFenetre / nbAlgos) - 2 : largeurFenetre)
    }

    for(let i = 1; i < 4; i++) {
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
INITIALISATION DES EVENNEMENTS
****************************************************************************************/

document.querySelector("#algorithm1").addEventListener("change", initMazesStructure)
document.querySelector("#algorithm2").addEventListener("change", initMazesStructure)
document.querySelector("#algorithm3").addEventListener("change", initMazesStructure)
document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false, ""))
document.querySelector("#comparator-labyrinth").addEventListener("submit", prepareGeneratingMazes)

export { displayMessage }