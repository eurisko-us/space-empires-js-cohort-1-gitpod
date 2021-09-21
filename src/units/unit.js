class Unit {
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null) {
    this.playerIndex = playerIndex
    this.technology = technology;
    this.position = initialPosition;
    this.id = id;
    this.turnCreated = turnCreated;
    this.canMove = true;
    this.canFight = true;
    this.attack = 0;
    this.defence = 0;
    this.armor = 0;
    this.damage = 0;
    this.fightingClass = 0;
    this.cost = 0;
    this.maintenance = 0;
    this.lastMoved = {"turn": -1, "round": -1, "playerIndex": playerIndex};
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

  generateState(currentPlayerIndex, isCurrentPlayer, inCombat) {
    if (isCurrentPlayer || inCombat) {
      return {
        "num": this.id,
        "coords": this.position,
        "type": this.type,
        "hitsLeft": this.hitsLeft,
        "technology": this.technology,
        "playerIndex": currentPlayerIndex,
        "turnCreated": this.turnCreated,
        "lastMoved": this.lastMoved
      }
    } else {
      return {
        "num": this.id,
        "coords": this.position,
        "playerIndex": currentPlayerIndex,
        "lastMoved": this.lastMoved
      }
    }
  }

  destroy(game) {
    // Remove current unit's player's refernce from the player's `units` array
    game.players[this.playerIndex].units.splice(game.players[this.playerIndex].units.indexOf(unit));
  }
}

module.exports = Unit;