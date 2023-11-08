# perfect-maze-algorithms

DOCUMENTATION :

1. Représentations des labyrinthes

Dans ce programme, la gestion des labyrinthes s'effectue à l'aide de deux types de tableau :

1.1 Le tableau contenant les pièces du labyrinthe. Ce tableau à deux dimensions, utilisé pour la résolution des algorithmes,
   correspond à la taille du labyrinthe choisie par l'utilisateur :
   - ce tableau a pour dénomination 'maze'
   - les éléments de ce tableau sont les pièces 'rooms'
   - les nombres de lignes et colonnes sont notés : 'nbLines' et 'nbColumns'

1.2 Le tableau permettant d'afficher le labyrinthe. Ce tableau à deux dimensions, qui constitue la grille du labyrinthe,
   contient les pièces, les murs et les intersections :
   - ce tableau a pour dénomination 'gridMaze'
   - les éléments de ce tableau sont les cellules 'cells'
   - les nombres de lignes et colonnes sont notés : 'nbGridLines' et 'nbGridColumns'

1.3 La fonction permettant de passer du tableau 'maze' à la grille 'gridMaze' est la fonction f(n) = 2 * n + 1

2. Algorithmes

- Ils utilisent, dans le processus de création du labyrinthe, le tableau 'maze' qui ne contient que les pièces et leurs coordonnées.
- Ils retournent une pile, nommée 'stackOpenCells' utilisée pour l'affichage du labyrinthe (avec/sans animation). 
- La pile est un tableau à 3 dimensions contenant les cellules devant être 'ouvertes' :  
  - Chaque élément de ce tableau est lui-même un tableau, qui contient une ou plusieurs cellules devant être affichées dans un même processus avec une couleur initiale,
    avant d'être affichées dans leur couleur finale lorsque le groupe de cellules suivante est affichée.
  - Ce mécanisme d'affichage en 2 temps, à l'aide de 2 couleurs, sert à illustrer au mieux la résolution de l'algorithme.
  - Chaque cellule étant représentée par un tableau contenant 2 coordonnées (ligne, colonne), la pile est donc un tableau à 3 dimensions.
  