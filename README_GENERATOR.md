<!-- EXPLICATIONS DÉTAILLÉS DES FONCTIONS DU DOSSIER GENERATOR -->

** GENERATE MAZE (procédure) **

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

DEFINE STRUCTURE (fonction)

- Calcul de la taille de la zone permettant d'afficher le labyrinthe
- Calcul du pourcentage épaisseur des murs (largeur mur / largeur pièce)
- En fonction du choix d'une taille personnalisée ou non :
    - Calcul de la taille du labyrinthe : 'nbLines' et 'nbColumns'
    - Calcul de la taille des cellules : deux dimensions 'maxCellLength' et 'minCellLength'
- Retourne un objet contenant ces 4 valeurs {nbLines, nbColumns, maxCellLength, minCellLength}
