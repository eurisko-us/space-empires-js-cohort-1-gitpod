const fs = require('fs');
const dir = '/src'

class Logger {
  getActiveFile(currentPath) {
    // console.log(process.cwd()) // what directory ur in (for debugging)
    this.currentDirectory = process.cwd() + dir + currentPath;
    let newLogNumber = fs.readdirSync(this.currentDirectory).length;
    this.activeFileName = `log-${newLogNumber}.txt`;
    this.activeFile = `${this.currentDirectory}/${this.activeFileName}`;
    // console.log(`active file ${this.activeFile}`);
    fs.truncate(this.activeFile, 0, function(){console.log()});
  }

  simpleLogMovement(oldGameState, newGameState, movementRound) {
    this.logSpecificText(`\n\tMovement Round ${movementRound}\n`);
    for (let playerNumber in newGameState['players']) {
      let player = newGameState['players'][playerNumber];
      let oldPlayer = oldGameState['players'][playerNumber];
      for (let unitIndex in player['units']) {
        let oldUnitAttributes = oldPlayer['units'][unitIndex];
        let newUnitAttributes = player['units'][unitIndex];
        if (!['Shipyard', 'Base', 'Homeworld', 'Colony'].includes(newUnitAttributes['type']) && (oldUnitAttributes['coords'] != newUnitAttributes['coords'])) {
          this.logSpecificText(`\t\tPlayer ${playerNumber} ${newUnitAttributes['type']} ${newUnitAttributes['num']}: ${oldUnitAttributes['coords']} -> ${newUnitAttributes['coords']}\n`); 
        }
      }
    }
  }
  
  endSimpleLogMovement(gameState) {
    this.logSpecificText(`\n\tEnding Unit Locations\n`);
    for (let playerNumber in gameState['players']) {
      let player = gameState['players'][playerNumber];
      this.logSpecificText(`\t\tPlayer ${playerNumber}\n`);
      this.logSpecificText(`\t\t\tHomeworld: ${player['homeworld']['coords']}\n`);
      for (let unitIndex in player['units']) {
        let unitAttributes = player['units'][unitIndex];
        this.logSpecificText(`\t\t\t${unitAttributes['type']} ${unitAttributes['num']}: ${unitAttributes['coords']}\n`);
      }
    }
    this.logSpecificText(`\nEND OF TURN ${gameState['turn']} MOVEMENT PHASE\n`);
  }

  simpleLogCombatInitialization(gameState) {
    this.logSpecificText(`\n\tCombat Locations:\n`);
    for (let location in gameState['combat']) {
      let units = gameState['combat'][location];
      this.logSpecificText(`\t\t(${location})\n`);
      for (let unitAttributes of units) {
        this.logSpecificText(`\t\t\tPlayer ${unitAttributes['playerIndex']} ${unitAttributes['type']} ${unitAttributes['num']}`);
        
      }
    }
  }

  simpleLogCombat(playerOneIndex, unitOne, playerTwoIndex, unitTwo, didUnitOneHit, hitThreshold, currentRoll) {
    this.logSpecificText(`\t\tAttacker: Player ${playerOneIndex} ${unitOne['type']} ${unitOne['num']}\n`);
    this.logSpecificText(`\t\tDefender: Player ${playerTwoIndex} ${unitTwo['type']} ${unitTwo['num']}\n`);
    this.logSpecificText(`\t\tMiss threshold: ${hitThreshold}\n`);
    this.logSpecificText(`\t\tDie Roll: ${currentRoll}\n`);
    if (didUnitOneHit) {
      this.logSpecificText(`\t\tHit!\n`);
      if (unitTwo['hitsLeft'] < 1)
      this.logSpecificText(`Player ${playerTwo['num']} ${unitTwo['type']} ${unitTwo['num']} was destroyed\n`);
    } else
    this.logSpecificText(`\t\t(Miss)\n`);
  }

  simpleLogEconomic(playerTaxes, playerIncome, initialPlayerCreds, finalPlayerCreds, purchases) {
    let totalCreds = initialPlayerCreds + playerIncome - playerTaxes;
    let totalCost = 0;
    this.logSpecificText(`\n\tInitial Creds : ${initialPlayerCreds} \n\tMaintenance : ${playerTaxes} \n\tIncome : ${playerIncome} \n\tTotal Creds : ${totalCreds}\n`);
    if (purchases['technology'].length > 0) {
      this.logSpecificText(`\tTechnology Purchases`);
      for (let techIndex in purchases['technology']) {
        let tech = purchases['technology'][techIndex];
        this.logSpecificText(`\t\t${tech[0]} | Cost : ${tech[1]}`);
        totalCost += tech[1];
      }
    }
    if (purchases['units'].length > 0) {
      this.logSpecificText(`\n\tUnit Purchases`);
      for (let unitIndex in purchases['units']) {
        let unit = purchases['units'][unitIndex];
        this.logSpecificText(`\t\tType : ${unit[0][0]} | Cost : ${unit[1]}`);
        totalCost += unit[1];
      }
    }
    this.logSpecificText(`\n\tTotal Cost : ${totalCost} \n\tFinal Creds : ${finalPlayerCreds}`);
  }

  logSpecificText(content) {
    fs.appendFileSync(this.activeFile, "\n" + content, { flag: 'a+' }, err => {
      if (err)
        console.log(err);
    })
  }
}

module.exports = Logger;