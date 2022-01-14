const MovementEngine = require("./movement-engine.js");
const CombatEngine = require("./combat-engine.js");
const EconomicEngine = require("./economic-engine.js");
const BoardObjects = require("./board.js");
const Board = BoardObjects.Board;
const Player = require("./player.js");
const Unit = require("./units/unit.js");
const ColonyUnit = require("./units/colony-ship.js");
const Destroyer = require("./units/destroyer.js");
const Scout = require("./units/scout.js");
const Logger = require("./logger.js");

class Game {
  constructor(playerStrats, boardSize = 13, phaseStats = { "Economic": null, "Movement": 3, "Combat": null }, maxTurns = 100) {
    this.playerStrats = playerStrats;
    this.boardSize = boardSize;
    this.turn = 1;
    this.phase = 'Economic';
    this.maxTurns = maxTurns;
    // `phaseStats` is when we want only 
    // For example 1 economic phase for the whole game,
    // We would pass in `"economic": 1` in phase stats
    // We could also reduce the number of movement rounds there are in the movement phase
    // And also limit the combat similar to the econonic phase
    this.phaseStats = {};
    for (let phase of Object.keys(phaseStats)) {
      let value = phaseStats[phase]
      if (value == null) {
        this.phaseStats[phase] = maxTurns;
      } else {
        this.phaseStats[phase] = value;
      }
    }
    // Doing exactly what they say
    this.initializeLogger();
    this.initializePlayers();
    this.initializeBoard();
    this.initializeEngines();
  }



  initializePlayers() {
    this.players = []
    this.playerHomeBaseCoords = [ // These are the incorrect initial coords of the players, their supposed to be in the corners not the center of the sides of the board
      [Math.floor(this.boardSize / 2), 0],
      [Math.floor(this.boardSize / 2),  this.boardSize - 1],
      //[0,  Math.floor(this.boardSize / 2)],
      //[this.boardSize - 1,  Math.floor(this.boardSize / 2)]
    ]
    /* These are the correct coords for the player home worlds but since diagonals are stoopid, not yet
    [
        [1, 1],
        [this.boardSize - 1,  1],
        [1,  this.boardSize - 1],
        [this.boardSize - 1,  this.boardSize - 1]
    ]
    */
    this.playerColors = [ // These are the colors of the actual game for the four players
      "rgb(255, 100, 70)" /* Red */,
      "rgb(75, 165, 225)" /* Sky Blue */,
      "rgb(255, 255, 100)" /* Darkish Yellow */,
      "rgb(50, 125, 5)" /* Dark Green */
    ] // CSS code for the colors in rgb codes
    for (let i = 0; i < this.playerStrats.length; i++) {
      let newPlayer = new Player(this.playerStrats[i], this.playerHomeBaseCoords[i], this.boardSize, i, this.playerColors[i])
      this.players.push(newPlayer);
    }
  }

  initializeLogger() {
    this.logger = new Logger;
    this.logger.getActiveFile('/logs');
    this.logger.logSpecificText('GAME START\n')
  };

  initializeBoard() {
    this.board = new Board(); // Will probs need more args, but thats for later
    let planetCoords = [Math.floor(this.boardSize / 2) + ',' +  0, Math.floor(this.boardSize / 2) + ',' + (this.boardSize - 1)]
    this.board.generateBoard(planetCoords, this.boardSize);
    for (let player of this.players){
      this.board.grid[player.startingCoords[0] + ',' + player.startingCoords[1]].planet.colony=player.homeBase;
    }
  }

  initializeEngines() { // All of these will probs need more args, but thats for later
    this.movementEngine = new MovementEngine();
    this.combatEngine = new CombatEngine();
    this.economicEngine = new EconomicEngine();
  }

  play() {
    let continuePlaying = true;
    while (continuePlaying) {
      continuePlaying = this.completePhase();
    }
  }

