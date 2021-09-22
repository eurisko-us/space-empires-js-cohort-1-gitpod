const Unit = require("../../src/units/unit.js");
class Colony extends Unit {
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null, homeBase = false) {
    super(playerIndex, initialPosition, id, technology, turnCreated);
    this.homeBase = homeBase;
    if (this.homeBase) {
      this.name   = "Homeworld"
      this.income = 20;
    } else {
      this.name   = "Colony"
      this.income = 5;
    }
  }
}

module.exports = Colony;