class CombatEngine {
  completeCombatPhase(game) {
    let possibleCombats = []
    for (let hex of Object.values(game.board.grid)) {
      if (this.moreThanTwoPlayersInSpace(hex.units))
        possibleCombats.push(hex);
    }
    for (let combatHex of possibleCombats) {
      let shipsInCombat = [];
      for (let ship of combatHex.units) {
        if (ship.canFight)
          shipsInCombat.push(ship);
      }

      let combatOrder = combatHex.sortForCombat();

      let attackingShipIndex = 0;

      while (this.moreThanTwoPlayersInSpace(combatOrder)) {
        
        console.log("\n\nCOMBAT", combatOrder.length, attackingShipIndex, "\n\n")
        let attackingShip = combatOrder[attackingShipIndex];
        // The attacking ship can decide which ship to attack
        let combatOrderGameState = []; // To pass into the strategy function
        for (let ship of combatOrder) 
          combatOrderGameState.push(ship.generateState(ship.playerIndex, true, true));
        let defendingShipIndex = game.players[attackingShip.playerIndex].strategy.decideWhichUnitToAttack(combatOrderGameState, attackingShipIndex);
        let defendingShip = combatOrder[defendingShipIndex]
        if (this.duel(attackingShip, defendingShip)) { // If the attacker hits the defender
          if (defendingShip.armor - defendingShip.damage - attackingShip.attack < 0) {  // If the attacker kills the defender
            // game.board.grid[String(defendingShip.coords)].units.splice(game.board.grid[String(defendingShip.coords)].units.indexOf(defendingShip))
            game.board.removeUnit(defendingShip, game);
            combatOrder.splice(defendingShipIndex, 1)
            attackingShipIndex = combatOrder.indexOf(attackingShip);
          }
          else // If the attacker doesn't kill, but hits the defender
            defendingShip.damage += attackingShip.damage; 
        }
        if (attackingShipIndex == combatOrder.length-1) {
          attackingShipIndex = 0;
        }else{
         attackingShipIndex += 1;
        }
      }
    }
  }

  duel(attackingShip, defendingShip) {
    let diceRoll = Math.round(Math.random() * (10 - 1) + 1);
    let hitThreshold = attackingShip.attack + attackingShip.technology["attack"] - defendingShip.defense + defendingShip.technology["defense"];
    return diceRoll == 1 || diceRoll <= hitThreshold;
  }

  moreThanTwoPlayersInSpace(ships) {
    if (ships.length == 0){return false}
    let playerOne = ships[0].playerIndex;
    for (let ship of ships.slice(1)) {
      if (ship.playerIndex != playerOne) {
        return true;
      };
    };
    return false;
  };
}

module.exports = CombatEngine;