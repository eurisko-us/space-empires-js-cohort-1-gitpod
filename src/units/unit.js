class Unit {
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    this.playerIndex = playerIndex;
    this.technology = technology;
    this.coords = initialCoord;
    this.id = 0;
    if (id != null) {
      this.id = id;
    }
    this.turnCreated = turnCreated;
    this.canMove = true;
    this.canFight = true;
    this.attack = 0;
    this.defence = 0;
    this.armor = 0;
    this.damage = 0;
    this.fightingClass = 0;
    this.cost = 0;
    this.type = "Unit";
    this.maintenance = 0;
    this.lastMoved = {"turn": -1, "round": -1, "playerIndex": playerIndex};
    this.homeBase = homeBase;
  }

  getMovementTechnology(unitMovementLevel) {
    if (unitMovementLevel == 1) {
      return [1, 1, 1];
    } else if (unitMovementLevel == 2) {
      return [1, 1, 2];
    } else if (unitMovementLevel == 3) {
      return [1, 2, 2];
    } else if (unitMovementLevel == 4) {
      return [2, 2, 2];
    } else if (unitMovementLevel == 5) {
      return [2, 2, 3];
    } else if (unitMovementLevel == 6) {
      return [2, 3, 3];
    }
  }

  generateState(isCurrentPlayer, inCombat) {
    if (isCurrentPlayer || inCombat) {
      return {
        "num": this.id,
        "coords": this.coords,
        "type": this.type,
        "hitsLeft": this.hitsLeft,
        "technology": this.technology,
        "playerIndex": this.playerIndex,
        "turnCreated": this.turnCreated,
        "lastMoved": this.lastMoved
      };
    } else {
      return {
        "num": this.id,
        "coords": this.coords,
        "playerIndex": this.playerIndex,
        "lastMoved": this.lastMoved
      };
    }
  }

  destroy(game) {
    // Remove current unit's player's refernce from the player's `units` array
    game.players[this.playerIndex].units.splice(game.players[this.playerIndex].units.indexOf(this));
  }
}

module.exports = Unit;