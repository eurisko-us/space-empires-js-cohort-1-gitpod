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
    return 0;
  } 
    
  decideWhichUnitToAttack(combatState, attacking_index) {
    for (let ship of combatState) {
      if (this.playerIndex != ship["player_number"] && ship["type"] != "Home Base")
        return combatState.indexOf(ship);
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