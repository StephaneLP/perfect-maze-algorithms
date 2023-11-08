import { generateMaze } from "./generateMaze.js"
import { generateSolution } from "./generateSolution.js"
import { stopMazeAnimation } from "./displayMaze.js"
import { stopSolutionAnimation } from "./displaySolution.js"
import { activateBtn } from "../utils/specificTools.js"

/****************************************************************************************
TAILLE PERSONNALISEE : INITIALISATION DES SELECT NOMBRES DE LIGNES ET COLONNES
****************************************************************************************/

const initSelect = (element, step, max) => {
    let select = document.querySelector(element)
    let option = document.createElement("option")

    option.text = "--"
    option.value = ""
    select.appendChild(option)

    for (let n = step; n <= max; n += step) {
        option = document.createElement("option")
        option.text = n
        option.value = n
        select.appendChild(option)
    }
}

/****************************************************************************************
TAILLE PERSONNALISEE : AFFICHER / MASQUER LES CHAMPS SELECT
****************************************************************************************/

const handleDimensionClick = () => {
    const dimensionPerso = document.querySelector("#custom-size")

    document.querySelector("#select-custom-size").style.display = (dimensionPerso.checked ? "block" : "none")
}

/****************************************************************************************
ANIMATION : AFFICHER / MASQUER LE PARAMETRAGE DE L'ANIMATION
****************************************************************************************/

const handleAnimationClick = () => {
    const animationChecked = document.querySelector("#animation-checkbox").checked
    const solutionAvailable = (document.querySelector("#btn-solution").disabled == false)

    document.querySelector("#animation-div").style.display = (animationChecked ? "flex" : "none")
    document.querySelector(".solution-search").style.display = (animationChecked && solutionAvailable ? "block" : "none")
}

/****************************************************************************************
AFFICHER / MASQUER LA FENETRE MODALE MESSAGE
****************************************************************************************/

const displayMessage = (blnDisplay, msg) => {
    document.querySelector(".message-container").style.visibility = (blnDisplay ? "visible" : "hidden")
    document.querySelector("#message").textContent = msg
    activateBtn("#btn-generate", true)
}

/****************************************************************************************
INITIALISATION DES EVENNEMENTS
****************************************************************************************/

window.addEventListener('load', initSelect("#custom-nb-lines", 5, 80), initSelect("#custom-nb-columns", 5, 80))
document.querySelector("#custom-size").addEventListener("click", handleDimensionClick)
document.querySelector("#animation-checkbox").addEventListener("click", handleAnimationClick)
document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false, ""))
document.querySelector("#generator-form").addEventListener("submit", generateMaze)
document.querySelector("#btn-solution").addEventListener("click", generateSolution)
document.querySelector("#btn-maze-stop").addEventListener("click", stopMazeAnimation)
document.querySelector("#btn-solution-stop").addEventListener("click", stopSolutionAnimation)

export { displayMessage }