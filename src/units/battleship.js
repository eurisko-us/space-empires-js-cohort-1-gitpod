const Unit = require("../../src/units/unit.js");
class Battleship extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.attack = 5;
    this.defense = 2;
    this.armor = 3;
    this.fightingClass = 4;
    this.cost = 20;
    this.maintenance = 3;
    this.type = "Battleship";
  }
}

module.exports = Battleship;