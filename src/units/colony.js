const Unit = require("../../src/units/unit.js");
class Colony extends Unit {
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {
    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);
    if (this.homeBase) {
      this.type = 'Homeworld';
      this.income = 20;
    } else {
      this.type = 'Colony';
      this.income = 5;
    }
    this.canMove = false;
    this.coords = initialCoord;
  }
}

module.exports = Colony;