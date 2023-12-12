# **FICHIER generateMaze.js**

## *Generate MAZE (procédure)*

- Initialisation des paramètres du labyrinthe :
    - Dimensions de la structure
    - Calcul des nombres de lignes et colonnes
    - Calcul de la largeur des pièces, murs et intersections
- Appel de l'algorithme sélectionné et constitution la pile 'stackOpenCells'
  qui contient les cellules à 'ouvrir'
- Appel de la procédure permettant d'afficher le labyrinthe. Elle necessite 3 paramètres :
    - Pile des cellules à 'ouvrir'
    - Structure du labyrinthe (n° du labyrinthe, nombres de lignes et colonnes, dimensions des cellules)
    - Vitesse d'animation

---

# **FICHIER displayMaze.js**

## *Display Maze (procédure)*

- Ajout du labyrinthe (pile stackOpenCells) dans une variable globale (type Map)
- 1ère partie : Construction de la structure html du labyrinthe (ligne par ligne)
- 2ème partie : Affichage du labyrinthe
    - Affichage des cellules 'ouvertes' par groupes, en 2 temps à l'aide de 2 couleurs
