class Unit {
    constructor(player, initialPosition, board, id, turnCreated = null) {
        this.player = player;
        this.position = initialPosition;
        this.board = board;
        this.id = id;
        this.turnCreated = turnCreated;
        this.attack = 0;
        this.defense = 0;
        this.canMove = true;
        this.canFight = true;
        this.lastMoved = player.game.turn

    }

    getMovementTechnology(ship_movement_level){
        if (ship_movement_level == 1) {
            return [1, 1, 1]
        } else if (ship_movement_level == 2) {
            return [1, 1, 2]
        } else if (ship_movement_level == 3) {
            return [1, 2, 2]
        } else if (ship_movement_level == 4) {
            return [2, 2, 2]
        } else if (ship_movement_level == 5) {
            return [2, 2, 3]
        } else if (ship_movement_level == 5) {
            return [2, 3, 3]
        }
    }

    generateState(currentPlayer, combat) {
        if (currentPlayer || combat) {
            return {
                'num': this.id,
                'coords': (this.x, this.y),
                'type': this.type,
                'hitsLeft': this.hitsLeft,
                'technology': this.technology,
                'playerIndex': this.player.playerIndex,
                'turnCreated': this.turnCreated
            }
        } else {
            return {
                'num': this.id,
                'coords': this.position,
                'playerIndex': this.player.playerIndex,
            }
        }
    }
}