  completePhase() { // Iterate through the phases
    if (/*checkIfPlayerHasWon() && */this.turn > this.maxTurns) { return false; } // check if keep playing
    this.phaseValue = this.phaseStats[this.phase];

    switch (this.phase) {
      case "Movement":
        this.logger.logSpecificText(`\nBEGINNING OF TURN ${this.turn} MOVEMENT PHASE\n`);
        for (let round = 1; round <= this.phaseValue; round++) {
          this.oldGameState = JSON.parse(JSON.stringify(this.gameState));
          this.movementEngine.completeMovementRound(this, round);
          this.generateState(null, 'Movement', round);
          this.logger.simpleLogMovement(this.oldGameState, this.gameState, round);
        }
        this.logger.endSimpleLogMovement(this.gameState);
        this.next();
        break;
      case "Combat":
        this.combatEngine.completeCombatPhase(this);
        this.generateState(null, 'Combat');
        this.next();
        break;
      case "Economic":
        this.economicEngine.completeEconomicPhase(this);        
        this.generateState(null, 'Economic');
        this.next();
        break;
    }
    return true;
  }

  next() {
    if (/*checkIfPlayerHasWon() && */this.turn > this.maxTurns) { return false; } // check if keep playing (for display.js)

    switch (this.phase) {
      case "Movement":
        this.phase = "Combat";
        break;
      case "Combat":
        this.phase = "Economic";
        break;
      case "Economic":
        this.phase = "Movement";
        this.turn += 1;
        break;
    }

    this.phaseValue = this.phaseStats[this.phase];

    return true;
  }
  
  /*checkIfPlayerHasWon() {
    later
  }*/

  generateState(currentPlayer, phase_, movementRound = 0) {
    let movementState = this.movementEngine.generateMovementState(movementRound)
    this.gameState = {
      turn: this.turn,
      winner: null,
      boardSize: this.boardSize,
      phase: phase_,
      board: this.board.generateState(),
      round: movementState["round"],
      unitData: {
        Battleship: { "cost": 20, "hullSize": 3, "shipsizeNeeded": 5, "tactics": 5, "attack": 5, "defense": 2, "maintenance": 3 },
        Battlecruiser: { "cost": 15, "hullSize": 2, "shipsizeNeeded": 4, "tactics": 4, "attack": 5, "defense": 1, "maintenance": 2 },
        Cruiser: { "cost": 12, "hullSize": 2, "shipsizeNeeded": 3, "tactics": 3, "attack": 4, "defense": 1, "maintenance": 2 },
        Destroyer: { "cost": 9, "hullSize": 1, "shipsizeNeeded": 2, "tactics": 2, "attack": 4, "defense": 0, "maintenance": 1 },
        Dreadnaught: { "cost": 24, "hullSize": 3, "shipsizeNeeded": 6, "tactics": 5, "attack": 6, "defense": 3, "maintenance": 3 },
        Scout: { "cost": 6, "hullSize": 1, "shipsizeNeeded": 1, "tactics": 1, "attack": 3, "defense": 0, "maintenance": 1 },
        Shipyard: { "cost": 3, "hullSize": 1, "shipsizeNeeded": 1, "tactics": 3, "attack": 3, "defense": 0, "maintenance": 0 },
        Decoy: { "cost": 1, "hullSize": 0, "shipsizeNeeded": 1, "tactics": 0, "attack": 0, "defense": 0, "maintenance": 0 },
        Colonyship: { "cost": 8, "hullSize": 1, "shipsizeNeeded": 1, "tactics": 0, "attack": 0, "defense": 0, "maintenance": 0 },
        Base: { "cost": 12, "hullSize": 3, "shipsizeNeeded": 2, "tactics": 5, "attack": 7, "defense": 2, "maintenance": 0 },
      },
      technologyData: {
        shipsize: [0, 10, 15, 20, 25, 30],
        attack: [20, 30, 40],
        defense: [20, 30, 40],
        movement: [0, 20, 30, 40, 40, 40],
        shipyard: [0, 20, 30],
        terraform: [25],
        tactics: [15, 20, 30],
        exploration: [15]
      }
    }

    if(currentPlayer || currentPlayer == null) {
      let temp = {}
      for (let playerNumber in this.players) {
        let player = this.players[playerNumber];
        temp[playerNumber] = player.generateState(true, (phase_ == "Combat"))
      } 
      this.gameState.players = temp
    } else {
      let temp = {}
      for (let playerNumber in this.players) {
        let player = this.players[playerNumber];
        temp[playerNumber] = player.generateState((currentPlayer == player), (phase_ == "Combat"))
      } 
      this.gameState.players = temp
    }
    if (phase_ == "Combat")
      this.gameState["combat"] = this.combatEngine.generateCombatArray(this);
    return this.gameState
  }
}

module.exports = Game;