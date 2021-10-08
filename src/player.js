const Colony = require("../src/units/colony.js")
const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")

class Player {
  constructor(strategy, coord, boardSize, playerIndex, playerColor) {
    this.strategy = new strategy(playerIndex);
    this.creds = 20;
    this.boardSize = boardSize;
    this.technology = { "attack": 0, "defense": 0, "movement": 1, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };
    this.homeBase = new Colony(playerIndex, coord, 0, this.technology, 0, true);
    this.playerIndex = playerIndex;
    this.playerColor = playerColor;
    this.units = [];
    this.id_number = 0;
    this.startingCoord = coord
  }

  build(game, unit) { // Unit is formatted as ["string of ship type", (tuple of coord)]
    let unitTypes = {"Scout": Scout, "Destroyer": Destroyer,/*, more fighting ships later */ "Colony Ship": ColonyShip}
    let possibleBuildPositions = this.getPossibleBuildCoords()
    let unitBuildCoords = JSON.stringify(unit[1])
    if (!possibleBuildPositions.includes(unitBuildCoords))
      throw `Player ${this.playerIndex} tried to cheat by 
            building a ${unit[0]} in an invalid hex at ${unit[1]}`; 
    let newShip = new unitTypes[unit[0]](this.playerIndex, unit[1], this.id_number, this.technology, game.turn);
    this.id_number += 1;
    this.units.push(newShip);
    game.board.grid[String(unit[1])].appendUnit(newShip);
  }

  getPossibleBuildCoords() {
    return [JSON.stringify(this.homeBase.coords)];
  }

  upgrade(game, tech) { // Tech is formmated as a string
    // Upgrade Attack Technology
    let techMaxLevel = { "attack": 3, "defense": 3, "tactics": 3, "movement": 6, "shipyard": 2, "terraform": 2, "shipsize": 6 }
    let techUpgradeValue = function(tech) { if (tech == "shipyard") { return 0.5 } else { return 1.0 }}
    if (this.technology[tech] < techMaxLevel[tech]) {
        this.technology[tech] += techUpgradeValue(tech);
        if (game.print_state_obsolete)
            console.log(`Player ${this.player_number} upgraded their ${tech} tech from ${this.technology[tech] - 1} to ${this.technology[tech]}`);
    }
  }

  generateState(isCurrentPlayer, inCombat) {
    if (isCurrentPlayer || inCombat) {
      return {
        'name': this.strategy.name,
        'cp': this.creds,
        'units': this.units,
        //'colonies': [colony.generate_state(current_player, combat) for colony in sorted([ship for ship in this..ships if ship.type == 'Colony'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        //'ship_yards': [ship_yard.generate_state(current_player, combat) for ship_yard in sorted([ship for ship in this..ships if ship.type == 'Shipyard'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        'technology': this.technology,
        'homeworld': this.homeBase.generateState(isCurrentPlayer, inCombat),
        'num': this.playerNumber
      }
    } else {
      return {
        'name': this.strategy.name,
        'units': this.units,
        //'colonies': [colony.generate_state(current_player, combat) for colony in sorted([ship for ship in this..ships if ship.type == 'Colony'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        //'ship_yards': [ship_yard.generate_state(current_player, combat) for ship_yard in sorted([ship for ship in this..ships if ship.type == 'Shipyard'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        'homeworld': this.homeBase.generateState(isCurrentPlayer, inCombat),
        'num': this.playerNumber
      }
    }
  }
}
module.exports = Player;