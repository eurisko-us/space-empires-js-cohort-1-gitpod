const Unit = require("../../src/units/unit.js");
class MiningShip extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.cost = 5;
    this.type = "MiningShip";
    this.canFight = false;
  }
}

module.exports = MiningShip;