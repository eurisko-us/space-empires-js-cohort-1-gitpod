class CombatEngine {
  completeCombatPhase(game) {
    let possibleCombats = []
    for (let hex of Object.values(game.board.grid)) {
      if (this.moreThanTwoPlayersInSpace(hex.units))
        possibleCombats.push(hex);
    }
    console.log(possibleCombats)
    for (let combatHex of possibleCombats) {
      console.log("Here")
      let shipsInCombat = [];
      for (let ship of combatHex.units) {
        if (ship.canFight)
          shipsInCombat.push(ship);
      }

      let combatOrder = combatHex.sortForCombat();
      console.log(combatOrder)
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
            combatCoord.removeUnit(defendingShip, game);
            attackingShipIndex = combatOrder.indexof(attackingShip);
          }
          else // If the attacker doesn't kill, but hits the defender
            combatCoord.damage += 1; 
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
    if (ships.length == 0){return false}
    let playerOne = ships[0].playerIndex;
    for (let ship of ships.slice(1)) {
      if (ship.playerIndex != playerOne)
        return true
    }
    return false
  }
}

module.exports = CombatEngine;