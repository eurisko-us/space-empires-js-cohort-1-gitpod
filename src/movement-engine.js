class MovementEngine {
  completeMovementPhase(game, numOfRounds = 3) {
    for (let round = 0; round < numOfRounds; round++) {
      for (let player of game.players) {
        for (let unit of player.units) {
          if (unit.canMove) {
            this.move(game, unit, round, player)
          }
        }
      }
    }
  }

  move(game, unit, round, player) {
    for (let tech = 0; tech < unit.getMovementTechnology(unit.technology["movement"])[round]; tech++) {
      game.generateState(player, "Movement");
      let translation = player.strategy.decideUnitMovement(unit.index, game.gameState);
      // Units can only move like a king in chess
      // But it's repeated multiple times a movement phase
      if (Math.abs(translation["x"]) + Math.abs(translation["y"]) <= 1) {
        // ^ If moving only 1 space ^
        let currentHex = this.getCurrentHex(game, unit.coords);
        if (this.isInSpace(unit.coords, translation) && !this.isEnemyInCurrentHex(currentHex, unit)) {
          unit.coords[0] += translation["x"];
          unit.coords[1] += translation["y"];
          
          unit.lastMoved = {'turn': game.turn, 'round': round, 'playerIndex': player.playerIndex};
          game.board.moveShip(unit, translation);
        }
      } else {
        // Else the wanted move is invalid, it throws an exception defined as such:
        throw `Player ${player.playerIndex}'s ${unit.type}, ${unit.id} tried to cheat with an invalid move, it tried to move to (${unit.coords["x"] + translation["x"]}, ${unit.coords["y"] + translation["y"]}) from (${unit.coords["x"]}, ${unit.coords["y"]}).`;
      }
    }
  }

  isInSpace(unit, translation) {
    let x = unit[0] + translation["x"]
    let y = unit[1] + translation["y"]
    return 0 <= x && x <= 12 && 0 <= y && y <= 12;
  }

  getCurrentHex(game, coord) {
    return game.board.grid[String(coord)]
  }

  isEnemyInCurrentHex(hex, currentUnit) {
    for (let unit of hex.units) {
      if (unit.playerIndex != currentUnit.playerIndex)
        return true;
    }
    return false;
  }

  generateMovementState(movementRound) {
    return {"round": movementRound}
  }
}

module.exports = MovementEngine;