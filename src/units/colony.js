class Colony {
  constructor(playerIndex, player, initialPosition, board, id, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, board, id, technology, turnCreated);
  }
}

module.exports = ColonyShip;