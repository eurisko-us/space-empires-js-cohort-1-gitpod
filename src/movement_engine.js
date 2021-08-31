class MovementEngine {
  completeMovementPhase(game, numOfRounds = 3) {
    for (let round = 0; round < numOfRounds; round++) {
      for (let player of game.players) {
        for (let ship of player.ships) {
          if (ship.can_move)
            this.move(game, ship)
        }
      }
    }
  }

  move(game, ship) {
    for (let tech = 0; tech < ship.getMovementTechnology(ship.technology["movement"])[round]; tech++) {
      game.generateState(phase = "Movement");
      translation = ship.player.strategy.decideShipMovement(game.gameState, ship.index);
      // Ships can only move like a king in chess
      // But it's repeated multiple times a movement phase
      if (Math.abs(translation["x"]) + Math.abs(translation["y"]) <= 1) {
        // ^ If moving only 1 space ^
        ship.position["x"] += translation["x"];
        ship.position["y"] += translation["y"];
      } else {
        // Else the wanted move is invalid, it throws an exception defined as such:
        throw `Player ${ship.player.playerIndex}'s ${ship.type}, ${ship.id} 
              tried to cheat with an invalid move, 
              it tried to move to (${ship.x + translation["x"]}, ${ship.y + translation["y"]}) 
              from (${ship.x}, ${ship.y}).`;
      }
    }
  }
}

module.exports = MovementEngine;