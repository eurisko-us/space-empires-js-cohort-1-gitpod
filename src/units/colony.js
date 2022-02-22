const Unit = require("../../src/units/unit.js");
class Colony extends Unit {

  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {

    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    this.type = 'Colony';
    this.income = 5;
    this.canMove = false;
    this.canFight = false;
    
    if (this.homeBase) {
      
      this.type = 'Homeworld';
      this.income = 20;

    }

  }

}

module.exports = Colony;