const DefaultStrategy = require("default-strategy.js")

class MoveRightStrategy {
  constructor(playerIndex)
    DefaultStrategy.call(playerIndex)

  decideShipMovement(unitIndex, gameState)
    return (1,0)
}

class MoveDownStrategy {
  constructor(playerIndex)
    DefaultStrategy.call(playerIndex)

  decideShipMovement(unitIndex, gameState)
    return (0,1)
}

class MoveLeftStrategy {
  constructor(playerIndex)
    DefaultStrategy.call(playerIndex)

  decideShipMovement(unitIndex, gameState)
    return (-1,0)
}

class MoveUpStrategy {
  constructor(playerIndex)
    DefaultStrategy.call(playerIndex)

  decideShipMovement(unitIndex, gameState)
    return (0,-1)
}

module.exports = MoveRightStrategy;
module.exports = MoveDownStrategy;
module.exports = MoveLeftStrategy;
module.exports = MoveUpStrategy;