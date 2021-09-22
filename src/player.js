const Colony = require("../src/units/colony.js")
const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")

class Player {
  constructor(strategy, position, boardSize, playerIndex, playerColor) {
    this.strategy = new strategy(playerIndex);
    this.creds = 27;
    this.boardSize = boardSize;
    this.technology = { "attack": 0, "defense": 0, "movement": 1, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };
    this.homeBase = new Colony(playerIndex, position, 0, this.technology, 0, true);
    this.playerIndex = playerIndex;
    this.playerColor = playerColor;
    this.units = []
  }

  build(game, unit) { // Unit is formatted as ["string of ship type", (tuple of position)]
    let unitTypes = {"Scout": Scout, "Destroyer": Destroyer,/*, more fighting ships later */ "Colony Ship": ColonyShip}
    if (!this.getPossibleBuildPositions().includes(unit[1]))
      throw `Player ${this.playerIndex} tried to cheat by 
            building a ${unit[0]} in an invalid hex at ${unit[1]}`; 
    let newShip = new unitTypes[unit[0]](/* stuff */);
    this.units.push(newShip);
  }

  getPossibleBuildPositions(shipCoords) {
    return [this.homeBase.position];
  }


  upgrade(game, tech) { // Tech is formmated as a string
    // Upgrade Attack Technology
    if (tech == "attack" && this.technology["attack"] < 3) {
      this.technology["attack"] += 1;
      if (game.print_state_obsolete)
        console.log(`Player ${this.player_number} upgraded their attack strength from ${this.technology["attack"] - 1} to ${this.technology["attack"]}`);
    }
    // Upgrade Defense Technology
    else if (tech == "defense" && this.technology["defense"] < 3) {
      this.technology["defense"] += 1;
      if (game.print_state_obsolete)
        console.log(`Player ${this.player_number} upgraded their defense strength from ${this.technology["defense"] - 1} to ${this.technology["defense"]}`);
    }
    // Upgrade Tactics Technology
    else if (tech == "tactics" && this.technology["tactics"] < 3) {
      this.technology["tactics"] += 1;
      if (game.print_state_obsolete)
        console.log(`Player ${this.player_number} upgraded their fighting class from ${this.technology["tactics"] - 1} to ${this.technology["tactics"]}`);
    }
    // Upgrade Movement Technology
    else if (tech == "movement" && this.technology["movement"] < 6) {
      this.technology["movement"] += 1;
      if (game.print_state_obsolete)
        console.log(`Player ${this.player_number} upgraded their movement speed from ${this.technology["movement"] - 1} to ${this.technology["movement"]}`);
    }
    // Upgrade Shipyard Technology
    else if (tech == "shipyard" && this.technology["shipyard"] < 2) {
      this.technology["shipyard"] += 0.5;
      if (game.print_state_obsolete)
        console.log(`Player ${this.player_number} upgraded their ship-yard"s building size from ${this.technology["shipyard"] - 0.5} to ${this.technology["shipyard"]}`);
    }
    // Upgrade Terraform Technology
    else if (tech == "terraform" && this.technology["terraform"] < 2) {
      this.technology["terraform"] += 1;
      if (game.print_state_obsolete)
        console.log(`Player ${this.player_number} upgraded their ablility to terraform from ${this.technology["terraform"] - 1} to ${this.technology["terraform"]}`);
    }
    // Upgrade Ship Size Technology 
    else if (tech == "shipsize" && this.technology["shipsize"] < 6) {
      this.technology["shipsize"] += 1;
      if (game.print_state_obsolete)
        console.log(`Player ${this.player_number} upgraded their max building size from ${this.technology["shipsize"] - 1} to ${this.technology["shipsize"]}`);
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