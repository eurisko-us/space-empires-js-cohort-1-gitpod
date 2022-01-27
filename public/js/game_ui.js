const socket = io();

socket.on("gameState", function(data){
    updateBoard(data.gameState);

});

function updateBoard(gameState) {

    let testOutput = document.getElementById("test");

    // Delete board table if it already exists because we're just going to recreate it
    let board = gameState.board;

    switch (gameState.phase) {
      case "Movement":
        testOutput.innerHTML = "TURN " + gameState.turn + " MOVEMENT ROUND " + (gameState.round - 1);
        break;
      case "Combat":
        testOutput.innerHTML = "TURN " + gameState.turn + " COMBAT";
        break;
      case "Economic":
        testOutput.innerHTML = "TURN " + gameState.turn + " ECONOMIC";
        break;
    }

    let boardTable = document.getElementById("board");
    if (boardTable) {
        document.getElementById("board-div").removeChild(boardTable);
    }

    boardTable = document.createElement("table");
    boardTable.id = "board";
    document.getElementById("board-div").appendChild(boardTable);

    for(let y = 0; y < 13; y++) {
        let row = boardTable.insertRow();

        for(let x = 0; x < 13; x++) {
            let hex = row.insertCell();
            hex.className = "boardHex";
            hex.style.backgroundColor = "black";

            let hexIndex = x + "," + y;
            let hex_attributes = board[hexIndex];

            if (hex_attributes) {
                if ((hex_attributes["planet"] == null) && (hex_attributes["units"].length == 0)) { // empty
                    hex.style.backgroundColor = "grey";
                }
                if ((hex_attributes["planet"] != null))  { // has planet
                    hex.style.backgroundColor = "green";
                    hex.innerHTML = "Num Ships: " + hex_attributes["units"].length;
                } else if (hex_attributes["units"].length > 0) { // no planet and has ships
                    playerIndex = hex_attributes["units"][0]["playerIndex"];
                    let players = [];
                    let playerColors = []
                    for (let unit of hex_attributes["units"]){
                        if (!players.includes(unit["playerIndex"])){
                            let index = unit["playerIndex"]
                            players.push(index);
                            playerColors.push(gameState["players"][index]["playerColor"])
                        };
                    };
                    let size = 100/playerColors.length;
                    let coloring = `linear-gradient(to right`;
                    for(let i in playerColors){
                        coloring = coloring.concat(`, ${playerColors[i]} ${size*i}%, ${playerColors[i]} ${size*(i+1)}%`);
                    }
                    coloring = coloring.concat(`)`);
                    hex.style.background = coloring;


                    hex.innerHTML = "Num Ships: " + hex_attributes["units"].length;
                    // this will be made with more detail later so 
                    // individual ships will be shown and colored independently
                    // so be prepared future colby i will curse you with this
                    // - past colby
                }
            }
        }
    }

    let logs = document.getElementById("logs");
    if (logs) {
        document.getElementById("logs-div").removeChild(logs);
    }

    logs = document.createElement("p");
    logs.id = "logs";
    let text = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta nisl in libero interdum, in dictum libero maximus. Etiam id metus metus. Vivamus turpis tellus, pretium eget scelerisque et, pretium non lorem. Sed cursus suscipit neque, et sagittis enim gravida et. Nulla tincidunt eget elit vitae luctus. Sed urna risus, molestie ac neque at, tristique pulvinar metus. Morbi in rhoncus tellus. Integer non dignissim risus. Nullam lobortis finibus ipsum et aliquet. Mauris a eros elementum, facilisis urna vel, tristique purus.");
    logs.appendChild(text);
    document.getElementById("logs-div").appendChild(logs);
    
    
}

/*const socket = io();

socket.on('gameState', function(data){
    updateBoard(data.gameState);

});

function updateBoard(gameState) {

    let testOutput = document.getElementById("test");

    // Delete board table if it already exists because we're just going to recreate it
    let board = gameState.board;

    switch (gameState.phase) {
      case "Movement":
        testOutput.innerHTML = `TURN ${gameState.turn} MOVEMENT ROUND ${gameState.round}`;
        break;
      case "Combat":
        testOutput.innerHTML = `TURN ${gameState.turn} COMBAT`;
        break;
      case "Economic":
        testOutput.innerHTML = `TURN ${gameState.turn} ECONOMIC`;
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
            
            let color = 'grey';
            let text = `Num Ships: ${hex_attributes["units"].length}`;

            if (hex_attributes) {
                if ((hex_attributes["planet"] != null))  { // has planet
                    color = 'green';
                } else if (hex_attributes["units"].length > 0) { // no planet and has ships
                    if (hex_attributes.coords in Object.keys(gameState.combat)) {
                        color = 'red';
                        text = `COMBAT!\nNum Ships: ${hex_attributes["units"].length}`
                    } else {
                        color = 'blue';
                    }
                    // this will be made with more detail later so 
                    // individual ships will be shown and colored independently
                    // so be prepared future colby i will curse you with this
                    // - past colby
                    // i hate you past colby
                    // - future colby
                }

                hex.style.backgroundColor = color;
                if (color != 'grey') {
                    hex.innerHTML = text
                }

            }

            

        }

    }

}*/