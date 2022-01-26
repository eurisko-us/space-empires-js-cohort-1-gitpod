const Unit = require("../../src/units/unit.js");
class ShipYard extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.attack = 3;
    this.defense = 0;
    this.armor = 1;
    this.fightingClass = 2;
    this.cost = 6;
    this.maintenance = 0;
    this.type = "ShipYard";
  }
}

module.exports = ShipYard;