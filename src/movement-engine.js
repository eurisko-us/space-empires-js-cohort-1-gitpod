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
      game.generateState(phase = "Movement");
      let translation = player.strategy.decideUnitMovement(unit.index, game.gameState);
      // Units can only move like a king in chess
      // But it's repeated multiple times a movement phase
      if (Math.abs(translation["x"]) + Math.abs(translation["y"]) <= 1) {
        // ^ If moving only 1 space ^
        let currentHex = this.getCurrentHex(game, unit.coords);
        if (this.isInSpace(unit, translation) && !this.isEnemyInCurrentHex(currentHex, unit)) {
          unit.coords["x"] += translation["x"];
          unit.coords["y"] += translation["y"];
          
          unit.lastMoved = {'turn': game.turn, 'round': round, 'playerIndex': player.playerIndex};
          game.board.moveShip(unit, translation);
        }
      } else {
        // Else the wanted move is invalid, it throws an exception defined as such:
        throw `Player ${unit.player.playerIndex}'s ${unit.type}, ${unit.id} 
              tried to cheat with an invalid move, 
              it tried to move to (${unit.coords["x"] + translation["x"]}, ${unit.coords["y"] + translation["y"]}) 
              from (${unit.coords["x"]}, ${unit.coords["y"]}).`;
      }
    }
  }

  isInSpace(unit, translation) {
    let x = unit.coords["x"] + translation["x"]
    let y = unit.coords["y"] + translation["y"]
    return 0 <= x && x < 13 && 0 <= y && y < 13;
  }

  getCurrentHex(game, coord) {
    return game.board.grid[String([coord["x"], coord["y"]])]
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