const socket = io();

socket.on('gameState', function(data){
    document.getElementById("test").innerHTML = "Maybe";
    updateBoard(data.gameState);
});

function updateBoard(gameState) {
    // Delete board table if it already exists because we're just going to recreate it
    // let board = gameState.boardState
    document.getElementById("test").innerHTML = "In Update";
    let boardTable = document.getElementById('board');
    if (boardTable) {
        document.body.removeChild(boardTable);
    }

    boardTable = document.createElement('table');
    boardTable.id = 'board';
    document.body.appendChild(boardTable);

    document.getElementById("test").innerHTML = "New Board Done";
    for(let i = 0; i < 13; i++) {
        document.getElementById("test").innerHTML = "Starting Row";
        let row = boardTable.insertRow();
        document.getElementById("test").innerHTML = "Row Done";
        for(let j = 0; j < 13; j++) {
            // let spaceValue = board.spaces[JSON.stringify([i,j])];
            let cell = row.insertCell();
            cell.className = 'boardSpace';
            cell.style.backgroundColor = 'black';
            // if (spaceValue['planet'] != null) {
            //     cell.style.backgroundColor = 'red';
            //     if (spaceValue['units'].length > 0)  {
            //         cell.innerHTML = "has some units";
            //     }
            // } else if (spaceValue['units'].length > 0)  {
            //     cell.style.backgroundColor = 'green';
            // } else {
            //     cell.style.backgroundColor = 'black';
            // }
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