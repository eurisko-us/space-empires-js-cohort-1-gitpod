const DefaultStrategy = require("../strategies/default-strategy.js")


class MoveRightStrat extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
    this.name = 'Move Right Strategy';
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 1, "y": 0};
  }
}

class MoveDownStrat extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
    this.name = 'Move Down Strategy';
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 0, "y": 1};
  }
}

class MoveLeftStrat extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
    this.name = 'Move Left Strategy';
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": -1, "y": 0};
  }
}

class MoveUpStrat extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
    this.name = 'Move Up Strategy';
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 0, "y": -1};
  }
}

module.exports.MoveRightStrat = MoveRightStrat;
module.exports.MoveDownStrat = MoveDownStrat;
module.exports.MoveLeftStrat = MoveLeftStrat;
module.exports.MoveUpStrat = MoveUpStrat;
