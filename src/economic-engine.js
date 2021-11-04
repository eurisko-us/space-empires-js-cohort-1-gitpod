  class EconomicEngine {
  completeEconomicPhase(game) {
    if (game.canLog)
      game.logger.logSpecificText(`\nBEGINNING OF TURN ${game.turn} ECONOMIC PHASE`)
    for (let player of game.players) {
      let playerStartingCreds = player.creds;
      game.logger.logSpecificText(`\nStarting Phase for Player ${player.playerIndex}`);
      let income = this.income(player);
      player.creds += income;
      let taxes = this.taxes(player);
      if (player.creds - taxes < 0) {
        let debt = this.taxes(player) - player.creds
        while (debt > 0) {
          let snowball = this.removeShip(game, player);
          // ^ Debt Snowball, its an actual term google it
          debt -= snowball;
        }
        taxes = this.taxes(player);
      }
      game.generateState(player, "Economic");
      // After looking over the rule book theres no rule 
      // Saying the either technology or ships have to get bought first
      // Decide purchases should be formatted as an array like this: ["Movement", ["Scout", (0,6)], "Attack"]
      // The earlier the purchase is in the array the higher priority the player wants to purchase
      let purchases = player.strategy.decidePurchases(game.gameState);
      let correctedPurchases = {'technology': [], 'units': []};
      for (let purchase of purchases) {
        let result;//buy, cost;
        if (typeof(purchase) == "string") {
          result = this.buyTech(game, purchase, player);
          if (result[0] == true)
            correctedPurchases['technology'].push([purchase, result[1]]);
        }
        else {
          result = this.buyUnit(game, purchase, player);
          if (result[0] == true)
            correctedPurchases['units'].push([purchase, result[1]]);
        }          
        
      }
      game.generateState(true, false);
      if (game.canLog)
        game.logger.simpleLogEconomic(taxes, income, playerStartingCreds, player.creds, correctedPurchases)
    }
    if (game.canLog)
      game.logger.logSpecificText(`\nEND OF TURN ${game.turn} ECONOMIC PHASE`)

  }

  buyTech(game, tech, player) {
    let techData = game.gameState["technologyData"][tech];
    let adjustment = 0
    let adjustment_techs = ["shipsize", "movement", "shipyard"]
    if (adjustment_techs.includes(tech))
      adjustment = 1
    let techCost = techData[player.technology[tech] - adjustment]; // Adjustment for array indexing
    if (techCost <= player.creds) {
      player.creds -= techCost;
      player.upgrade(game, tech);
      return [true, techCost];
    } else
      return [false, techCost];
    
  }

  buyUnit(game, unit, player) {
    let unitCost = game.gameState["unitData"][unit[0]]["cost"];
    if (player.creds >= unitCost) {
      player.creds -= unitCost;
      player.build(game, unit); // Builds unit and adds to self in player class
      return [true, unitCost];
    } else {
      return [false, unitCost];
    }
  }

  removeShip(game, player) {
    game.generateState(player, "Economic");
    let removalIndex = player.strategy.decideRemoval(game.gameState);
    let removalUnit = player.units[removalIndex];
    let maintenanceCost = removalUnit.maintenance;
    game.board.removeUnit(removalUnit, game);
    return maintenanceCost;
  }

  income(player) {
    let income = player.homeBase.income;
    for (let unit of player.units) {
      if (unit.name == "Colony") {
        income += unit.income;
      }
    }
    return income;
  }

  taxes(player) {
    let total_taxes = 0;
    for (let unit of player.units) {
      total_taxes += unit.maintenance;
    }
    return total_taxes;
  }
}

module.exports = EconomicEngine;