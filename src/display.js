const Game = require("game")
const Strategy1 = require("strategies/default-strategy")
const Strategy2 = require("strategies/default-strategy")

class Display {
  constructor(clientSockets) {
      this.clientSockets = clientSockets;
      this.state = null;
  }

//   start() {
//       setInterval(() => {
//           this.state = this.generateRandomGameState();
//           for(let socketId in this.clientSockets) {
//               let socket = this.clientSockets[socketId];
              
//               socket.emit('gameState', { 
//                   gameState: this.state
//               });        
//           }
//       }, 200);  
//   }

  socket_emit(game){
    for(let socketId in this.clientSockets) {
        let socket = this.clientSockets[socketId];
        
        socket.emit('gameState', { 
            gameState: game.generateState()
        });        
    }
  }

  start() {
    let strategies = [new Strategy1(), new Strategy2()]

    let game = new Game(strategies)
    
    while (game.turn <= game.maxTurns) { // Not even gonna bother right now
        for (let phase in game.phaseStats) {
            let value = game.phaseStats[phase];
            if (phase == "Movement") {
              game.generateState(null, "Movement");
              for (let round = 0; round < value; round++) {
                for (let player of game.players) {
                  for (let unit of player.units) {
                    if (unit.canMove) {
                      this.move(game, unit, round, player)
                    }
                  }
                }
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