import { generateMaze } from "./generateMaze.js"
import { stopMazeAnimation } from "./displayMaze.js"

/**
 * Filtre : initialisation des champs select (algorithmes)
 * @param {string} selecteurCSS 
 */

const initSelect = (selecteurCSS) => {
    let select = document.querySelector(selecteurCSS)

    select.appendChild(setOption("", ""))
    select.appendChild(setOption("profondeur", "Parcours en profondeur"))
    select.appendChild(setOption("fusion", "Fusion aléatoire"))
    select.appendChild(setOption("prim", "Prim"))
    select.appendChild(setOption("sidewinder", "Sidewinder"))
    select.appendChild(setOption("binarytree", "Arbre binaire"))
}

/****************************************************************************************/

/**
 * Création d'un élément 'option' (avec 2 paramètres : value et text)
 * @param {string} value 
 * @param {string} text 
 * @returns 
 */

const setOption = (value, text) => {
    let option = document.createElement("option")

    option.value = value
    option.text = text
    return option
}

/****************************************************************************************/

/**
 * Récuperation des valeurs du formulaire et remise à zéro des conteneurs des labyrinthes.
 * Calcul de la largeur des conteneurs des labyrinthes en fonction du nombre d'algorithmes.
 * Appel de l'affichage des labyrinthes.
 * @param {object} event 
 * @returns 
 */

const generateAllMazes = (event) => {
    event.preventDefault()

    const algo1 = event.target.algorithm1.value
    const algo2 = event.target.algorithm2.value
    const algo3 = event.target.algorithm3.value
    const animationSpeed = event.target.animationSpeed.value

    let nbAlgosSelected = 0

    if (algo1 !== "") nbAlgosSelected += 1
    if (algo2 !== "") nbAlgosSelected += 1
    if (algo3 !== "") nbAlgosSelected += 1

    if (nbAlgosSelected === 0) {
        displayMessage(true, "Veuillez sélectionner au moins un algorithme S.V.P.")
        return
    }

    resetMazeContainer("1")
    resetMazeContainer("2")
    resetMazeContainer("3")
    
    const windowWidth = window.innerWidth
    const containerWidth = (nbAlgosSelected > 1 ? Math.floor(windowWidth / nbAlgosSelected) - 2 : windowWidth)
    
    document.querySelector("#stop-maze-animation").style.visibility = "visible"
    
    if (algo1 !== "") displayMazeContainer("1", algo1, animationSpeed, containerWidth)
    if (algo2 !== "") displayMazeContainer("2", algo2, animationSpeed, containerWidth)
    if (algo3 !== "") displayMazeContainer("3", algo3, animationSpeed, containerWidth)
}

/****************************************************************************************/

/**
 * 
 * @param {string} idContainer 
 */

const resetMazeContainer = (idContainer) => {
    document.getElementById("maze-container" + idContainer).style.display = "none"
    document.getElementById("title" + idContainer).textContent = ""
    document.getElementById("maze" + idContainer).replaceChildren()
}

/****************************************************************************************/

/**
 * Initialise et affiche la structure du labyrinthe
 * @param {string} idContainer 
 * @param {string} algo 
 * @param {string} speed 
 * @param {integer} containerWidth 
 */

const displayMazeContainer = (idContainer, algo, speed, containerWidth) => {
    document.getElementById("maze-container" + idContainer).style.display = "block"
    document.getElementById("maze-container" + idContainer).style.width = containerWidth.toString() + "px"
    document.getElementById("title" + idContainer).textContent = document.getElementById("algorithm" + idContainer).options[document.getElementById("algorithm" + idContainer).selectedIndex].text

    generateMaze(idContainer, algo, speed)
}

/****************************************************************************************/

/**
 * Afficher / masquer la fenetre modale affichant le message passé en paramètre
 * @param {boolean} blnDisplay 
 * @param {string} msg 
 */

const displayMessage = (blnDisplay, msg) => {
    document.querySelector(".message-container").style.visibility = (blnDisplay ? "visible" : "hidden")
    document.querySelector("#message").textContent = msg
}

/****************************************************************************************/

window.addEventListener('load', initSelect("#algorithm1"), initSelect("#algorithm2"), initSelect("#algorithm3"))
document.querySelector("#filter").addEventListener("submit", generateAllMazes)
document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false, ""))
document.querySelector("#btn-maze-stop").addEventListener("click", stopMazeAnimation)

export { displayMessage }