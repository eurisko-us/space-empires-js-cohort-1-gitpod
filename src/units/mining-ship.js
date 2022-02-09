const Unit = require("../../src/units/unit.js");
class MiningShip extends Unit{
  constructor(playerIndex, initialCoord, id, technology, turnCreated, homeBase) {

    super(playerIndex, initialCoord, id, technology, turnCreated, homeBase);

    this.cost = 5;
    this.type = "MiningShip";
    this.canFight = false;
    this.asteroid = null;

  }

  generateState(isCurrentPlayer, inCombat) {

    if (isCurrentPlayer || inCombat) {

      return {
        "num": this.id,
        "coords": this.coords,
        "type": this.type,
        "hitsLeft": this.armor - this.damage,
        "technology": this.technology,
        "playerIndex": this.playerIndex,
        "turnCreated": this.turnCreated,
        "lastMoved": this.lastMoved,
        "asteroid": JSON.parse(JSON.stringify(this.asteroid))
      };

    } else {

      return {
        "num": this.id,
        "coords": this.coords,
        "playerIndex": this.playerIndex,
        "lastMoved": this.lastMoved,
        "asteroid": JSON.parse(JSON.stringify(this.asteroid))
      };
      
    }
  }
}

module.exports = MiningShip;