const SIZE = 4;
let board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

function initGame() {
    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    const emptyTiles = [];
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push({ r, c });
            }
        }
    }
    if (emptyTiles.length > 0) {
        const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function slideAndCombine(row) {
    const newRow = row.filter(value => value !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow[i + 1] = 0;
        }
    }
    return newRow.filter(value => value !== 0);
}

function move(direction) {
    let moved = false;
    if (direction === 'left') {
        for (let r = 0; r < SIZE; r++) {
            const originalRow = [...board[r]];
            board[r] = slideAndCombine(originalRow);
            while (board[r].length < SIZE) {
                board[r].push(0);
            }
            if (JSON.stringify(originalRow) !== JSON.stringify(board[r])) {
                moved = true;
            }
        }
    }
    // Implement other directions (right, up, down) similarly
    if (moved) {
        addRandomTile();
        updateBoard();
    }
}

function updateBoard() {
    console.log(board);
}

// Initialize the game
initGame();