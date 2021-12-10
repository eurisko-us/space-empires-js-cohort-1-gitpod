const socket = io();

socket.on('gameState', function(data){
    updateBoard(data.gameState);

});

function updateBoard(gameState) {

    let testOutput = document.getElementById("test");

    // Delete board table if it already exists because we're just going to recreate it
    let board = gameState.board;

    switch (gameState.phase) {
      case "Movement":
        testOutput.innerHTML = "TURN " + gameState.turn + " MOVEMENT ROUND " + gameState.round;
        break;
      case "Combat":
        testOutput.innerHTML = "TURN " + gameState.turn + " COMBAT";
        break;
      case "Economic":
        testOutput.innerHTML = "TURN " + gameState.turn + " ECONOMIC";
        break;
    }
    let boardTable = document.getElementById('board');
    if (boardTable) {
        document.body.removeChild(boardTable);
    }

    boardTable = document.createElement('table');
    boardTable.id = 'board';
    document.body.appendChild(boardTable);

    for(let y = 0; y < 13; y++) {
        let row = boardTable.insertRow();

        for(let x = 0; x < 13; x++) {
            let hex = row.insertCell();
            hex.className = 'boardSpace';
            hex.style.backgroundColor = 'black';

            let hexIndex = x + ',' + y;
            let hex_attributes = board[hexIndex];

            if (hex_attributes) {
                if ((hex_attributes["planet"] == null) && (hex_attributes["units"].length == 0)) { // empty
                    hex.style.backgroundColor = 'grey';
                }
                if ((hex_attributes["planet"] != null))  { // has planet
                    hex.style.backgroundColor = 'green';
                    hex.innerHTML = "Num Ships: " + hex_attributes["units"].length;
                } else if (hex_attributes["units"].length > 0) { // no planet and has ships
                    hex.style.backgroundColor = 'blue';
                    hex.innerHTML = "Num Ships: " + hex_attributes["units"].length;
                    // this will be made with more detail later so 
                    // individual ships will be shown and colored independently
                    // so be prepared future colby i will curse you with this
                    // - past colby
                }
            }
        }
    }
    
    
}