const DefaultStrategy = require("../strategies/default-strategy.js")

class MoveRightStrategy extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 1, "y": 0};
  }
}

class MoveDownStrategy extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 0, "y": 1};
  }
}

class MoveLeftStrategy extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": -1, "y": 0};
  }
}

class MoveUpStrategy extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 0, "y": -1};
  }
}

module.exports = MoveRightStrategy;
module.exports = MoveDownStrategy;
module.exports = MoveLeftStrategy;
module.exports = MoveUpStrategy;