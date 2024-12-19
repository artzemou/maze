let level = 0;

const step = 20; // Taille de chaque case du labyrinthe

const mazeSize = {
  x: 9,
  y: 9
}

// État global du jeu
let gameState = {
  maze: null,
  exitX: null,
  exitY: null,
  position: null,
  pacman: null,
};


function generateMaze(width, height) {
  let maze = Array.from({ length: height }, () => Array(width).fill(1));

  // Fonction de génération du labyrinthe avec backtracking
  function carve(x, y) {
    maze[y][x] = 0;
    let directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ].sort(() => Math.random() - 0.5);

    for (let [dx, dy] of directions) {
      let nx = x + dx * 2;
      let ny = y + dy * 2;
      if (isValid(nx, ny)) {
        maze[y + dy][x + dx] = 0;
        carve(nx, ny);
      }
    }
  }

  // Vérifier si une cellule est valide
  function isValid(x, y) {
    return x > 0 && y > 0 && x < width - 1 && y < height - 1 && maze[y][x] === 1;
  }

  // Générer le labyrinthe à partir de la cellule (1, 1)
  carve(1, 1);

  // Choisir la sortie aléatoirement sur un bord
  let exitX, exitY;
  const side = Math.floor(Math.random() * 4);

  if (side === 0) { exitX = Math.floor(Math.random() * width); exitY = 0; }
  else if (side === 1) { exitX = Math.floor(Math.random() * width); exitY = height - 1; }
  else if (side === 2) { exitX = 0; exitY = Math.floor(Math.random() * height); }
  else { exitX = width - 1; exitY = Math.floor(Math.random() * height); }

  maze[exitY][exitX] = 0;

  // Vérifier que la sortie est accessible
  if (!isExitAccessible(maze, exitX, exitY)) {
    return generateMaze(width, height); // Régénérer le labyrinthe si la sortie est inaccessible
  }

  console.log(maze)

  return { maze, exitX, exitY };
}

// Dessiner le labyrinthe
function drawMaze(maze, gameContainer) {
  console.log(maze, gameContainer)
  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");
      div.style.gridColumnStart = x + 1;
      div.style.gridRowStart = y + 1;
      div.classList.add(cell === 1 ? "wall" : "path");
      gameContainer.appendChild(div);
    });
  });
}

// Trouver la première position vide pour Pac-Man
function findFirstEmptyPosition(maze, exitX, exitY) {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 0 && !(x === exitX && y === exitY)) {
        return { x: x * step, y: y * step };
      }
    }
  }
  return null;
}

// Vérifier si Pac-Man peut se déplacer à une position donnée
function canMove(x, y, position, maze) {
  const gridX = Math.floor((position.x + x) / step);
  const gridY = Math.floor((position.y + y) / step);
  if (gridX < 0 || gridX >= maze[0].length || gridY < 0 || gridY >= maze.length) {
    return false;
  }
  return maze[gridY][gridX] === 0;
}

// Déplacer Pac-Man
function movePacman(x, y, position, maze, exitX, exitY, pacman) {
  if (canMove(x, y, position, maze)) {
    position.x += x;
    position.y += y;
    pacman.style.left = position.x + "px";
    pacman.style.top = position.y + "px";
  }

  if (isAtExit(position, exitX, exitY)) {
    console.log("Vous avez atteint la sortie !");
    initializeGame(); // Redémarrer une nouvelle partie
  }
}

// Gérer les mouvements de Pac-Man avec les touches du clavier
function handleKeydown(event, gameState) {
  const { maze, exitX, exitY, position, pacman } = gameState;

  switch (event.key) {
    case "ArrowUp":
      movePacman(0, -step, position, maze, exitX, exitY, pacman);
      break;
    case "ArrowDown":
      movePacman(0, step, position, maze, exitX, exitY, pacman);
      break;
    case "ArrowLeft":
      movePacman(-step, 0, position, maze, exitX, exitY, pacman);
      pacman.style.transform = "rotate(180deg)";
      break;
    case "ArrowRight":
      movePacman(step, 0, position, maze, exitX, exitY, pacman);
      pacman.style.transform = "rotate(0deg)";
      break;
  }
}

// Fonction pour vérifier si la sortie est accessible
function isExitAccessible(maze, exitX, exitY) {
  const visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));

  // Utilisation de DFS pour vérifier l'accessibilité
  function dfs(x, y) {
    if (x < 0 || y < 0 || x >= maze[0].length || y >= maze.length || visited[y][x] || maze[y][x] === 1) {
      return false;
    }
    visited[y][x] = true;
    if (x === exitX && y === exitY) return true;

    // Explorer toutes les directions
    return dfs(x + 1, y) || dfs(x - 1, y) || dfs(x, y + 1) || dfs(x, y - 1);
  }

  return dfs(1, 1); // Commencer à la position (1, 1)
}

// Vérifier si Pac-Man est à la sortie
function isAtExit(position, exitX, exitY) {
  const { x, y } = getPacmanGridCoordinates(position.x, position.y);
  return x === exitX && y === exitY;
}


// Convertir les coordonnées en pixels de Pac-Man en indices de grille
function getPacmanGridCoordinates(xPixel, yPixel) {
  const xGrid = Math.floor(xPixel / step);
  const yGrid = Math.floor(yPixel / step);
  return { x: xGrid, y: yGrid };
}


function initializeGame() {
  level = level + 1;
  if (mazeSize.x <= 19) {
    mazeSize.x = mazeSize.x + 2
    mazeSize.y = mazeSize.y + 2
  }
  document.body.innerHTML = "";
  const levelEl = document.createElement("div")
  levelEl.id = "level"
  levelEl.innerHTML = "level n° " + level;
  document.body.appendChild(levelEl);

  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  document.body.appendChild(gameContainer);

  const pacman = document.createElement("div");
  pacman.id = "pacman";
  pacman.appendChild(document.createElement("span"));
  gameContainer.appendChild(pacman);

  const { maze, exitX, exitY } = generateMaze(mazeSize.x, mazeSize.y);
  drawMaze(maze, gameContainer);

  const position = findFirstEmptyPosition(maze, exitX, exitY);


  if (position) {
    pacman.style.left = position.x + "px";
    pacman.style.top = position.y + "px";
  }

  gameState = { maze, exitX, exitY, position, pacman };

  window.onkeydown = (event) => handleKeydown(event, gameState);

}

document.addEventListener("DOMContentLoaded", initializeGame);
