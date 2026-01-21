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
    if (direction === 'right') {
        for (let r = 0; r < SIZE; r++) {
            const originalRow = [...board[r]];
            board[r] = slideAndCombine(originalRow.reverse()).reverse();
            while (board[r].length < SIZE) {
                board[r].unshift(0);
            }
            if (JSON.stringify(originalRow) !== JSON.stringify(board[r])) {
                moved = true;
            }
        }
    }
    if (direction === 'up') {
        for (let c = 0; c < SIZE; c++) {
            const originalColumn = board.map(row => row[c]);
            const newColumn = slideAndCombine(originalColumn);
            for (let r = 0; r < SIZE; r++) {
                board[r][c] = newColumn[r] || 0;
            }
            if (JSON.stringify(originalColumn) !== JSON.stringify(newColumn)) {
                moved = true;
            }
        }
    }
    if (direction === 'down') {
        for (let c = 0; c < SIZE; c++) {
            const originalColumn = board.map(row => row[c]).reverse();
            const newColumn = slideAndCombine(originalColumn);
            for (let r = 0; r < SIZE; r++) {
                board[SIZE - 1 - r][c] = newColumn[r] || 0;
            }
            if (JSON.stringify(originalColumn) !== JSON.stringify(newColumn.reverse())) {
                moved = true;
            }
        }
    }
    if (moved) {
        addRandomTile();
        updateBoard();
    }
}

function updateBoard() {
    const grid = document.querySelector(".grid-container");
    grid.innerHTML = "";

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");

            if (board[r][c] !== 0) {
                tile.textContent = board[r][c];
                tile.classList.add(`tile-${board[r][c]}`);
            }

            grid.appendChild(tile);
        }
    }
}
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
    }
});

// Initialize the game
initGame();