const Unit = require("../../src/units/unit.js");
class ColonyShip extends Unit{
  
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
  
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.cost = 8;
    this.type = "ColonyShip";
    this.canFight = false;
  
  }

}

module.exports = ColonyShip;