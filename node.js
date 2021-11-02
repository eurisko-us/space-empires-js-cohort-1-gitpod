const socket = io();

socket.on('gameState', (data) => {
    updateUI(data.gameState);
});

function updateUI(gameState) {
    let board = gameState.board;
    updateBoard(board);            
}

function updateBoard(board) {
    // Delete board table if it already exists because we're just going to recreate it
    let boardTable = document.getElementById('board');
    if (boardTable) {
        document.body.removeChild(boardTable);
    }

    boardTable = document.createElement('table');
    boardTable.id = 'board';
    document.body.appendChild(boardTable);

    for(let i = 0; i < board.numRows; i++) {
        let row = boardTable.insertRow();

        for(let j = 0; j < board.numCols; j++) {
            let spaceValue = board.spaces[i][j];

            let cell = row.insertCell();
            cell.className = 'boardSpace';

            if (spaceValue === 1) {
                cell.style.backgroundColor = 'red';
            } else if (spaceValue === 2)  {
                cell.style.backgroundColor = 'blue';
            } else {
                cell.style.backgroundColor = 'black';
            }
        }
    }
}