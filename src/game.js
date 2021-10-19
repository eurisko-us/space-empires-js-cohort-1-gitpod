const MovementEngine = require("../src/movement-engine.js");
const CombatEngine = require("../src/combat-engine.js");
const EconomicEngine = require("../src/economic-engine.js");
const Board = require("../src/board.js");
const Player = require("../src/player.js");
const Unit = require("../src/units/unit.js");
const ColonyShip = require("../src/units/colony-ship.js");
const Destroyer = require("../src/units/destroyer.js");
const Scout = require("../src/units/scout.js");
const Logger = require("../src/logger.js");

class Game {
  constructor(playerStrats, boardSize = 13, phaseStats = { "Economic": null, "Movement": 3, "Combat": null }, maxTurns = 100) {
    this.playerStrats = playerStrats;
    this.boardSize = boardSize;
    this.turn = 1;
    this.maxTurns = maxTurns;
<<<<<<< Updated upstream
    this.planetCoords=["7,0","7,12"]
=======
    this.initializeLogger();
>>>>>>> Stashed changes
    // `phaseStats` is when we want only 
    // For example 1 economic phase for the whole game,
    // We would pass in `"economic": 1` in phase stats
    // We could also reduce the number of movement rounds there are in the movement phase
    // And also limit the combat similar to the econonic phase
    this.phaseStats = {};
    for (let phase of Object.keys(phaseStats)) {
      let value = phaseStats[phase]
      if (value == null)
        this.phaseStats[phase] = maxTurns;
      else
        this.phaseStats[phase] = value;
    }
    // Doing exactly what they say
    this.initializePlayers();
    this.initializeBoard();
    this.initializeEngines();
  }

  initializePlayers() {
    this.players = []
    this.playerHomeBaseCoords = [ // These are the incorrect initial coords of the players, their supposed to be in the corners not the center of the sides of the board
      [Math.round(this.boardSize / 2), 0],
      [Math.round(this.boardSize / 2), this.boardSize - 1],
      [0, Math.round(this.boardSize / 2)],
      [this.boardSize - 1, Math.round(this.boardSize / 2)]
    ]
    /* These are the correct coords for the player home worlds
    [
        [0,0],
        [this.boardSize, 0],
        [0, this.boardSize],
        [htis.boardSize, this.boardSize]
    ]
    */
    this.playerColors = [ // These are the colors of the actual game for the four players
      "rgb(255, 100, 70)" /* Red */,
      "rgb(75, 165, 225)" /* Sky Blue */,
      "rgb(255, 255, 100)" /* Darkish Yellow */,
      "rgb(50, 125, 5)" /* Dark Green */
    ] // CSS code for the colors in rgb codes
    for (let i = 0; i < this.playerStrats.length; i++) {
      let new_player = new Player(this.playerStrats[i], this.playerHomeBaseCoords[i], this.boardSize, i, this.playerColors[i])
      this.players.push(new_player);
    }
  }

  initializeLogger() {
    this.logger = new Logger(true, "sampleLogFile.txt");
  };

  initializeBoard() {
    this.board = new Board(); // Will probs need more args, but thats for later
    this.board.generateBoard(this.planetCoords, this.boardSize);
    for (let player of this.players){
      console.log("boogy down")
      this.board.grid[String(player.startingCoord)].planet.colony=player.homeBase;
    }
  }

  initializeEngines() { // All of these will probs need more args, but thats for later
    this.movementEngine = new MovementEngine();
    this.combatEngine = new CombatEngine();
    this.economicEngine = new EconomicEngine();
  }

  play() {
    while (/*!this.checkIfPlayerHasWon() &&*/ this.turn <= this.maxTurns) {
      this.generateState(); // Not even gonna bother right now
      this.completeTurn();
      this.turn += 1;
    }
  }

  /*checkIfPlayerHasWon() {
    later
  }*/

  completeTurn() { // Iterate through the phases
    for (let phase in this.phaseStats) {
      let value = this.phaseStats[phase];
      if (phase == "Movement") {
        this.generateState(null, "Movement");
        this.movementEngine.completeMovementPhase(this, value);
      }
      if (phase == "Combat" && this.turn <= value) {
        this.generateState(null, "Combat");
        this.combatEngine.completeCombatPhase(this);
      }
      if (phase == "Economic" && this.turn <= value) {
        this.generateState(null, "Economic");
        this.economicEngine.completeEconomicPhase(this);
      }
    }
  }

  generateState(currentPlayer, phase, movementRound = 0) {
    let movementState = this.movementEngine.generateMovementState(movementRound)
    this.gameState = {
      "turn": this.turn,
      "winner": null,
      "boardSize": this.boardSize,
      "phase": phase,
      "round": movementState["round"],
      "planets": [this.board.grid].map(function (hex) { if(hex.planet != null) { return hex.coord; } }),
      "unitData": {
        "Battleship": { "cost": 20, "hullSize": 3, "shipsizeNeeded": 5, "tactics": 5, "attack": 5, "defense": 2, "maintenance": 3 },
        "Battlecruiser": { "cost": 15, "hullSize": 2, "shipsizeNeeded": 4, "tactics": 4, "attack": 5, "defense": 1, "maintenance": 2 },
        "Cruiser": { "cost": 12, "hullSize": 2, "shipsizeNeeded": 3, "tactics": 3, "attack": 4, "defense": 1, "maintenance": 2 },
        "Destroyer": { "cost": 9, "hullSize": 1, "shipsizeNeeded": 2, "tactics": 2, "attack": 4, "defense": 0, "maintenance": 1 },
        "Dreadnaught": { "cost": 24, "hullSize": 3, "shipsizeNeeded": 6, "tactics": 5, "attack": 6, "defense": 3, "maintenance": 3 },
        "Scout": { "cost": 6, "hullSize": 1, "shipsizeNeeded": 1, "tactics": 1, "attack": 3, "defense": 0, "maintenance": 1 },
        "Shipyard": { "cost": 3, "hullSize": 1, "shipsizeNeeded": 1, "tactics": 3, "attack": 3, "defense": 0, "maintenance": 0 },
        "Decoy": { "cost": 1, "hullSize": 0, "shipsizeNeeded": 1, "tactics": 0, "attack": 0, "defense": 0, "maintenance": 0 },
        "Colonyship": { "cost": 8, "hullSize": 1, "shipsizeNeeded": 1, "tactics": 0, "attack": 0, "defense": 0, "maintenance": 0 },
        "Base": { "cost": 12, "hullSize": 3, "shipsizeNeeded": 2, "tactics": 5, "attack": 7, "defense": 2, "maintenance": 0 },
      },
      "technologyData": {
        "shipsize": [0, 10, 15, 20, 25, 30],
        "attack": [20, 30, 40],
        "defense": [20, 30, 40],
        "movement": [0, 20, 30, 40, 40, 40],
        "shipyard": [0, 20, 30],
        "terraform": [25],
        "tactics": [15, 20, 30],
        "exploration": [15]
      }
    }
    if(currentPlayer == null) {
      let temp = {}
      for (let playerNumber in this.players) {
        let player = this.players[playerNumber];
        temp[playerNumber] = player.generateState(true, (phase == "Combat"))
      } 
      this.gameState["players"] = temp
    } else {
      let temp = {}
      for (let playerNumber in this.players) {
        let player = this.players[playerNumber];
        temp[playerNumber] = player.generateState((currentPlayer == player), (phase == "Combat"))
      } 
      this.gameState["players"] = temp
    }
    //if (phase == "Combat")
      //this.gameState["combat"] = this.combat_engine.generateCombatArray()
    }
  }

module.exports = Game;