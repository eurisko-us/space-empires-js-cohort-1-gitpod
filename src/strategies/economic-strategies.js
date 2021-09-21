const DefaultStrategy = require("../strategies/default-strategy.js")

class SingleBuyStrategy extends DefaultStrategy {

    constructor(playerIndex) {
        super(playerIndex)
    }
    
    decidePurchases(hiddenGameState) {
      return ["movement"];
    }
}

module.exports = SingleBuyStrategy;