# perfect-maze-algorithms

<!-- DOCUMENTATION : -->

1.  PRINCIPE

    Une grille du labyrinthe est calculée à partir des paramètres renseignés par l'utilisateur et de la taille de la fenêtre d'affichage.
    Elle contient l'ensemble des cellules (pièces, murs verticaux et horizontaux, intersections), initialement 'fermées' (ou 'pleines').

    Le but des algorithmes est de calculer des chemins qui aboutiront à la création d'un labyrinthe parfait (i.e. unicité des chemins).
    Ils permettent de constituer une pile contenant les cellules (pièces et murs) à 'ouvrir' (ou 'vides').


2.  ELABORATION DES LABYRINTHES

    La création des labyrinthes s'effectue à l'aide de deux types de tableau :

    2.1 Le tableau contenant uniquement les pièces du labyrinthe.

        Ce tableau à deux dimensions est utilisé par les algorithmes pour l'élaboration du labyrinthe.
        Il correspond à la taille du labyrinthe choisie par l'utilisateur :

        - ce tableau a pour dénomination 'maze'
        - les éléments de ce tableau sont les pièces 'rooms'
        - les nombres de lignes et colonnes sont notés : 'nbLines' et 'nbColumns'

    2.2 Le tableau permettant d'afficher le labyrinthe.

        Ce tableau à deux dimensions, qui constitue la grille du labyrinthe, contient les pièces, les murs et les intersections.
        Il est utilisé pour déterminer les coordonnées des cellules devant être 'ouvertes' lors de l'affichage :

        - ce tableau a pour dénomination 'gridMaze'
        - les éléments de ce tableau sont les cellules 'cells'
        - les nombres de lignes et colonnes sont notés : 'nbGridLines' et 'nbGridColumns'

    2.3 La fonction permettant de passer du tableau 'maze' à la grille 'gridMaze' est la fonction f(n) = 2 * n + 1


3.  ALGORITHMES

    - Ils utilisent, dans le processus de création du labyrinthe, le tableau 'maze' qui ne contient que les pièces et leurs coordonnées.
    - Ils retournent une pile, nommée 'stackOpenCells' utilisée pour l'affichage du labyrinthe (avec/sans animation). 
    - La pile est un tableau à 3 dimensions contenant les cellules devant être 'ouvertes' :  
    - Chaque élément de ce tableau est lui-même un tableau, qui contient une ou plusieurs cellules devant être affichées dans un même processus avec une couleur initiale,
      avant d'être affichées dans leur couleur finale lorsque le groupe de cellules suivante est affichée.
    - Ce mécanisme d'affichage en 2 temps, à l'aide de 2 couleurs, sert à illustrer au mieux la résolution de l'algorithme.
    - Chaque cellule étant représentée par un tableau contenant 2 coordonnées (ligne, colonne), la pile est donc un tableau à 3 dimensions.
  