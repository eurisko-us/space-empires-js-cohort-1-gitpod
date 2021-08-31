class Unit {
  constructor(playerIndex, initialPosition, board, id, technology, turnCreated = null) {
    this.playerIndex = playerIndex
    this.technology = technology;
    this.position = initialPosition;
    this.id = id;
    this.turnCreated = turnCreated;
    this.canMove = true;
    this.canFight = true;
  }

  getMovementTechnology(shipMovementLevel) {
    if (shipMovementLevel == 1) {
      return [1, 1, 1]
    } else if (shipMovementLevel == 2) {
      return [1, 1, 2]
    } else if (shipMovementLevel == 3) {
      return [1, 2, 2]
    } else if (shipMovementLevel == 4) {
      return [2, 2, 2]
    } else if (shipMovementLevel == 5) {
      return [2, 2, 3]
    } else if (shipMovementLevel == 5) {
      return [2, 3, 3]
    }
  }

  generateState(currentPlayer, isCurrentPlayer, inCombat) {
    if (currentPlayer || inCombat) {
      return {
        'num': this.id,
        'coords': (this.x, this.y),
        'type': this.type,
        'hitsLeft': this.hitsLeft,
        'technology': this.technology,
        'playerIndex': currentPlayer.playerIndex,
        'turnCreated': this.turnCreated
      }
    } else {
      return {
        'num': this.id,
        'coords': this.position,
        'playerIndex': currentPlayer.playerIndex,
      }
    }
  }
}

module.exports = Unit;