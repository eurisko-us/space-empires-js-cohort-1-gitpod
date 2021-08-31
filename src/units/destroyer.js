class Destroyer {
  constructor(playerIndex, player, initialPosition, board, id, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, board, id, technology, turnCreated);
    this.attack = 4;
    this.defense = 0;
    this.cost = 9;
    this.fighting_class = 1
  }
}

module.exports = Destroyer;