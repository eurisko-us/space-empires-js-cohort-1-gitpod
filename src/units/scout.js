const Unit = require("../../src/units/unit.js");
class Scout extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.attack = 3;
    this.defense = 0;
    this.armor = 1;
    this.fightingClass = 0;
    this.cost = 6;
    this.maintenance = 1;
    this.type = "Scout";
  }
}

module.exports = Scout;