const MovementEngine = require("movement_engine.js");
const CombatEngine = require("combat_engine.js");
const EconomicEngine = require("economic_engine.js");
const Board = require("board.js");
const Player = require("player.js");
const Unit = require("units/unit.js");
const ColonyShip = require("units/colony_ship.js");
const Destroyer = require("units/destroyer.js");
const Scout = require("units/scout.js");

class Game {
  constructor(playerStrats, boardSize = 13, phaseStats = { "Economic": null, "Movement": 3, "Combat": null }, maxTurns = 100) {
    this.playerStrats = playerStrats;
    this.boardSize = boardSize;
    this.turn = 1;
    this.maxTurns = maxTurns;
    // `phaseStats` is when we want only 
    // For example 1 economic phase for the whole game,
    // We would pass in `"economic": 1` in phase stats
    // We could also reduce the number of movement rounds there are in the movement phase
    // And also limit the combat similar to the econonic phase
    this.phaseStats = {};
    for (phase, value of phaseStats) {
      if (value == null)
        this.phaseStats[phase] = maxTurns;
      else
        this.phaseStats[phase] = value;
    }
    // Doing exactly what they say
    initializePlayers();
    initializeBoard();
    initializeEngines();
  }

  initializePlayers() {
    this.players = []
    this.playerHomeBasePositions = [ // These are the incorrect initial positions of the players, their supposed to be in the corners not the center of the sides of the board
      [Math.round(this.boardSize / 2), 0],
      [Math.round(this.boardSize / 2), this.boardSize - 1],
      [0, Math.round(this.boardSize / 2)],
      [this.boardSize - 1, Math.round(this.boardSize / 2)]
    ]
    /* These are the correct positions for the player home worlds
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
    for (let i = 0; i < this.playerStrats.length(); i++) {
      this.players.append(Player(this.playerStrats[i], this.playerHomeBasePositions[i], this.boardSize, i, this.playerColors[i]));
    }
  }

  initializeBoard() {
    this.board = new Board(this.boardSize); // Will probs need more args, but thats for later
  }

  initializeEngines() { // All of these will probs need more args, but thats for later
    this.movementEngine = new MovementEngine();
    this.combatEngine = new CombatEngine();
    this.economicEngine = new EconomicEngine();
  }

  play() {
    while (!checkIfPlayerHasWon() && this.turn <= this.maxTurns) {
      this.generateState(); // Not even gonna bother right now
      this.completeTurn();
      this.turn += 1;
    }
  }

  completeTurn() { // Iterate through the phases
    for (let phase in this.phaseStats) {
      let value = this.phaseStats[phase];
      if (phase == "Movement") {
        this.generateState(phase = "Movement");
        this.movementEngine.completeMovementPhase(this, value);
      }
      if (phase == "Combat" && this.turn <= value) {
        this.generateState(phase = "Combat");
        this.combatEngine.completeCombatPhase(this);
      }
      if (phase == "Economic" && this.turn <= value) {
        this.generateState(phase = "Economic");
        this.economicEngine.completeEconomicPhase(this);
      }
    }
  }
}

module.exports = Game;