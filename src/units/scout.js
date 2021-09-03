class Scout {
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, id, technology, turnCreated);
    this.attack = 3;
    this.defense = 0;
    this.armor = 1;
    this.fightingClass = 0;
    this.cost = 6;
    this.maintenance = 1;
  }
}

module.exports = Scout;