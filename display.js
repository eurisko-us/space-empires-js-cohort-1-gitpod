const Game = require("./src/game")
const Strategy1 = require("./src/strategies/default-strategy")
const Strategy2 = require("./src/strategies/default-strategy")


class Display {
  constructor(clientSockets) {
      this.clientSockets = clientSockets;
      this.state = null;
  }

  socketEmit(game){
    for(let socketId in this.clientSockets) {
        let socket = this.clientSockets[socketId];
        socket.emit('gameState', {
            gameState: game.generateState()
        });
    }
  }

  start() {
    let _ = setInterval(() => {
      if(Object.keys(this.clientSockets).length != 0){
        this.runGame();
      }
    }, 200);
  }

  runGame() {
    let strategies = [new Strategy1(0), new Strategy2(1)]

    let game = new Game(strategies, 13, { "Economic": null, "Movement": 3, "Combat": null }, 100, true)
    
    for(let turn = 0; turn < game.maxTurns; turn++) {
      for (let phase in game.phaseStats) {
        let value = game.phaseStats[phase];
        if (phase == "Movement") {
          game.generateState(null, "Movement");
          for (let round = 1; round < value + 1; round++) {
            game.movementEngine.completeMovementRound(game, round);
            this.socketEmit(game);
          }
        }
        if (phase == "Combat" && game.turn <= value) {
          game.generateState(null, "Combat");
          game.combatEngine.completeCombatPhase(game);
          this.socketEmit(game)
        }
        if (phase == "Economic" && game.turn <= value) {
          game.generateState(null, "Economic");
          game.economicEngine.completeEconomicPhase(game);
          this.socketEmit(game)
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