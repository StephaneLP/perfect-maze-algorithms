import { generateMaze } from "./generateMaze.js"
import { stopMazeAnimation } from "./displayMaze.js"

/****************************************************************************************
INIT SELECT (procédure)
- Initialisation des champs select (algorithmes)
****************************************************************************************/

const initSelect = (element) => {
    let select = document.querySelector(element)

    select.appendChild(setOption("", ""))
    select.appendChild(setOption("profondeur", "Parcours en profondeur"))
    select.appendChild(setOption("fusion", "Fusion aléatoire"))
    select.appendChild(setOption("prim", "Prim"))
    select.appendChild(setOption("sidewinder", "Sidewinder"))
    select.appendChild(setOption("binarytree", "Arbre binaire"))
}

/****************************************************************************************
SET OPTION (fonction)
- Création d'un élément 'option' (avec 2 paramètres : value et text)
****************************************************************************************/

const setOption = (value, text) => {
    let option = document.createElement("option")

    option.value = value
    option.text = text
    return option
}

/****************************************************************************************
GENERATE ALL MAZES (procédure)
Remarque : les conteneurs permettent l'affichage des labyrinthes
- Récuperation des valeurs du formulaire
- Remise à zéro des conteneurs
- Calcul de la largeur des conteneurs affichées (en fonction du nombre d'algorithmes)
- Affichage des labyrinthes (conteneurs correspondantes aux algorithmes sélectionnés)
****************************************************************************************/

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

    resetMazeContainer(1)
    resetMazeContainer(2)
    resetMazeContainer(3)
    
    const windowWidth = window.innerWidth
    const containerWidth = (nbAlgosSelected > 1 ? Math.floor(windowWidth / nbAlgosSelected) - 2 : windowWidth)
    
    document.querySelector("#stop-maze-animation").style.visibility = "visible"
    
    if (algo1 !== "") displayMazeContainer(1, algo1, animationSpeed, containerWidth)
    if (algo2 !== "") displayMazeContainer(2, algo2, animationSpeed, containerWidth)
    if (algo3 !== "") displayMazeContainer(3, algo3, animationSpeed, containerWidth)
}

/****************************************************************************************
RESET STRUCTURE (procédure)
- Remet à zéro la structure
****************************************************************************************/

const resetMazeContainer = (idContainer) => {
    document.getElementById("maze-container" + idContainer).style.display = "none"
    document.getElementById("title" + idContainer).textContent = ""
    document.getElementById("maze" + idContainer).replaceChildren()
}

/****************************************************************************************
DISPLAY STRUCTURE (procédure)
- Initialise et affiche la structure
- Appel la procédure d'affichage du labyrinthe 'generateMaze'
****************************************************************************************/

const displayMazeContainer = (idContainer, algo, speed, containerWidth) => {
    document.getElementById("maze-container" + idContainer).style.display = "block"
    document.getElementById("maze-container" + idContainer).style.width = containerWidth + "px"
    document.getElementById("title" + idContainer).textContent = document.getElementById("algorithm" + idContainer).options[document.getElementById("algorithm" + idContainer).selectedIndex].text

    generateMaze(idContainer, algo, speed)
}

/****************************************************************************************
DISPLAY MESSAGE (procédure)
- Afficher / masquer la fenetre modale message
****************************************************************************************/

const displayMessage = (blnDisplay, msg) => {
    document.querySelector(".message-container").style.visibility = (blnDisplay ? "visible" : "hidden")
    document.querySelector("#message").textContent = msg
}

/****************************************************************************************
INITIALISATION DES EVENNEMENTS
****************************************************************************************/

window.addEventListener('load', initSelect("#algorithm1"), initSelect("#algorithm2"), initSelect("#algorithm3"))
document.querySelector("#filter").addEventListener("submit", generateAllMazes)
document.querySelector("#btn-message").addEventListener("click", () => displayMessage(false, ""))
document.querySelector("#btn-maze-stop").addEventListener("click", stopMazeAnimation)

export { displayMessage }