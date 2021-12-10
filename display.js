const Game = require("./src/game");
const Strats = require("./src/strategies/game-testing-strategies.js");
const StratOne = Strats.StratOne;
const StratTwo = Strats.StratTwo;


class Display {
  constructor(clientSockets) {
      this.clientSockets = clientSockets;
      this.state = null;
  }

  socketEmit(gameState){
    for(let socketId in this.clientSockets) {
        let socket = this.clientSockets[socketId];
        socket.emit('gameState', {
          gameState
        });
    }
  }

  start() {
    this.runGame();

    /*
    setInterval(() => {
      if(Object.keys(this.clientSockets).length != 0){
        this.runGame();
      }
    }, 2000);
    */
  }

  runGame() {
    let strategies = [new StratOne(0), new StratTwo(1)]

    this.game = new Game(strategies, 13, { "Economic": null, "Movement": 3, "Combat": null }, 100, true)
    
    this.interval = setInterval(this.runPhase.bind(this), 2000); // 2 Second Delay for each Phase
  }

  runPhase() {
    console.log('Turn = ' + this.game.turn + ', Phase = ' + this.game.phase);

    if (this.game.turn > this.game.maxTurns) { return; }
    this.phaseValue = this.game.phaseStats[this.game.phase];

    switch (this.game.phase) {
      case "Movement":
        this.movementValue = 0;
        this.movementInterval = setInterval(this.runMovementPhase.bind(this), 1000); // 1 Second Delay for each Movment Round
        break;
      case "Combat":
        this.game.combatEngine.completeCombatPhase(this.game);
        this.game.generateState(null, this.phase);
        this.game.gameState.phase = this.phase
        this.socketEmit(this.game.gameState);
        break;
      case "Economic":
        this.game.economicEngine.completeEconomicPhase(this.game);        
        this.game.generateState(null, this.phase);
        this.game.gameState.phase = this.phase
        this.socketEmit(this.game.gameState);
        break;
    }

    let continuePlaying = this.game.next();

    if (!continuePlaying) { 
      clearInterval(this.interval);
    }
  }

  runMovementPhase() {
    this.game.movementEngine.completeMovementRound(this.game, this.movementValue);
    this.game.generateState(null, this.phase);
    this.game.gameState.phase = this.phase
    this.socketEmit(this.game.gameState);

    this.movementValue += 1;

    if (this.movementValue >= this.phaseValue) {
      clearInterval(this.movementInterval)
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