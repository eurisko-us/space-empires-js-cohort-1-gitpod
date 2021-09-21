const Unit = require("../units/unit.js");

class Colony extends Unit {
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null, homeBase = false) {
    super(playerIndex, initialPosition, id, technology, turnCreated);
    this.homeBase = homeBase;
    if (this.homeBase) {
      this.income = 20;
    } else {
      this.income = 5;
    }
  }
}

module.exports = Colony;