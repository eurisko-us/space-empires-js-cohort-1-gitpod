const Game = require('./src/game');
const Strats = require('./src/strategies/game-testing-strategies.js');
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
        socket.emit('gameState', { gameState });
    }
  }

  start() {
    this.runGame();
  }

  runGame() {
    let strategies = [new StratOne(0), new StratTwo(1)];

    this.game = new Game(strategies, 13, { 'Movement': 3, 'Combat': null, 'Economic': null }, 100, true);

    this.movementPhaseValue = this.game.phaseStats['Movement'];
    this.economicPhaseValue = this.game.phaseStats['Economic'];
    this.combatPhaseValue = this.game.phaseStats['Combat'];
    
    this.interval = setInterval(this.runPhase.bind(this), 4000); // 4 Second Delay for each Phase
  }

  runPhase() {

    if (this.game.turn > this.game.maxTurns) { return; }

    switch (this.game.phase) {
      
      case 'Movement':

        this.game.logger.logSpecificText(`\nBEGINNING OF TURN ${this.game.turn} MOVEMENT PHASE\n`);
        this.movementValue = 0;
        this.movementInterval = setInterval(this.runMovementPhase.bind(this), 1000); // 1 Second Delay for each Movment Round
        this.game.generateState(null, 'Movement', this.movementValue + 1);
        this.game.gameState.phase = 'Movement' // double checking for display
        this.game.logger.endSimpleLogMovement(this.game.gameState);
        break;
      
      case 'Combat':

        console.log('Turn = ' + this.game.turn + ', Phase = ' + this.game.phase);

        if (this.game.turn >= this.combatPhaseValue) { break; }
        this.game.combatEngine.completeCombatPhase(this.game);
        this.game.generateState(null, 'Combat');
        this.game.gameState.phase = 'Combat'; // double checking for display
        this.socketEmit(this.game.gameState);
        break;
      
      case 'Economic':

        console.log('Turn = ' + this.game.turn + ', Phase = ' + this.game.phase);
      
        if (this.game.turn >= this.economicPhaseValue) { break; }
        this.game.economicEngine.completeEconomicPhase(this.game);        
        this.game.generateState(null, 'Economic');
        this.game.gameState.phase = 'Economic'; // double checking for display
        this.socketEmit(this.game.gameState);
        break;
    }

    let continuePlaying = this.game.next();

    if (!continuePlaying) { 
      clearInterval(this.interval);
    }
  }

  runMovementPhase() {
    if (this.movementValue >= this.movementPhaseValue) {
      clearInterval(this.movementInterval);
      return;
    }

    console.log('Turn = ' + this.game.turn + ', Phase = Movement, Round = ' + (this.movementValue + 1));

    this.game.oldGameState = JSON.parse(JSON.stringify(this.game.gameState));
    this.game.movementEngine.completeMovementRound(this.game, this.movementValue);
    this.game.generateState(null, 'Movement', this.movementValue + 1);
    this.game.logger.simpleLogMovement(this.game.oldGameState, this.game.gameState, this.movementValue);
    this.game.gameState.phase = 'Movement';

    this.socketEmit(this.game.gameState);

    this.movementValue += 1;

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