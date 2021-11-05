class CombatEngine {
  completeCombatPhase(game) {
    let possibleCombats = this.findPossibleCombats(game);
    if (game.canLog) {
      game.logger.logSpecificText(`\nBEGINNING OF TURN ${game.turn} COMBAT PHASE\n`)
      if (possibleCombats.length > 0)
        game.logger.simpleLogCombatInitialization(game.gameState);
    }
    for (let combatHex of possibleCombats) {
      let unitsInCombat = [];
      for (let unit of combatHex.units) {
        if (unit.canFight)
          unitsInCombat.push(unit);
      }

      if (game.canLog) {
        let combatString = `\n\tCombat at (${combatHex.coords})\n`;
        game.logger.logSpecificText(combatString);
      }

      let combatOrder = combatHex.sortForCombat();

      let attackingUnitIndex = 0;

      while ((this.moreThanTwoPlayersInSpace(combatOrder)) && (combatOrder.length > 1)) {
        
        //console.log(`\n\nCOMBAT ${combatOrder.length} ${attackingUnitIndex} \n\n`)
        let attackingUnit = combatOrder[attackingUnitIndex];
        // The attacking unit can decide which unit to attack
        let combatOrderGameState = combatOrder.map(function (unit) { return unit.generateState(game.players[unit.playerIndex], true); }); // To pass into the strategy function
        let defendingUnitIndex = game.players[attackingUnit.playerIndex].strategy.decideWhichUnitToAttack(combatOrderGameState, attackingUnitIndex);
        let defendingUnit = combatOrder[defendingUnitIndex];
        while (attackingUnit.playerIndex == defendingUnit.playerIndex) {
          defendingUnitIndex += 1;
          defendingUnit = combatOrder[defendingUnitIndex];
        }
        let duel = this.duel(attackingUnit, defendingUnit);
        const duelResult = duel[0];
        const diceRoll = duel[1]
        const hitThreshold = duel[2]; 
        if (duelResult) { // If the attacker hits the defender
          if (defendingUnit.armor - defendingUnit.damage - attackingUnit.attack < 0) {  // If the attacker kills the defender
            if (game.canLog)
              game.logger.simpleLogCombat(attackingUnit.playerIndex, attackingUnit.generateState(false, true), defendingUnit.playerIndex, defendingUnit.generateState(false, true), duelResult, hitThreshold, diceRoll);
            // game.board.grid[String(defendingUnit.coords)].units.splice(game.board.grid[String(defendingUnit.coords)].units.indexOf(defendingUnit))
            game.board.removeUnit(defendingUnit, game);
            defendingUnit.destroy(game);
            combatOrder.splice(defendingUnitIndex, 1)
            attackingUnitIndex = combatOrder.indexOf(attackingUnit);
          }
          else // If the attacker doesn't kill, but hits the defender
            defendingUnit.damage += attackingUnit.damage; 
        }
        if (attackingUnitIndex == combatOrder.length-1)
          attackingUnitIndex = 0;
        else
          attackingUnitIndex += 1;
        game.generateState(false, "Combat");
      }
    }
    if (game.canLog)
      game.logger.logSpecificText(`\nEND OF TURN ${game.turn} COMBAT PHASE\n`);
    
  }

  findPossibleCombats(game) {
    let possibleCombats = []
    for (let hex of Object.values(game.board.grid)) {
      if (this.moreThanTwoPlayersInSpace(hex.units))
        possibleCombats.push(hex);
    }
    return possibleCombats;
  }

  generateCombatArray(game) {
    let possibleCombats = this.findPossibleCombats(game);
    let combatArray = {};
    for (let coords in possibleCombats) {
      let units = possibleCombats[coords].units;
      combatArray[possibleCombats[coords].coords] = units.map(function (unit) { return unit.generateState(false, true); });
    }
    return combatArray
  }

  duel(attackingUnit, defendingUnit) {
    let diceRoll = Math.round(Math.random() * 10);
    let hitThreshold = attackingUnit.attack + attackingUnit.technology["attack"] - defendingUnit.defense + defendingUnit.technology["defense"];
    return [diceRoll == 1 || diceRoll <= hitThreshold, diceRoll, hitThreshold];
  }

  moreThanTwoPlayersInSpace(units) {
    if (units.length == 0){return false}
    let playerOne = units[0].playerIndex;
    for (let unit of units.slice(1)) {
      if (unit.playerIndex != playerOne) {
        return true;
      };
    };
    return false;
  };
}

module.exports = CombatEngine;