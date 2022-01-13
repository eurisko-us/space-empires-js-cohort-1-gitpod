const DefaultStrategy = require("../strategies/default-strategy.js")

class SingleBuyStrategy extends DefaultStrategy {

    constructor(playerIndex) {
      super(playerIndex);
      this.name = 'Single Buy Strategy';
    }
    
    decidePurchases(hiddenGameState) {
      let homeCoords = hiddenGameState["players"][this.playerIndex]["homeworld"]["coords"];
      return ["defense", ["Scout", homeCoords]];
    }

    decideRemoval(hiddenGameState) {
    return 0;
  } 
}

module.exports = SingleBuyStrategy;