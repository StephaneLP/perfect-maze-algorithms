import { generateMaze } from "./generateMaze.js"
import { generateSolution } from "./generateSolution.js"
import { stopMazeAnimation } from "./displayMaze.js"
import { stopSolutionAnimation } from "./displaySolution.js"

/**
 * Filtre 'Taille personnalisée' : initialisation des champs select (nb lignes & colonnes)
 * 
 * @param {string} selecteurCSS
 * @param {integer} step 
 * @param {integer} max 
 */
const initSelect = (selecteurCSS, step, max) => {
    let select = document.querySelector(selecteurCSS)
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

/**
 * Filtre 'Taille personnalisée' : afficher/masquer les champs select (nb lignes / colonnes)
 */
const handleDimensionClick = () => {
    const dimensionPerso = document.querySelector("#custom-size")

    document.querySelector("#select-custom-size").style.display = (dimensionPerso.checked ? "block" : "none")
}

/**
 * Filtre 'Activer l'animation' : afficher / masquer le parametrage de l'animation
 */
const handleAnimationClick = () => {
    const animationChecked = document.querySelector("#animation-checkbox").checked
    const solutionAvailable = (document.querySelector("#btn-generate-solution").disabled == false)

    document.querySelector("#animation-div").style.display = (animationChecked ? "flex" : "none")
    document.querySelector(".solution-search").style.display = (animationChecked && solutionAvailable ? "block" : "none")
}

/**
 * Afficher / masquer la fenetre modale affichant le message passé en paramètre
 * 
 * @param {boolean} blnDisplay 
 * @param {string} msg 
 */
const displayMessage = (blnDisplay, msg) => {
    document.querySelector(".message-container").style.visibility = (blnDisplay ? "visible" : "hidden")
    document.querySelector("#message").textContent = msg
}

// Paramètrage du labyrinthe
window.addEventListener('load', initSelect("#custom-nb-lines", 5, 80), initSelect("#custom-nb-columns", 5, 80))
document.querySelector("#custom-size").addEventListener("click", handleDimensionClick)
document.querySelector("#animation-checkbox").addEventListener("click", handleAnimationClick)

// Génération du labyrinthe
document.querySelector("#form-generate-maze").addEventListener("submit", generateMaze)
document.querySelector("#btn-generate-solution").addEventListener("click", generateSolution)
document.querySelector("#btn-stop-maze-animation").addEventListener("click", stopMazeAnimation)
document.querySelector("#btn-stop-solution-animation").addEventListener("click", stopSolutionAnimation)

// Fermeture de la fenêtre modale Message
document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false, ""))

export { displayMessage }