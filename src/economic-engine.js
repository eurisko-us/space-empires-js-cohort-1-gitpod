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

      if (index > 0) { newLine = '\n'; }

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

        if (currentHex.planet != null && currentHex.planet.colony == null && unit.type == "ColonyShip") { // if possible colonization then colonize

          this.colonize(game, currentHex, player, unit, coords);
  
        }

        if (currentHex.planet != null && currentHex.planet.colony != null && unit.type == "MiningShip" && unit.asteroid != null) { // if colony and mining ship with asteroid then add money and delete asteroid

          this.collectAsteroid(player, unit);

        }

      }
      
      game.generateState(player, "Economic");

      // Decide purchases should be formatted as an array like this: ["Movement", ["Scout", (0,6)], "Attack"]
      // The earlier the purchase is in the array the higher priority the player wants to purchase
      let purchases = player.strategy.decidePurchases(game.gameState);
      let correctedPurchases = {'technology': [], 'units': []};
      let hullSizeBuilt = {};

      for (let purchase of purchases) {

        let result = (false, 0); //buy, cost;

        if (typeof(purchase) == "string") {

          result = this.buyTech(game, purchase, player);
          
          if (result[0] == true) { correctedPurchases['technology'].push([purchase, result[1]]); }

        } else {

          let coords = purchase[1][0] + ',' + purchase[1][0];

          if (!hullSizeBuilt[coords]) { hullSizeBuilt[coords] = 0; } // create max hull size built check if it doesn't exist

          let hex = game.board.grid[coords];

          if (!hex.planet) { continue; }

          let planet = hex.planet;
          
          if (planet == null && planet.colony == null && planet.colony.playerIndex != player.playerIndex) { continue; } // if planet/colony does not exist or placing on wrong teams colony
          
          if (player.technology.shipsize < game.gameState.unitData[purchase[0]].shipsizeNeeded) { continue; } // if shipsize tech requirement for ship not met by player
          
          if (this.shipyardRequirement(hex, player) < hullSizeBuilt[coords] + game.gameState.unitData[purchase[0]].hullSize) { continue; } // if shipyard requirement for (non shipyard) ship not met on current planet and max hull size built check is met
          else { hullSizeBuilt[coords] += game.gameState.unitData[purchase[0]].hullSize; }

          if (purchase[0] == "Base") {

            if (!planet.base) { 
              
              result = this.buyUnit(game, hex, purchase, player);
              planet.base = true;

            } else  { continue; }

          } else if (purchase[0] == "Shipyard") {
            
            if (hex.shipyardCount >= 4) { continue; } // no more than 4 shipyards per hex
            else { 
              
              result = this.buyUnit(game, purchase, player);
              hex.shipyardCount += 1;
            
            }

          } else { result = this.buyUnit(game, purchase, player);}

          if (result[0] == true) { correctedPurchases['units'].push([purchase, result[1]]); }

        }          
        
      }
      
      game.generateState(true, false);
      this.logs += game.logger.simpleLogEconomic(taxes, income, playerStartingCreds, player.creds, correctedPurchases);

    }

    game.logger.logSpecificText(`\nEND OF TURN ${game.turn} ECONOMIC PHASE\n`);

    return this.logs;

  }

  colonize(game, currentHex, player, unit, coords) {

    let newColony = new Colony(player.playerIndex, coords, null, player.technology, null, false)
    player.colonies.push(newColony);
    currentHex.planet.colony = newColony.generateState(true);
    unit.destroy(game);

  }

  collectAsteroid(player, unit) {

    player.creds += unit.asteroid.value;
    unit.asteroid = null;

  }

  shipyardRequirement(hex, player) {

    if (!hex.units) { return 0; }
    
    let requirement = 1;

    for (let unit of hex.units) {

      if (unit.type == "Shipyard") { requirement += player.technology.shipyard; }

    }

    return requirement;

  }

  buyTech(game, tech, player) {

    let techData = game.gameState["technologyData"][tech];
    let techCost = techData[player.technology[tech]]; // Adjustment for array indexing

    if (techCost <= player.creds) {

      player.creds -= techCost;
      player.upgrade(game, tech);

      return [true, techCost];

    } else { return [false, techCost]; }

  }

  buyUnit(game, unit, player) {

    let unitCost = game.gameState["unitData"][unit[0]]["cost"];
    
    if (player.creds >= unitCost) {

      player.creds -= unitCost;
      player.build(game, unit); // Builds unit and adds to self in player class

      return [true, unitCost];
      
    } else { return [false, unitCost]; }

  }

  removeUnit(game, player) {

    if (player.units.length == 0) { console.log(`Player ${player.playerIndex} loses!`); }

    game.generateState(player, "Economic");
    let removalIndex = player.strategy.decideRemoval(game.gameState);
    let removalUnit = player.units[removalIndex];
    game.board.removeUnit(removalUnit, game);
    let maintenanceCost = removalUnit.maintenance;

    return maintenanceCost;

  }

  income(player) {

    let income = 0
    income += player.homeBase.income;

    for (let colony of player.colonies) { income += colony.income; }

    return income;

  }

  taxes(player) {

    let totalTaxes = 0;

    for (let unit of player.units) { totalTaxes += unit.maintenance; }

    return totalTaxes;

  }

}

module.exports = EconomicEngine;