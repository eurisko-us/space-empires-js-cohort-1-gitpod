class EconomicEngine {
  completeEconomicPhase(game) {
    for (let player of game.players) {
      player.creds += this.income(player) - this.taxes(player);
      if (player.creds < 0) {
        debt = taxes - player.creds
        while (removalCutoff > 0) {
          snowball = removeShip(game, player);
          // ^ Debt Snowball, its an actual term google it
          debt -= snowball;
        }
        taxes = this.taxes(player);
      }
      console.log(player)
      game.generateState(player, "Economic");
      // After looking over the rule book theres no rule 
      // Saying the either technology or ships have to get bought first
      // Decide purchases should be formatted as an array like this: ["Movement", ["Scout", (0,6)], "Attack"]
      // The earlier the purchase is in the array the higher priority the player wants to purchase
      let purchases = player.strategy.decidePurchases(game.gameState);
      for (let purchase in purchases) {
        if (typeof(purchase) == "string")
          this.buyTech(game, purchase, player);
        else
          this.buyUnit(game, purchase, player);
      }
    }
  }

  buyTech(game, tech, player) {
    let techData = game.gameState["technologyData"][tech];
    let techCost = techData[player.technology[tech] - 1]; // Adjustment for array indexing
    if (techCost < player.creds) {
      player.creds -= techCost
      player.upgrade(game, tech);
    }
  }

  buyUnit(game, unit, player) {
    unitCost = game.gameState["unitData"][unit[0]]["cost"];
    if (unitCost < player.creds) {
      player.creds -= unitCost;
      player.build(game, unit); // Builds unit and adds to self in player class
    }
  }

  removeShip(game, player) {
    game.generateState(phase = 'Economic', currentPlayer = player);
    removalIndex = player.strategy.decideRemoval(game.gameState);
    removalUnit = player.units[removalIndex];
    maintenanceCost = removalUnit.maintenance;
    game.board.removeUnit(removalUnit);
    return maintenanceCost;
  }

  income(player) {
    let income = 0;
    for (let unit of player.units) {
      if (ship.type == "Colony" || ship.type == "Home Base")
        income += ship.income;
    }
    return income;
  }

  taxes(player) {
    let total_taxes = 0;
    for (let unit of player.units)
      total_taxes += ship.maintenance;
    return total_taxes;
  }
}

module.exports = EconomicEngine;