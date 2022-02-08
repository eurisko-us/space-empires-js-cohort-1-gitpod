const socket = io();

socket.on("gameState", function(data){
    updateBoard(data.gameState);

});

function updateBoard(gameState) {

    let phaseOutput = document.getElementById("test");

    // Delete board table if it already exists because we're just going to recreate it
    let board = gameState.board;

    switch (gameState.phase) {
      case "Movement":
        phaseOutput.innerHTML = "TURN " + gameState.turn + " MOVEMENT ROUND " + (gameState.round - 1);
        break;
      case "Combat":
        phaseOutput.innerHTML = "TURN " + gameState.turn + " COMBAT";
        break;
      case "Economic":
        phaseOutput.innerHTML = "TURN " + gameState.turn + " ECONOMIC";
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
            let hexAttributes = board[hexIndex];

            if (hexAttributes) {
                if (hexAttributes["planet"] == null && hexAttributes["asteroid"] == null && hexAttributes["units"].length == 0) { // empty
                    hex.style.backgroundColor = "grey";
                } else if (hexAttributes["planet"] != null)  { // has planet and no ships

                    let planetColor = "rgb(96,96,192)";
                    hex.innerHTML = "Planet";
                    let currentPlanet = hexAttributes["planet"];

                    if (currentPlanet["colony"] != null) {
                        playerIndex = currentPlanet["colony"]["playerIndex"];
                        planetColor = gameState["players"][playerIndex]["playerColor"];
                        hex.innerHTML = currentPlanet["colony"]["type"];
                    }

                    if (hexAttributes["units"].length > 0) {
                        hex.innerHTML += "<br>Ships: " + hexAttributes["units"].length;
                    }
                    
                    hex.style.backgroundColor = planetColor;

                } else if (hexAttributes["asteroid"] != null)  { // has asteroid and no ships

                    let asteroidColor = "rgb(192,192,192)";
                    hex.innerHTML = "Asteroid";
                    hex.style.backgroundColor = asteroidColor;

                    if (hexAttributes["units"].length > 0) {
                        hex.innerHTML += "<br>Ships: " + hexAttributes["units"].length;
                    }

                } else if (hexAttributes["planet"] == null && hexAttributes["units"].length > 0) { // no planet and has ships

                    playerIndex = hexAttributes["units"][0]["playerIndex"];
                    let players = [];
                    let playerColors = []

                    for (let unit of hexAttributes["units"]){
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


                    hex.innerHTML = "Ships: " + hexAttributes["units"].length;
                    // this will be made with more detail later so 
                    // individual ships will be shown and colored independently
                    // so be prepared future colby i will curse you with this
                    // - past colby
                }
            }
        }
    }

    let logs = document.getElementById("logs");
    logText = gameState["logs"];
    logs.innerHTML = logText;    
    
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
            let hexAttributes = board[hexIndex];
            
            let color = 'grey';
            let text = `Num Ships: ${hexAttributes["units"].length}`;

            if (hexAttributes) {
                if ((hexAttributes["planet"] != null))  { // has planet
                    color = 'green';
                } else if (hexAttributes["units"].length > 0) { // no planet and has ships
                    if (hexAttributes.coords in Object.keys(gameState.combat)) {
                        color = 'red';
                        text = `COMBAT!\nNum Ships: ${hexAttributes["units"].length}`
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