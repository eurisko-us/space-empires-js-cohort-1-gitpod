class CombatEngine {
  completeCombatPhase(game) {
    possibleCombats = []

    for (let hex of Object.values(game.board.grid)) {
      if (moreThanTwoPlayersInSpace(hex.units))
        possibleCombats.append(hex);
    }

    for (let combatHex of possibleCombats) {
      shipsInCombat = [];
      for (let ships of combatHex.units) {
        for (let ship of ships) {
          if (ship.canFight)
            shipsInCombat.append(ship);
        }
      }

      let combatOrder = combatHex.sortForCombat();
      return combatOrder
      let attackingShipIndex = 0;

      while (!moreThanTwoPlayersInSpace(combatOrder)) {
        let attackingShip = combatOrder[attackingShipIndex];
        // The attacking ship can decide which ship to attack
        combatOrderGameState = []; // To pass into the strategy function
        for (let ship of combatOrder) 
          combatOrderGameState.append(ship.generate_state(isCombat = true));
        let defendingShip = game.players[attackingShip.playerIndex].strategy.decide_defending_ship(combatOrderGameState);
        if (duel(attackingShip, defendingShip)) { // If the attacker hits the defender
          if (defendingShip.armor - defendingShip.damage - attackingShip.attack < 0) {  // If the attacker kills the defender
            combatPosition.removeUnit(defendingShip, game);
            attackingShipIndex = combatOrder.indexof(attackingShip);
          }
          else // If the attacker doesn't kill, but hits the defender
            combatPosition.damage += 1; 
        }
        attackingShipIndex += 1;
      }
    }
  }

  duel(attackingShip, defendingShip) {
    let diceRoll = Math.round(Math.random() * (10 - 1) + 1);
    let hitThreshold = attackingShip.attack + attackingShip.technology["attack"] - defendingShip.defense + defendingShip.technology["defense"];
    return diceRoll == 1 || diceRoll <= hitThreshold;
  }

  moreThanTwoPlayersInSpace(ships) {
    playerOne = ships[0].playerIndex;
    for (let ship of ships.slice(1)) {
      if (ship.playerIndex != playerOne)
        return True
    }
    return False
  }
}

module.exports = CombatEngine;