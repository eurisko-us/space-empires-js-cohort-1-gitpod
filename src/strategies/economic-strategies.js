const DefaultStrategy = require("../strategies/default-strategy.js")

class SingleBuyStrategy extends DefaultStrategy {

    constructor(playerIndex) {
        super(playerIndex)
    }
    
    decidePurchases(hiddenGameState) {
      let homeCoords = hiddenGameState["players"][this.playerIndex]["homeworld"]["coords"];
      return ["defense", ["Scout", homeCoords]];
    }
}

module.exports = SingleBuyStrategy;