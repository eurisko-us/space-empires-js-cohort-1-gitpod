const Unit = require("../../src/units/unit.js");
class Destroyer extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated = null) {
    super(playerIndex, initialCoord, id, technology, turnCreated);
    this.attack = 4;
    this.defense = 0;
    this.armor = 1
    this.fightingClass = 1;
    this.cost = 9;
    this.maintenance = 1;
    this.name = "Destroyer"
  }
}

module.exports = Destroyer;