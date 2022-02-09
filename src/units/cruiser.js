const Unit = require("../../src/units/unit.js");
class Cruiser extends Unit{

  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {

    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);

    this.attack = 4;
    this.defense = 1;
    this.armor = 2;
    this.fightingClass = 2;
    this.cost = 12;
    this.maintenance = 2;
    this.type = "Cruiser";

  }

}

module.exports = Cruiser;