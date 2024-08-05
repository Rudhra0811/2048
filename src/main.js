import '../style.css'
import { Game2048 } from '../Game.js'

document.querySelector('#app').innerHTML = `
  <div id="game-container">
    <h1>2048</h1>
    <div id="score">Score: <span id="score-value">0</span></div>
    <div id="grid"></div>
    <button id="new-game">New Game</button>
  </div>
`

const game = new Game2048();
const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score-value');
const newGameButton = document.getElementById('new-game');

function updateUI() {
    gridElement.innerHTML = '';
    for (let i = 0; i < game.size; i++) {
        for (let j = 0; j < game.size; j++) {
            const tileValue = game.grid[i][j];
            const tile = document.createElement('div');
            tile.className = `tile${tileValue !== 0 ? ` tile-${tileValue}` : ''}`;
            tile.textContent = tileValue !== 0 ? tileValue : '';
            tile.style.setProperty('--x', j);
            tile.style.setProperty('--y', i);
            gridElement.appendChild(tile);
        }
    }
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