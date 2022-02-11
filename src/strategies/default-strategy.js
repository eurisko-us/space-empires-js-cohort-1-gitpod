const Board = require("../../src/board");

class DefaultStrategy {

  constructor(playerIndex) {

    this.playerIndex = playerIndex;

    this.name = 'Default Strategy';

  }

  decidePurchases(hiddenGameState) {

    return [];

  }
    
  decideRemoval(hiddenGameState) {

    return 0;

  } 
    
  decideWhichUnitToAttack(combatState, attackingIndex) {

    for (let unitIndex in combatState) {

      let unit = combatState[unitIndex];

      if (this.playerIndex == unit["playerIndex"] || attackingIndex == unitIndex) { continue; } // same player or same ship, skip

      return combatState.indexOf(unit);

    }

    return -1;

  }

  decideWhichUnitsToScreen(hiddenGameStateForCombat) {

    return [];

  }
          
  decideUnitMovement(unitIndex, gameState) {

    return {"x": 0, "y": 0};

  }

  willColonizePlanet(coordinates, gameState) {

    return False;

  }

}

module.exports = DefaultStrategy;
