const Board = require(".../src/board.js");
const orderWithGameState = Board.orderWithGameState;

class DefaultStrategy {
  constructor(playerIndex) {
    this.playerIndex = playerIndex
  }

  decideRemoval(hiddenGameState) {
    weakest_ship = hiddenGameState["players"][self.player_number]["units"].sort(orderWithGameState(firstShip,secondShip))[-1];
    return weakest_ship["type"], weakest_ship["num"]
  } 
    
  decideWhichUnitToAttack(hiddenGameStateForCombat, combatState, coords, attacker_index) {
    for (ship of combatState[coords]) {
      if (this.playerIndex != ship["player_number"] && ship["type"] != "Home Base")
        return ship
    }
  }

  decideWhichUnitsToScreen(hiddenGameStateForCombat)
    return []
          
  decideShipMovement(unitIndex, gameState)
    return (0,0)

  willColonizePlanet(coordinates, gameState)
    return False

}

module.exports = DefaultStrategy;