# **algoBacktracking.js**

## *Algo Profondeur (fonction)*

- Choix aléatoire d'une pièce de départ
- Initialisation des piles stackOpenCells et stackRooms
  et mise à jour du tableau maze (voir procédure updateStacks)
- Tant que la pile stackRooms contient des pièces :
    - Sélection de la dernière pièce de la pile
    - Si une pièce attenante non visitée a été trouvée (sélection aléatoire) :
        - Mise à jour des piles stackOpenCells et stackRooms
          et mise à jour du tableau maze (voir procédure updateStacks)
    - Sinon : la dernière pièce est retirée de la pile stackRooms
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
  (pièces et murs 'ouverts' constituant les couloirs du labyrinthe)

## *Update Stacks (procédure)*

- Marque la pièce newRoom comme visitée (dans le tableau maze)
- Ajoute la pièce newRoom à la dernière place de la pile des pièces (stackRooms)
- Met à jour la pile des pièces à 'ouvrir' stackOpenCells pour l'affichage du labyrinthe
  (remarque : aucune dernière pièce n'est associée à la pièce de départ lors de la 1ère mise à jour)

---

# **algoBinarytree.js**

## *Algo Binary Tree (fonction)*

- Parcourt le labyrinthe ligne par ligne (du haut vers le bas, et de la gauche vers la droite)
- Pour chaque pièce visitée :
    - Ouverture aléatoire du mur droit ou du mur haut
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
  (pièces et murs 'ouverts' constituant les couloirs du labyrinthe)

## *Add Open Cells (fonction)*
Construit un tableau contenant les cellules 'ouvertes' :
    - Ajout de la cellule correspondant à la pièce visitée
    - Ajout du mur adjacent à la pièce :
        - Si première ligne : mur droit
        - Si dernière colonne : mur haut
        - Si dernière pièce de la première ligne : aucun ajout
        - Sinon : mur droit ou mur haut (aléatoirement)

---

# **algoFusion.js**

## *Algo Fusion (fonction)*

- Initialisation du tableau maze (qui contient des objets {n° branche, indication de visite})
- Initialisation (et mélange aléatoire) de la pile stackWalls (qui contient tous les murs)
- Tant que la pile stackWalls contient des murs :
    - Sélection du dernier mur de la pile
    - Calcul des coordonnées des pièces attenantes et lecture de leur n° de branche
    - Si les n° de branche sont différentes :
        - Fusion des n° de branche
        - Mise à jour de la pile stackOpenCells
    - Le mur est retiré de la pile stackWalls
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
  (pièces et murs 'ouverts' constituant les couloirs du labyrinthe)

## *Init Maze (fonction)*

Initialise le tableau de dimension 2 représentant le labyrinthe
Chaque élément du tableau contient un objet ayant 2 propriétés :
    - Un numéro unique de branche : n°colonne + n°ligne x nbColonnes
    - Un indicateur de visite des pièces, de type booléen, initialisé à false
- Retourne un tableau de dimension 2 qui contient des objets {numBranch, visited}

## *Init Stack Walls (fonction)*

Initialisation de la pile contenant tous les murs du labyrinthe
Attention, chaque élément de la pile correspond à un mur qui :
- N'est pas identifié par ses coordonnées
- Mais par les coordonnées des 2 pièces attenantes. Ces coordonnées sont représentées
  par un coefficient et non par un couple d'abscisses et d'ordonnées (voir fonction initMaze)

## *Add Open Cells (fonction)*

Construit un tableau contenant les cellules (pièces et murs) correspondantes au mur 'ouvert'
et aux 2 pièces attenantes :
- Le mur courrant est ajouté
- Seules les pièces non visitées sont ajoutées. La propriété 'visited' dans le tableau maze,
  passé en paramètre (par référence), est mise à jour

---

# **algoPrim.js**

## *Algo Prim (fonction)*

- Choix aléatoire d'une pièce de départ
- Initialisation des piles stackOpenCells et stackWalls
  et mise à jour du tableau maze (voir procédure updateStacks)
- Tant que la pile stackWalls contient des murs :
    - Choix aléatoire d'un mur
    - Si une des deux pièce attenantes n'a pas encore été visitée :
        - Mise à jour des piles stackOpenCells et stackWalls
          et mise à jour du tableau maze (voir procédure updateStacks)
    - Le mur est retiré de la pile stackWalls
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
  (pièces et murs 'ouverts' constituant les couloirs du labyrinthe)

## *Update Stacks (procédure)*

- Marque la pièce currentRoom comme visitée (dans le tableau maze)
- Ajoute à la pile des murs (stackWalls) les murs attenants à la pièce currentRoom
- Met à jour la pile des pièces à 'ouvrir' stackOpenCells pour l'affichage du labyrinthe
  (remarque : aucun mur n'est associé à la pièce de départ lors de la 1ère mise à jour)

---

# **algoSidewinder.js**

## *Algo Sidewinder (fonction)*

- Parcourt le labyrinthe ligne par ligne (du haut vers le bas, et de la gauche vers la droite)
- Pour chaque pièce visitée :
    - Si le mur droit est ouvert (test aléatoire à chaque boucle) :
        - Ajout des cellules (pièces et murs droits) à une pile temporaire
    - Si le mur droit est fermé :
        - Ajoute la pile temporaire à la pile stackOpenCells (appel de la fonction addOpenCells)
        - Vide la pile temporaire
- Retourne la pile stackOpenCells qui permet d'afficher le labyrinthe
  (pièces et murs 'ouverts' constituant les couloirs du labyrinthe)

## *Add Open Cells (fonction)*

Construit un tableau contenant les cellules (pièces et murs) correspondantes aux pièces
de la pile stackRooms :
- Ajoute les cellules 'pièce' et les cellules 'murs droits' (sauf pour la dernière pièce)
- Ajoute aléatoirement un passage vers le haut à partir de l'une des pièces de la pile
  (sauf pour la première ligne)
- Retourne l'ensemble des cellules 'ouvertes' de la rangée en cours (pile stackRooms)

---

# **algoSolution.js**

## *Algo Solution (fonction)*

Cet algorithme repose sur l'algorithme de parcourt en profondeur d'un arbre.

***Principe :***
l'objectif est de retourner une pile qui contient les cellules parcourues
(une pastille sera affichée aussi bien à l'emplacement des pièces que des des murs indiquant
le chemin). L'algorithme utilise 2 piles :
    - La pile 'stackSearch', qui contient les coordonnées des cellules visitées (ajoutées,
      puis retirées si elles appartiennent à un cul de sac)
    - La pile 'stackCells', qui contient la liste de TOUTES les cellules parcourues, avec :
        - Les coordonnées de la cellule
        - Un booléen indiquant s'il faut afficher/masquer la cellule
        - Un booléen indiquant si la cellule est élément du chemin final
        
- Calcul des coordonnées de l'entrée et de la sortie : murs (cells) et pièces (rooms)
- Initialisation du tableau mazeSearch (servant à identifier les pièces parcourues)
- Entrée du labyrinthe :
    - Mise à jour des piles avec le mur d'Entrée
    - Mise à jour des piles avec la pièce d'Entrée
    - La pièce 'Entrée' devient la pièce courante
- Tant que la pièce courante est différente de la Sortie :
    - Recherche d'une pièce adjacente à la pièce courante, non visitée et accessible
    - Si cette pièce existe :
        - Mise à jour des piles avec le mur séparant les pièces
        - Mise à jour des piles avec la pièce adjacente
        - La pièce adjacente devient la pièce courante
    - Sinon :
        - Mise à jour des piles : les 2 dernières cellules sont supprimées de la pile
          stackSearch et retirées de l'affichage dans la pile stackCells
        - La dernière pièce dela pile stackSearch devient la pièce courante
- Ajout du mur 'Sortie' à la pile stackCells
- Retourne la pile stackCells qui permet d'afficher la solution du labyrinthe
  (tableau qui contient des objets {cell: array(coordonnées), display: booleen, solution: booleen})

## *Update Stack Backward (procédure)*

- Suppression de la dernière cellule de la pile stackSearch
- Mise à jour de la pile stackCells :
    - La cellule est retirée de l'affichage et du chemin solution
    - La précédente occurence de la cellule est retirée du chemin solution

## *Set Adjacent Room (fonction)*

- Calcul les variables booléennes indiquant si les pièces adjacentes à la pièces courante
  existent, sont accessibles (mur intermédiaire ouvert) et sont non visitées
- Retourne aléatoirement l'une des pièces adjacentes trouvées (null si aucune pièce trouvée)
