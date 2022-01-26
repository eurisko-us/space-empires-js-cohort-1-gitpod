const Unit = require("../../src/units/unit.js");
class Base extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.attack = 7;
    this.defense = 3;
    this.armor = 2;
    this.fightingClass = 4;
    this.cost = 12;
    this.maintenance = 0;
    this.type = "Base";
    this.canMove = false
  }
}

module.exports = Base;