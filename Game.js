export class Game2048 {
    constructor(size = 4) {
        this.size = size;
        this.grid = Array(size).fill().map(() => Array(size).fill(0));
        this.score = 0;
        this.newTiles = [];
        this.mergedTiles = [];
        this.addRandomTile();
        this.addRandomTile();
    }

    addRandomTile() {
        const availableCells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) {
                    availableCells.push({ x: i, y: j });
                }
            }
        }
        if (availableCells.length > 0) {
            const { x, y } = availableCells[Math.floor(Math.random() * availableCells.length)];
            this.grid[x][y] = Math.random() < 0.9 ? 2 : 4;
            this.newTiles.push({ x, y });
        }
    }

    move(direction) {
        this.newTiles = [];
        this.mergedTiles = [];
        let moved = false;
        const rowStep = direction === 'up' ? -1 : (direction === 'down' ? 1 : 0);
        const colStep = direction === 'left' ? -1 : (direction === 'right' ? 1 : 0);

        const traverse = (callback) => {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    const row = rowStep < 0 ? i : (rowStep > 0 ? this.size - 1 - i : i);
                    const col = colStep < 0 ? j : (colStep > 0 ? this.size - 1 - j : j);
                    callback(row, col);
                }
            }
        };

        traverse((row, col) => {
            if (this.grid[row][col] !== 0) {
                let newRow = row + rowStep;
                let newCol = col + colStep;
                while (
                    newRow >= 0 && newRow < this.size &&
                    newCol >= 0 && newCol < this.size
                ) {
                    if (this.grid[newRow][newCol] === 0) {
                        this.grid[newRow][newCol] = this.grid[newRow - rowStep][newCol - colStep];
                        this.grid[newRow - rowStep][newCol - colStep] = 0;
                        moved = true;
                    } else if (this.grid[newRow][newCol] === this.grid[newRow - rowStep][newCol - colStep]) {
                        this.grid[newRow][newCol] *= 2;
                        this.score += this.grid[newRow][newCol];
                        this.grid[newRow - rowStep][newCol - colStep] = 0;
                        this.mergedTiles.push({ x: newRow, y: newCol });
                        moved = true;
                        break;
                    } else {
                        break;
                    }
                    newRow += rowStep;
                    newCol += colStep;
                }
            }
        });

        if (moved) {
            this.addRandomTile();
        }
        return moved;
    }

    isGameOver() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === 0) {
                    return false;
                }
                if (
                    (i < this.size - 1 && this.grid[i][j] === this.grid[i + 1][j]) ||
                    (j < this.size - 1 && this.grid[i][j] === this.grid[i][j + 1])
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    reset() {
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.score = 0;
        this.newTiles = [];
        this.mergedTiles = [];
        this.addRandomTile();
        this.addRandomTile();
    }
}