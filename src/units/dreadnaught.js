const Unit = require("../../src/units/unit.js");
class Dreadnaught extends Unit{

  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {

    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);

    this.attack = 6;
    this.defense = 3;
    this.armor = 3;
    this.fightingClass = 4;
    this.cost = 24;
    this.maintenance = 4;
    this.type = "Dreadnaught";

  }

}

module.exports = Dreadnaught;