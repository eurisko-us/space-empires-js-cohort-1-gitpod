const Board = require("../../src/board");

const orderWithGameState = Board.orderWithGameState;

class DefaultStrategy {
  constructor(playerIndex) {
    this.playerIndex = playerIndex;
  }

  decidePurchases(hiddenGameState) {
    return [];
  }
    
  decideRemoval(hiddenGameState) {
    return null;
  } 
    
  decideWhichUnitToAttack(hiddenGameStateForCombat, combatState, coords, attacker_index) {
    for (ship of combatState[coords]) {
      if (this.playerIndex != ship["player_number"] && ship["type"] != "Home Base")
        return ship;
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