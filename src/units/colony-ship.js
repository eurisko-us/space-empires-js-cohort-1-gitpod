class ColonyShip {
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, id, technology, turnCreated);
    this.cost = 8;
  }
}

module.exports = ColonyShip;