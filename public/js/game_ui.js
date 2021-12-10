const socket = io();



socket.on('gameState', function(data){
    let testOutput = document.getElementById("test");

    testOutput.innerHTML = "Maybe";
    updateBoard(data.gameState);
});

function updateBoard(gameState) {

    let testOutput = document.getElementById("test");

    // Delete board table if it already exists because we're just going to recreate it
    let board = gameState.board;
    testOutput.innerHTML = "In Update";
    let boardTable = document.getElementById('board');
    if (boardTable) {
        document.body.removeChild(boardTable);
    }

    boardTable = document.createElement('table');
    boardTable.id = 'board';
    document.body.appendChild(boardTable);

    testOutput.innerHTML = "New Board Done";
    for(let i = 0; i < 13; i++) {
        testOutput.innerHTML = "Starting Row";
        let row = boardTable.insertRow();
        testOutput.innerHTML = "Row Done";

        for(let j = 0; j < 13; j++) {
            testOutput.innerHTML = "bad";
            let hex = row.insertCell();
            hex.className = 'boardSpace';
            hex.style.backgroundColor = 'black';

            let hexIndex = i + ',' + j;
            let hex_attributes = board[hexIndex];

            if (hex_attributes) {
                if ((hex_attributes["planet"] == null) && (hex_attributes["units"].length == 0)) { // empty
                    testOutput.innerHTML = "EMPTY";
                    hex.style.backgroundColor = 'grey';
                }
                if ((hex_attributes["planet"] != null))  { // has planet
                    testOutput.innerHTML = "PLANT";
                    hex.style.backgroundColor = 'green';
                } else if (hex_attributes["units"].length > 0) { // no planet and has ships
                    testOutput.innerHTML = "SPACE SHIP";
                    hex.style.backgroundColor = 'blue';
                    // this will be made with more detail later so 
                    // individual ships will be shown and colored independently
                    // so be prepared future colby i will curse you with this
                    // - past colby
                }
            }
        }
    }
    
            // let hex_attributes = board[JSON.stringify([i,j])];
            // let hex = row.insertCell();
            // hex.className = 'hex';
            // hex.width = "20px";
            // hex.height = "20px";
            // if ((hex_attributes["planet"] == null) && (hex_attributes["units"].length == 0)) { // empty
            //     hex.style.backgroundColor = 'grey';
            // }
            // if ((hex_attributes["planet"] != null))  { // has planet
            //     hex.style.backgroundColor = 'green';
            // } else if (hex_attributes["units"].length > 0) { // no planet and has ships
            //     hex.style.backgroundColor = 'blue';
            //     // this will be made with more detail later so 
            //     // individual ships will be shown and colored independently
            //     // so be prepared future colby i will curse you with this
            //     // - past colby
            // }else{
            //     hex.style.backgroundColor = 'black';
            // }
}