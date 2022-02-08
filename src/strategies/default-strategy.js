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
    for (let unit of combatState) {
      if (this.playerIndex != unit["playerNumber"] && unit["type"] != "Home Base") {
        return combatState.indexOf(unit);
      }
    }
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
