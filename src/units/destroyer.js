class Destroyer {
  constructor(playerIndex, player, initialPosition, board, id, turnCreated = null) {
    Unit.call(this, playerIndex, initialPosition, board, id, technology, turnCreated);
    this.attack = 4;
    this.defense = 0;
    this.armor = 1
    this.fightingClass = 1;
    this.cost = 9;
    this.maintenance = 1;
  }
}

module.exports = Destroyer;