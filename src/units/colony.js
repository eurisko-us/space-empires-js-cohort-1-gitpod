class Colony {
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null, homeBase = False) {
    Unit.call(this, playerIndex, initialPosition, id, technology, turnCreated);
    this.homeBase = homeBase;
    if (this.homeBase) {
      this.income = 20;
    } else {
      this.income = 5;
    }
  }
}

module.exports = ColonyShip;