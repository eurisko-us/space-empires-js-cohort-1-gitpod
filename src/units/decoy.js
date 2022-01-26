const Unit = require("../../src/units/unit.js");
class Decoy extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.cost = 1;
    this.type = "Decoy";
    this.canFight = false;
  }
}

module.exports = Decoy;