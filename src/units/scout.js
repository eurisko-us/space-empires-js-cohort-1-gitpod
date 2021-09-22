const Unit = require("../units/unit.js");

class Scout extends Unit {
  constructor(playerIndex, initialPosition, id, technology, turnCreated = null) {
    super(playerIndex, initialPosition, id, technology, turnCreated);
    this.attack = 3;
    this.defense = 0;
    this.armor = 1;
    this.fightingClass = 0;
    this.cost = 6;
    this.maintenance = 1;
    this.name = "Scout";
  }
}

module.exports = Scout;