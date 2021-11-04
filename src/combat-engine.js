class CombatEngine {
  completeCombatPhase(game) {
    if (game.canLog)
      game.logger.logSpecificText(`\nBEGINNING OF TURN ${game.turn} COMBAT PHASE\n`)
    let possibleCombats = []
    for (let hex of Object.values(game.board.grid)) {
      if (this.moreThanTwoPlayersInSpace(hex.units))
        possibleCombats.push(hex);
    }

    if (game.canLog && possibleCombats.length > 0)
      game.logger.simpleLogCombatInitialization(game.gameState);
    for (let combatHex of possibleCombats) {
      let shipsInCombat = [];
      for (let ship of combatHex.units) {
        if (ship.canFight)
          shipsInCombat.push(ship);
      }

      if (game.canLog) {
        let combatString = `\n\tCombat at ${combatHex.coords}\n`;
        game.logger.logSpecificText(combatString);
      }

      let combatOrder = combatHex.sortForCombat();

      let attackingShipIndex = 0;

      while (this.moreThanTwoPlayersInSpace(combatOrder)) {
        
        //console.log(`\n\nCOMBAT ${combatOrder.length} ${attackingShipIndex} \n\n`)
        let attackingShip = combatOrder[attackingShipIndex];
        // The attacking ship can decide which ship to attack
        let combatOrderGameState = []; // To pass into the strategy function
        for (let ship of combatOrder) 
          combatOrderGameState.push(ship.generateState(ship.playerIndex, true, true));
        let defendingShipIndex = game.players[attackingShip.playerIndex].strategy.decideWhichUnitToAttack(combatOrderGameState, attackingShipIndex);
        let defendingShip = combatOrder[defendingShipIndex];
        let duel = this.duel(attackingShip, defendingShip);
        const duelResult = duel[0];
        const diceRoll = duel[1]
        const hitThreshold = duel[2]; 
        if (duelResult) { // If the attacker hits the defender
          if (defendingShip.armor - defendingShip.damage - attackingShip.attack < 0) {  // If the attacker kills the defender
            if (game.canLog)
              game.logger.simpleLogCombat(game.players[attackingShip.playerIndex].generateState(false, true), attackingShip.generateState(false, true), game.players[defendingShip.playerIndex].generateState(false, true), defendingShip.generateState(false, true), duelResult, hitThreshold, diceRoll);
            // game.board.grid[String(defendingShip.coords)].units.splice(game.board.grid[String(defendingShip.coords)].units.indexOf(defendingShip))
            game.board.removeUnit(defendingShip, game);
            combatOrder.splice(defendingShipIndex, 1)
            attackingShipIndex = combatOrder.indexOf(attackingShip);
          }
          else // If the attacker doesn't kill, but hits the defender
            defendingShip.damage += attackingShip.damage; 
        }
        if (attackingShipIndex == combatOrder.length-1)
          attackingShipIndex = 0;
        else
         attackingShipIndex += 1;
      }
    }
    if (game.canLog && possibleCombats.length > 0)
      game.logger.endSimpleLogCombat(game.gameState);
    if (game.canLog)
      game.logger.logSpecificText(`\nEND OF TURN ${game.turn} COMBAT PHASE\n`);
    
  }

  duel(attackingShip, defendingShip) {
    let diceRoll = Math.round(Math.random() * 10);
    let hitThreshold = attackingShip.attack + attackingShip.technology["attack"] - defendingShip.defense + defendingShip.technology["defense"];
    return [diceRoll == 1 || diceRoll <= hitThreshold, diceRoll, hitThreshold];
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