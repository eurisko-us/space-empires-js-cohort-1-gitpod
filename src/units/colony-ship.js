const Unit = require("../../src/units/unit.js");
class ColonyShip extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated = null) {
    super(playerIndex, initialCoord, id, technology, turnCreated);
    this.cost = 8;
    this.name = "Colonyship"
  }
}

module.exports = ColonyShip;