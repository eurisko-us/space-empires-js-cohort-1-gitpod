class MovementEngine {
    constructor(game, board) {
        this.game = game
        this.board = board
    }

    completeMovements(numOfRounds) {
        for (var round = 0; round < numOfRounds; round++) {
            for (player of this.game.players) {
                for (ship of player.ships) {
                    if (ship.can_move)
                        this.move(ship)
                }
            }
        }
    }

    move(ship) {
        for (var tech = 0; tech < ship.getMovementTechnology(ship.technology["movement"])[round]; tech++) {
            this.game.generateState(phase = "Movement");
            translation = ship.player.strategy.decideShipMovement(this.game.gameState, ship.index);
            // Ships can only move like a king in chess
            // But it's repeated multiple times a movement phase
            if (Math.abs(translation["x"]) + Math.abs(translation["y"]) <= 1) {
                ship.position["x"] += translation["x"];
                ship.position["y"] += translation["y"];
            } else {
                // If the wanted move is invalid, it throws an exception defined as such:
                throw `Player ${ship.player.playerIndex}'s ${ship.type}, ${ship.id} 
                    tried to cheat with an invalid move, 
                    it tried to move to (${ship.x + translation["x"]}, ${ship.y + translation["y"]}) 
                    from (${ship.x}, ${ship.y}).`;
            }
        }
    }

    
}