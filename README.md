# Pac-Man Maze Game

Ce projet est un jeu de Pac-Man basé sur un labyrinthe généré dynamiquement en JavaScript. Pac-Man peut se déplacer dans le labyrinthe pour trouver la sortie, et à chaque niveau, la difficulté augmente avec un labyrinthe plus grand.

Il est en ligne à cette adresse : https://artzemou.github.io/maze/

## Fonctionnalités

- **Génération dynamique de labyrinthe** : Utilise l'algorithme de backtracking pour créer un labyrinthe unique à chaque niveau.
- **Détection de collisions** : Pac-Man peut se déplacer uniquement sur les chemins libres.
- **Niveaux progressifs** : À chaque niveau, la taille du labyrinthe augmente.
- **Interface interactive** : Pac-Man est contrôlé par les touches du clavier.

## Structure du fichier

### Variables principales

- `level`: Niveau actuel du jeu.
- `step`: Taille de chaque case du labyrinthe (en pixels).
- `mazeSize`: Dimensions du labyrinthe, augmentent avec les niveaux.
- `gameState`: État global du jeu contenant le labyrinthe, la position de la sortie, la position de Pac-Man, et son élément HTML.

### Principales fonctions

1. **`generateMaze(width, height)`**
   - Génère un labyrinthe aléatoire en utilisant l'algorithme de backtracking.
   - Place une sortie aléatoire sur le bord.

2. **`drawMaze(maze, gameContainer)`**
   - Dessine le labyrinthe dans l'interface en ajoutant des div HTML avec des classes CSS.

3. **`findFirstEmptyPosition(maze, exitX, exitY)`**
   - Trouve la première position vide pour placer Pac-Man.

4. **`canMove(x, y, position, maze)`**
   - Vérifie si Pac-Man peut se déplacer à une position donnée.

5. **`movePacman(x, y, position, maze, exitX, exitY, pacman)`**
   - Déplace Pac-Man sur l'écran et vérifie si la sortie est atteinte.

6. **`handleKeydown(event, gameState)`**
   - Gère les mouvements de Pac-Man en fonction des touches pressées.

7. **`isExitAccessible(maze, exitX, exitY)`**
   - Vérifie si la sortie est accessible à partir de l'entrée du labyrinthe.

8. **`initializeGame()`**
   - Initialise ou réinitialise le jeu à chaque niveau, en régénérant le labyrinthe et les positions.

## Utilisation

1. Clonez le dépôt ou copiez le fichier dans un projet local.
2. Ajoutez un fichier HTML qui inclut ce script et créez une feuille de style CSS pour le design.
3. Ouvrez le fichier HTML dans un navigateur.

### Contrôles

- Utilisez les flèches du clavier pour déplacer Pac-Man :
  - **Flèche Haut** : Monter
  - **Flèche Bas** : Descendre
  - **Flèche Gauche** : Aller à gauche
  - **Flèche Droite** : Aller à droite
