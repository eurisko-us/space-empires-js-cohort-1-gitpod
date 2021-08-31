class Scout {
  constructor(playerIndex, initialPosition, board, id, technology, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, board, id, technology, turnCreated);
    this.attack = 3;
    this.defense = 0;
    this.cost = 6;
    this.fighting_class = 0
  }
}

module.exports = Scout;