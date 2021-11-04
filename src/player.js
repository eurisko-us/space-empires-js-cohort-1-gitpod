const Colony = require("../src/units/colony.js")
const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyUnit = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")

class Player {
  constructor(strategy, coord, boardSize, playerIndex, playerColor) {
    this.strategy = new strategy(playerIndex);
    this.creds = 20;
    this.boardSize = boardSize;
    this.technology = { "attack": 0, "defense": 0, "movement": 1, "unitsize": 1, "unityard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };
    this.homeBase = new Colony(playerIndex, JSON.parse(JSON.stringify(coord)), null, this.technology, null, true);
    this.playerIndex = playerIndex;
    this.playerColor = playerColor;
    this.units = [];
    this.idNumber = 0;
    this.startingCoord = coord
  }

  build(game, unit) { // Unit is formatted as ["string of unit type", (tuple of coord)]
    let unitTypes = {"Scout": Scout, "Destroyer": Destroyer,/*, more fighting units later */ "Colony Unit": ColonyUnit}
    let possibleBuildPositions = this.getPossibleBuildCoords()
    let unitBuildCoords = JSON.stringify(unit[1])
    if (!possibleBuildPositions.includes(unitBuildCoords))
      throw `Player ${this.playerIndex} tried to cheat by 
            building a ${unit[0]} in an invalid hex at ${unit[1]}`; 
    let newUnit = new unitTypes[unit[0]](this.playerIndex, JSON.parse(JSON.stringify(unit[1])), this.idNumber, this.technology, game.turn);
    this.idNumber += 1;
    this.units.push(newUnit);
    game.board.grid[String(unit[1])].appendUnit(newUnit);
  }

  getPossibleBuildCoords() {
    return [JSON.stringify(this.homeBase.coords)];
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
    if (isCurrentPlayer || inCombat) {
      return {
        'name': this.strategy.name,
        'cp': this.creds,
        'homeworld': this.homeBase.generateState(isCurrentPlayer, inCombat),
        'units': this.units.map(function (unit) { return unit.generateState(isCurrentPlayer, inCombat); }),
        //'colonies': [colony.generateState(isCurrentPlayer, combat) for colony in sorted([unit for unit in this..units if unit.type == 'Colony'], key=lambda unit: (unit.technology['tactics'], -unit.player.playerNumber, -unit.ID), reverse=True)],
        //'ship-yards': [ship-yards.generateState(isCurrentPlayer, combat) for ship-yards in sorted([unit for unit in this..units if unit.type == 'Unityard'], key=lambda unit: (unit.technology['tactics'], -unit.player.playerNumber, -unit.ID), reverse=True)],
        'technology': this.technology,
        
        'num': this.playerIndex
      }
    } else {
      return {
        'name': this.strategy.name,
        'homeworld': this.homeBase.generateState(isCurrentPlayer, inCombat),
        'units': this.units.map(function (unit) { return unit.generateState(isCurrentPlayer, inCombat); }),
        //'colonies': [colony.generateState(isCurrentPlayer, combat) for colony in sorted([unit for unit in this..units if unit.type == 'Colony'], key=lambda unit: (unit.technology['tactics'], -unit.player.playerNumber, -unit.ID), reverse=True)],
        //'ship-yards': [ship-yards.generateState(isCurrentPlayer, combat) for ship-yards in sorted([unit for unit in this..units if unit.type == 'Unityard'], key=lambda unit: (unit.technology['tactics'], -unit.player.playerNumber, -unit.ID), reverse=True)],
        'num': this.playerNumber
      }
    }
  }
}
module.exports = Player;