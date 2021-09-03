class ColonyShip {
  constructor(playerIndex, player, initialPosition, board, id, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, board, id, technology, turnCreated);
    this.cost = 8;
  }
}

module.exports = ColonyShip;