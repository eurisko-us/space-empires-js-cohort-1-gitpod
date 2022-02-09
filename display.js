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
    let strategies = [new StratOne(0), new StratTwo(1), new StratOne(2), new StratTwo(3)];

    this.game = new Game(strategies, 17, { 'Movement': 3, 'Combat': null, 'Economic': null }, 100, 5, 7);

    this.movementPhaseValue = this.game.phaseStats['Movement'];
    this.economicPhaseValue = this.game.phaseStats['Economic'];
    this.combatPhaseValue = this.game.phaseStats['Combat'];

    this.logs = '';

    this.runPhase();
    
    //this.interval = setInterval(this.runPhase.bind(this), 4000); // 4 Second Delay for each Phase
  }

  runPhase() {

    if (this.game.turn > this.game.maxTurns) { return; }


    switch (this.game.phase) {
      
      case 'Movement':

        if (this.game.movementStep == 0) { 
          this.logs += this.game.logger.logSpecificText(`\nBEGINNING OF TURN ${this.game.turn} MOVEMENT PHASE\n`);
        }

        this.runMovementPhase();
        this.game.generateState(null, 'Movement', this.game.movementStep + 1);
        this.game.gameState.phase = 'Movement' // double checking for display

        this.logs = this.logs.replace(/\n/g, '<br><br>');
        this.logs = this.logs.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

        if (this.logs != undefined && this.logs != 'undefined') { this.game.gameState['logs'] = this.logs; }

        if (this.game.movementStep > 2) { this.logs += this.game.logger.endSimpleLogMovement(this.game.gameState); }
        
        this.socketEmit(this.game.gameState);

        break;
      
      case 'Combat':

        if (this.game.turn >= this.combatPhaseValue) { break; }

        console.log('Turn = ' + this.game.turn + ', Phase = ' + this.game.phase);
 
        this.runCombatPhase();

        this.game.generateState(null, 'Combat');
        this.game.gameState.phase = 'Combat'; // double checking for display

        this.logs = this.logs.replace(/\n/g, '<br>');
        this.logs = this.logs.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

        if (this.logs != undefined && this.logs != 'undefined') { this.game.gameState['logs'] = this.logs; }

        this.socketEmit(this.game.gameState);

        break;
      
      case 'Economic':

        if (this.game.turn >= this.economicPhaseValue) { break; }

        console.log('Turn = ' + this.game.turn + ', Phase = ' + this.game.phase);
      
        this.runEconomicPhase();

        this.game.generateState(null, 'Economic');
        this.game.gameState.phase = 'Economic'; // double checking for display

        this.logs = this.logs.replace(/\n/g, '<br>');
        this.logs = this.logs.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // whitespace text equivalent to '    ' to replace \t since '    ' doesnt work in html

        if (this.logs != undefined && this.logs != 'undefined') { this.game.gameState['logs'] = this.logs; }

        this.socketEmit(this.game.gameState);

        break;
    }

    let prevPhase = this.game.phase;

    let continuePlaying = this.game.next();

    if (continuePlaying) {

      if (prevPhase != this.game.phase) {

        if (this.game.phase == 'Movement') { this.game.movementStep = 0; }

        this.logs = '';

      }

      let timeout = 4000;
      if (prevPhase == 'Movement') { timeout = 2500; }

      setTimeout(this.runPhase.bind(this), timeout); // 2 Second Delay for each Phase/Round
    }
  }

  runMovementPhase() {
    if (this.game.movementStep >= this.movementPhaseValue) { return; }

    this.logs = '';

    console.log('Turn = ' + this.game.turn + ', Phase = Movement, Round = ' + (this.game.movementStep + 1));

    this.game.oldGameState = JSON.parse(JSON.stringify(this.game.gameState));
    this.game.movementEngine.completeMovementRound(this.game, this.game.movementStep);
    this.game.generateState(null, 'Movement', this.game.movementStep + 1);
    this.logs += this.game.logger.simpleLogMovement(this.game.oldGameState, this.game.gameState, this.game.movementStep + 1);
    this.game.gameState.phase = 'Movement';

    this.socketEmit(this.game.gameState);

    this.game.movementStep += 1;

  }

  runCombatPhase() {
    this.logs += this.game.combatEngine.completeCombatPhase(this.game);  
    this.combatTimeoutValue += 1;
  }

  runEconomicPhase() {
    this.logs += this.game.economicEngine.completeEconomicPhase(this.game);  
    this.economicTimeoutValue += 1;
  }

  getRandomInteger(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = Display;