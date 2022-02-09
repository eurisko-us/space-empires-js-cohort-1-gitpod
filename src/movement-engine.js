class MovementEngine {
  completeMovementRound(game, round) {

    for (let player of game.players) {

      for (let unit of player.units) {

        let immovableShipTypes = ['Shipyard', 'Base', 'Homeworld', 'Colony'];

        if (!immovableShipTypes.includes(unit.type) && !unit.homeBase && unit.canMove) { this.move(game, unit, round, player); }

      }

    }

  }

  move(game, unit, round, player) {

    let unitMovementTechnologyLevel = unit.technology["movement"];
    let unitMovementTechnology = unit.getMovementTechnology(unitMovementTechnologyLevel);
    let unitMovementTechnologyCurrentRound = unitMovementTechnology[round];

    for (let tech = 0; tech < unitMovementTechnologyCurrentRound; tech++) {

      game.generateState(player, "Movement");
      let translation = player.strategy.decideUnitMovement(unit.index, game.gameState);
      // Units can only move like a king in chess
      // But it's repeated multiple times a movement phase and it's numerous rounds

      let shipInSpace = this.isInSpace(unit.coords, translation);
      
      if (Math.abs(translation["x"]) + Math.abs(translation["y"]) <= 1 && shipInSpace) { // If moving only 1 space and ship in space after translation
        
        let currentHex = this.getCurrentHex(game, unit.coords);
        let enemyInCurrentHex = this.isEnemyInCurrentHex(currentHex, unit);
        let possibleColonization = currentHex.planet != null && currentHex.planet.colony == null && unit.type == "ColonyShip"; // as well as check for barren

        if (!possibleColonization && !enemyInCurrentHex) { // no enemy, and no possible colonization, then move

          unit.coords[0] += translation["x"];
          unit.coords[1] += translation["y"];
          unit.lastMoved = {'turn': game.turn, 'round': round, 'playerIndex': player.playerIndex};
          game.board.moveShip(unit, translation);

        }

      } else { throw `Player ${player.playerIndex}'s ${unit.type}, ${unit.id} tried to cheat with an invalid move, it tried to move to (${unit.coords["x"] + translation["x"]}, ${unit.coords["y"] + translation["y"]}) from (${unit.coords["x"]}, ${unit.coords["y"]}).`; } // Else the wanted move is invalid, it throws an exception defined as such:
    }

  }

  isInSpace(unit, translation) {

    let x = unit[0] + translation["x"];
    let y = unit[1] + translation["y"];
    return 0 <= x && x <= 12 && 0 <= y && y <= 12;

  }

  getCurrentHex(game, coords) { return game.board.grid[coords[0] + ',' + coords[1]]; }

  isEnemyInCurrentHex(hex, currentUnit) {

    for (let unit of hex.units) { if (unit.playerIndex != currentUnit.playerIndex) { return true; } }

    return false;

  }

  generateMovementState(movementRound) { return {"round": movementRound}; } // also the ships moved but too lazy to do right now -ghosts of past, present, & future, colby

}

module.exports = MovementEngine;