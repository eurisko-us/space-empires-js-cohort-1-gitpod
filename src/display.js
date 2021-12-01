const Game = require("../src/game")
const Strategy1 = require("../src/strategies/default-strategy")
const Strategy2 = require("../src/strategies/default-strategy")


class Display {
  constructor(clientSockets) {
      this.clientSockets = clientSockets;
      this.state = null;
  }

  socket_emit(game){
    for(let socketId in this.clientSockets) {
        let socket = this.clientSockets[socketId];
        console.log("Emitting")
        socket.emit('gameState', { 
            gameState: game.generateState()
        });
    }
  }

  start() {
    let socketCheck = setInterval(() => {
      if(Object.keys(this.clientSockets).length != 0){
        this.runGame();
      }
    }, 200);
  }

  runGame() {
    let strategies = [new Strategy1(0), new Strategy2(1)]

    let game = new Game(strategies)
    
    while (game.turn <= game.maxTurns) { 
      for (let phase in game.phaseStats) {
        let value = game.phaseStats[phase];
        if (phase == "Movement") {
          game.generateState(null, "Movement");
          for (let round = 1; round < value + 1; round++) {
            game.movementEngine.completeMovementPhase(game, round);
            this.socket_emit(game);
          }
        }
        if (phase == "Combat" && this.turn <= value) {
          this.generateState(null, "Combat");
          this.combatEngine.completeCombatPhase(this);
          this.socket_emit(game)
        }
        if (phase == "Economic" && this.turn <= value) {
          this.generateState(null, "Economic");
          this.economicEngine.completeEconomicPhase(this);
          this.socket_emit(game)
        }
      }
      game.turn += 1;
    }
  }

  generateRandomGameState() {
      let board = {
          numRows: 20,
          numCols: 20,
          spaces: []
      };

      board.spaces = new Array(board.numRows);
      for(let i = 0; i < board.numRows; i++) {
          board.spaces[i] = new Array(board.numCols);
      }

      for(let i = 0; i < board.numRows; i++) {
          for(let j = 0; j < board.numCols; j++) {        
              let r = this.getRandomInteger(1, 20);
              board.spaces[i][j] = r;
          }
      }    

      let gameState = {
          board
      };

      return gameState;
  }

  getRandomInteger(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = Display;