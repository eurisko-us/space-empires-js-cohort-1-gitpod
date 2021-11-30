const socket = io();
console.log("27")
socket.on('gameState', (data) => {
    console.log("Here3")
    updateBoard(data.gameState);
});

function updateBoard(gameState) {
    // Delete board table if it already exists because we're just going to recreate it
    let boardTable = document.getElementById('board');
    if (boardTable) {
        document.body.removeChild(boardTable);
    }
    let board = gameState.boardState
    boardTable = document.createElement('table');
    boardTable.id = 'board';

    document.body.appendChild(boardTable);

    for(let i = 0; i < gameState.boardSize; i++) {
        let row = boardTable.insertRow();

        for(let j = 0; j < gameState.boardSize; j++) {
            let hex_attributes = board[JSON.stringify([i,j])];

            let hex = row.insertCell();
            hex.className = 'hex';
            hex.width = "20px";
            hex.height = "20px";
            if ((hex["planet"] == null) && (hex["units"].length == 0)) { // empty
                hex.style.backgroundColor = 'grey';
            }
            if ((hex["planet"] != null))  { // has planet
                hex.style.backgroundColor = 'green';
            } else if (hex["units"].length > 0) { // no planet and has ships
                hex.style.backgroundColor = 'blue';
                // this will be made with more detail later so 
                // individual ships will be shown and colored independently
                // so be prepared future colby i will curse you with this
                // - past colby
            }
        }
    }
}