const DefaultStrategy = require("../strategies/default-strategy.js")

class StratOne extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 0, "y": 1};
  }

  decidePurchases(hiddenGameState) {
    let homeCoords = hiddenGameState["players"][this.playerIndex]["homeworld"]["coords"];
    return ["attack", ["Scout", homeCoords], "tactics"];
  }

}

class StratTwo extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
  }

  decideUnitMovement(unitIndex, gameState) {
    return {"x": 0, "y": -1};
  }

  decidePurchases(hiddenGameState) {
    let homeCoords = hiddenGameState["players"][this.playerIndex]["homeworld"]["coords"];
    return ["defense", ["Scout", homeCoords], "movement"];
  }

}

module.exports.StratOne = StratOne;
module.exports.StratTwo = StratTwo;