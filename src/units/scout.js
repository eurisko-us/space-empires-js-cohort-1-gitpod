class Scout {
  constructor(playerIndex, initialPosition, board, id, technology, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, board, id, technology, turnCreated);
    this.attack = 3;
    this.defense = 0;
    this.armor = 1
    this.fightingClass = 0;
    this.cost = 6;
  }
}

module.exports = Scout;