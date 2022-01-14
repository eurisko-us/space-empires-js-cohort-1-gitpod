const Colony = require("../src/units/colony.js")
const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")

class Player {
  constructor(strategy, coords, boardSize, playerIndex, playerColor) {
    this.strategy = strategy;
    this.creds = 20;
    this.boardSize = boardSize;
    this.technology = { "attack": 0, "defense": 0, "movement": 1, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };
    this.homeBase = new Colony(playerIndex, JSON.parse(JSON.stringify(coords)), null, this.technology, null, true);
    this.playerIndex = playerIndex;
    this.playerColor = playerColor;
    this.units = [];
    this.idNumber = 0;
    this.startingCoords = coords
  }

  build(game, unit) { // Unit is formatted as ["string of ship type", (tuple of coords)]
    let unitTypes = {"Scout": Scout, "Destroyer": Destroyer,/*, more fighting ships later */ "Colony Ship": ColonyShip}
    let possibleBuildPositions = this.getPossibleBuildCoords()
    let unitBuildCoords = unit[1][0] + ',' + unit[1][1]

    if (!possibleBuildPositions.includes(unitBuildCoords)) {
      throw `Player ${this.playerIndex} tried to cheat by building a ${unit[0]} in an invalid hex at ${unit[1]}`; 
    }
    
    let newShip = new unitTypes[unit[0]](this.playerIndex, JSON.parse(JSON.stringify(unit[1])), this.idNumber, this.technology, game.turn);
    this.idNumber += 1;
    this.units.push(newShip);
    game.board.grid[unit[1][0] + ',' + unit[1][1]].appendUnit(newShip);
  }

  getPossibleBuildCoords() {
    return [this.homeBase.coords[0] + ',' + this.homeBase.coords[1]]; // and colonies
  }

  upgrade(game, tech) { // Tech is formmated as a string
    // Upgrade Attack Technology
    let techMaxLevel = { "attack": 3, "defense": 3, "tactics": 3, "movement": 6, "unityard": 2, "terraform": 2, "unitsize": 6 }
    let techUpgradeValue = function(tech) { if (tech == "unityard") { return 0.5 } else { return 1.0 }}
    if (this.technology[tech] < techMaxLevel[tech]) {
        this.technology[tech] += techUpgradeValue(tech);
    }
  }

  generateState(isCurrentPlayer, inCombat) {
    let state = {
      "name": this.strategy.type,
      "homeworld": this.homeBase.generateState(isCurrentPlayer, inCombat),
      "num": this.playerIndex
    };
    let units = [];
    for (let unitIndex in this.units)
      units.push(this.units[unitIndex].generateState(isCurrentPlayer, inCombat));
    state["units"] = units;
    if (isCurrentPlayer || inCombat) {
      state["cp"] = this.creds;
      state["technology"] = this.technology;
    }
    return state;
  }
}
module.exports = Player;