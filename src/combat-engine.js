class CombatEngine {
  completeCombatPhase(game) {

    this.logs = '';
    game.logger.logSpecificText(`\nBEGINNING OF TURN ${game.turn} COMBAT PHASE\n`);

    let possibleCombats = this.findPossibleCombats(game);

    if (possibleCombats.length > 0) { this.logs += game.logger.simpleLogCombatInitialization(game.gameState); }

    for (let combatHex of possibleCombats) {

      // Gets all units that can fight
      let combatOrder = [];
      let removeOrder = [];


      for (let unit of combatHex.units) {

        if (unit.canFight) { combatOrder.push(unit); }
        else { removeOrder.push(unit); }

      }

      for (let unit of removeOrder) {

        unit.destroy(game);

      }
      
      if (combatOrder.length <= 1) { continue; } 

      this.logs += '\n';
      game.logger.logSpecificText(`\t`);
      let combatString = `Combat at (${combatHex.coords})\n`;
      this.logs += game.logger.logSpecificText(combatString) + '\n';

      // Takes the units in a certain space and sorts them
      
      let attackingUnitIndex = 0;

      combatOrder = combatHex.sortForCombat(combatOrder);

      let i = 0

      while (combatOrder.length > 1 && this.moreThanTwoPlayersInSpace(combatOrder)) {

        if (i > 1000) { let x = 0; }
        
        //get our attacking unit
        let attackingUnit = combatOrder[attackingUnitIndex];
        // Set up an info-only combat order for strategies
        let combatOrderGameState = combatOrder.map(unit => unit.generateState(game.players[unit.playerIndex], true));
        // the long winded process of getting the defending unit
        // Goes through the game to get the strategy
        // The strategy picks an a unit from the info only combat order and returns its index
        // we use that index to get the actual unit from the actual combat order
        let attackingPlayerStrat = game.players[attackingUnit.playerIndex].strategy;
        let defendingUnitIndex = attackingPlayerStrat.decideWhichUnitToAttack(combatOrderGameState, attackingUnitIndex);
        let defendingUnit = combatOrder[defendingUnitIndex];

        //if the strategy picks a unit on its team, then just find the closest opponent
        while (attackingUnit.playerIndex == defendingUnit.playerIndex) {

          defendingUnitIndex += 1;
          defendingUnit = combatOrder[defendingUnitIndex];

        }

        let duel = this.duel(attackingUnit, defendingUnit);
        const duelResult = duel.result;
        const diceRoll = duel.diceRoll;
        const hitThreshold = duel.hitThreshold; 

        this.handleDuelResult(game, combatOrder, attackingUnit, defendingUnit, duelResult, diceRoll, hitThreshold);

        game.generateState(false, "Combat");

        // Move to the next attacking unit in the order or loop back to the begining
        if (attackingUnitIndex >= (combatOrder.length - 1)) { attackingUnitIndex = 0; } 
        else { attackingUnitIndex += 1; }

      }

      i += 1;

    }

    game.logger.logSpecificText(`\nEND OF TURN ${game.turn} COMBAT PHASE\n`);

    return this.logs;
    
  }

  handleDuelResult(game, combatOrder, attackingUnit, defendingUnit, duelResult, diceRoll, hitThreshold) {

    if (duelResult) { // If the attacker hits the defender

      if (defendingUnit.armor - defendingUnit.damage - attackingUnit.attack < 0) {  // If the attacker kills the defender

        defendingUnit.damage += attackingUnit.attack; 
        this.logs += game.logger.simpleLogCombat(attackingUnit.playerIndex, attackingUnit.generateState(false, true), defendingUnit.playerIndex, defendingUnit.generateState(false, true), duelResult, hitThreshold, diceRoll);
        // I think the problem is somewhere in these 3 lines:
        game.board.removeUnit(defendingUnit, game);
        combatOrder.splice(combatOrder.indexOf(defendingUnit), 1);

      } else { defendingUnit.damage += attackingUnit.attack; } // If the attacker doesn't kill, but hits the defender

    }

  }

  findPossibleCombats(game) {

    let possibleCombats = [];

    for (let hex of Object.values(game.board.grid)) {

      if (this.moreThanTwoPlayersInSpace(hex.units)) { possibleCombats.push(hex); }

    }

    return possibleCombats;

  }

  generateCombatArray(game) {

    let possibleCombats = this.findPossibleCombats(game);
    let combatArray = {};

    for (let index in possibleCombats) {

      let units = possibleCombats[index].units;
      combatArray[possibleCombats[index].coords] = units.map(function (unit) { return unit.generateState(false, true); });

    }

    return combatArray;

  }

  duel(attackingUnit, defendingUnit) {

    let roll = Math.round(Math.random() * 10);
    let hitThresh = attackingUnit.attack + attackingUnit.technology["attack"] - defendingUnit.defense + defendingUnit.technology["defense"];
    return {result: (roll == 1 || roll <= hitThresh), diceRoll: roll, hitThreshold: hitThresh};

  }

  moreThanTwoPlayersInSpace(ships) {

    if (ships.length <= 1) { return false; }

    for (let ship of ships) {

      if (ship.playerIndex != ships[0].playerIndex) { return true; }

    }

    return false;

  }

}

module.exports = CombatEngine;