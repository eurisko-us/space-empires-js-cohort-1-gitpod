const Unit = require("../../src/units/unit.js");
class ColonyUnit extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.cost = 8;
    this.type = "Colonyunit";
  }
}

module.exports = ColonyUnit;