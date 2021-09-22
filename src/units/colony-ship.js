const Unit = require("../../src/units/unit.js");
class ColonyShip extends Unit{
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null) {
    super(playerIndex, initialPosition, id, technology, turnCreated);
    this.cost = 8;
  }
}

module.exports = ColonyShip;