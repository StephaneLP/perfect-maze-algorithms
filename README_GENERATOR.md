**FICHIER generateMaze.js**

*GENERATE MAZE (procédure)*

- Désactivation des boutons 'générer'
- Reccueil des paramètres renseignés par l'utilisateur dans la zone de filtre
- Calcul de la structure du labyrinthe et de la vitesse d'animation
- Appel de l'algorithme sélectionné et constitution la pile 'stackOpenCells'
  qui contient les cellules à 'ouvrir'
- Appel de la procédure permettant d'afficher le labyrinthe. Elle necessite 3 paramètres :
    - Pile des cellules à 'ouvrir'
    - Structure du labyrinthe
    - Vitesse d'animation
- Backup du labyrinthe (utilisé pour l'affichage de la solution)

*DEFINE STRUCTURE (fonction)*

- Calcul de la taille de la zone permettant d'afficher le labyrinthe
- Calcul du pourcentage épaisseur des murs (largeur mur / largeur pièce)
- En fonction du choix d'une taille personnalisée ou non :
    - Calcul de la taille du labyrinthe : 'nbLines' et 'nbColumns'
    - Calcul de la taille des cellules : deux dimensions 'maxCellLength' et 'minCellLength'
- Retourne un objet contenant ces 4 valeurs {nbLines, nbColumns, maxCellLength, minCellLength}


**FICHIER displayMaze.js**

*DISPLAY MAZE (procédure)*

- Initialisation des variables globales utilisées pour l'arrêt de l'animation
- 1ère partie : Construction de la structure html du labyrinthe (ligne par ligne) 
- 2ème partie : Affichage du labyrinthe
    - Affichage du bouton permettant de stoper l'animation
    - Affichage des cellules 'ouvertes' par groupes, en 2 temps à l'aide de 2 couleurs
      (voir fichier README.md pour une explication détaillée)
    - Si animation, utilisation de la fonction setTimeout
    - Affichage des flèches indiquant l'entrée et la sortie


**Fichier generateSolution.js**

*GENERATE SOLUTION (procédure)*

- Reccueil des paramètres renseignés par l'utilisateur dans la zone de filtre :
    - Avec ou sans animation
    - Vitesse d'animation
    - Avec/sans algorithme de recherche (recherche de solution ou solution directe)
- Récupération de la structure du labyrinthe (pièces) et de la pile des cellules à 'ouvrir'
- Calcul du diamètre de l'image indiquant le chemin et calcul de la vitesse d'animation
- Création et initialisation de la grille du labyrinthe (pièces + murs + intersections + entrée/sortie)
- Appel de l'algorithme et constitution la pile 'stackCells' qui contient les cellules du chemin à afficher
  Cette pile contient des objets dont la structure est : 
  {cell: array(coordonnées), display: booleen, solution: booleen}
- Appel de la procédure permettant d'afficher la solution du labyrinthe. Elle necessite 4 paramètres :
    - Pile des cellules constituant le chemin
    - Diamètre de l'image indiquant le chemin
    - Vitesse d'animation
    - Booléen avec/sans recherche du chemin solution


**Fichier displaySolution.js**

*DISPLAY SOLUTION (procédure)*

- Filtrage de la pile contenant les cellules constituant le chemin solution
  si l'utilisation de l'algorithme de recherche n'est pas souhaité (i.e. affichage direct)
- Effacement du chemin représentant la solution
- Initialisation des variables globales utilisées pour l'arrêt de l'animation
- Affichage du bouton permettant de stoper l'animation
- Affichage du chemin solution
- Si animation, utilisation de la fonction setTimeout
