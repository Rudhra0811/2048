import { Game2048 } from './Game.js';

document.querySelector('#app').innerHTML = `
  <div id="game-container">
    <h1>2048</h1>
    <div id="score">Score: <span id="score-value">0</span></div>
    <div id="grid"></div>
    <button id="new-game">New Game</button>
  </div>
`;

const game = new Game2048();
let gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score-value');
const newGameButton = document.getElementById('new-game');

function updateUI() {
  const newGrid = document.createElement('div');
  newGrid.id = 'grid';

  for (let i = 0; i < game.size; i++) {
    for (let j = 0; j < game.size; j++) {
      const tileValue = game.grid[i][j];
      const tile = document.createElement('div');
      tile.className = `tile${tileValue !== 0 ? ` tile-${tileValue}` : ''}`;
      if (tileValue !== 0) {
        tile.textContent = tileValue;
        tile.style.setProperty('--x', j);
        tile.style.setProperty('--y', i);

        if (game.newTiles.some(newTile => newTile.x === i && newTile.y === j)) {
          tile.classList.add('tile-new');
        } else if (game.mergedTiles.some(mergedTile => mergedTile.x === i && mergedTile.y === j)) {
          tile.classList.add('tile-merged');
        }
      }
      newGrid.appendChild(tile);
    }
  }

  gridElement.replaceWith(newGrid);
  gridElement = newGrid;
  scoreElement.textContent = game.score;
}

function handleKeyPress(event) {
  let moved = false;
  switch (event.key) {
    case 'ArrowUp':
      moved = game.move('up');
      break;
    case 'ArrowDown':
      moved = game.move('down');
      break;
    case 'ArrowLeft':
      moved = game.move('left');
      break;
    case 'ArrowRight':
      moved = game.move('right');
      break;
  }
  if (moved) {
    updateUI();
    if (game.isGameOver()) {
      alert('Game Over!');
    }
  }
}

function startNewGame() {
  game.reset();
  updateUI();
}

document.addEventListener('keydown', handleKeyPress);
newGameButton.addEventListener('click', startNewGame);

updateUI();