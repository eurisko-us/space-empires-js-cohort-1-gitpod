//const MiningShip = require("../src/units/mining-ship")
//const ColonyShip = require("../src/units/colony-ship")
const Colony = require("../src/units/colony.js")


class EconomicEngine {
  completeEconomicPhase(game) {

    this.logs = '';
    game.logger.logSpecificText(`\nBEGINNING OF TURN ${game.turn} ECONOMIC PHASE\n`)

    for (let index in game.players) {

      let player = game.players[index];
      let playerStartingCreds = player.creds;
      let newLine = '';

      if (index > 0) {
        newLine = '\n';
      }

      this.logs += newLine + game.logger.logSpecificText(`\nStarting Phase for Player ${player.playerIndex + 1}`);

      let income = this.income(player);
      player.creds += income;
      let taxes = this.taxes(player);

      if (player.creds - taxes < 0) {

        let debt = this.taxes(player) - player.creds

        while (debt > 0) {

          let snowball = this.removeUnit(game, player);
          // ^ Debt Snowball, its an actual term google it
          debt -= snowball;
          
        }

        taxes = this.taxes(player);
        
      }

      player.creds -= taxes;

      for (let unit of player.units) {

        let coords = unit.coords[0] + ',' + unit.coords[1];
        let currentHex = game.board.grid[coords];

        if (currentHex.planet != null && currentHex.planet.colony == null) {

          player.colonies.push(new Colony(player.playerIndex, coords, null, player.technology, null, true));
          unit.destroy(game);
          currentHex.planet.colony = true;
  
        }

      }
      
      game.generateState(player, "Economic");

      // Decide purchases should be formatted as an array like this: ["Movement", ["Scout", (0,6)], "Attack"]
      // The earlier the purchase is in the array the higher priority the player wants to purchase
      let purchases = player.strategy.decidePurchases(game.gameState);
      let correctedPurchases = {'technology': [], 'units': []};

      for (let purchase of purchases) {

        let result;//buy, cost;

        if (typeof(purchase) == "string") {

          result = this.buyTech(game, purchase, player);

          if (result[0] == true) {

            correctedPurchases['technology'].push([purchase, result[1]]);

          }
        }
        else {

          result = this.buyUnit(game, purchase, player);

          if (result[0] == true) {

            correctedPurchases['units'].push([purchase, result[1]]);

          }

        }          
        
      }
      game.generateState(true, false);
      
      this.logs += game.logger.simpleLogEconomic(taxes, income, playerStartingCreds, player.creds, correctedPurchases)
    }

    game.logger.logSpecificText(`\nEND OF TURN ${game.turn} ECONOMIC PHASE\n`);

    return this.logs;

  }

  buyTech(game, tech, player) {

    let techData = game.gameState["technologyData"][tech];
    let techCost = techData[player.technology[tech]]; // Adjustment for array indexing

    if (techCost <= player.creds) {

      player.creds -= techCost;
      player.upgrade(game, tech);

      return [true, techCost];

    } else {

      return [false, techCost];

    }

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

  removeUnit(game, player) {

    game.generateState(player, "Economic");
    let removalIndex = player.strategy.decideRemoval(game.gameState);
    let removalUnit = player.units[removalIndex];

    game.board.removeUnit(removalUnit, game);

    if (player.units.length == 0) {

      throw `Player ${player.playerIndex} loses!`;

    }

    let maintenanceCost = removalUnit.maintenance;

    return maintenanceCost;

  }

  income(player) {

    let income = 0
    income += player.homeBase.income;

    for (let colony of player.colonies) {

        income += colony.income;

    }

    return income;

  }

  taxes(player) {

    let totalTaxes = 0;

    for (let unit of player.units) {

      totalTaxes += unit.maintenance;

    }

    return totalTaxes;

  }

}

module.exports = EconomicEngine;