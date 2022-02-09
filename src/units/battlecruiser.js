const Unit = require("../../src/units/unit.js");
class Battlecruiser extends Unit{
 
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
 
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
 
    this.attack = 5;
    this.defense = 2;
    this.armor = 2;
    this.fightingClass = 3;
    this.cost = 15;
    this.maintenance = 3;
    this.type = "Battlecruiser";
 
  }

}

module.exports = Battlecruiser;