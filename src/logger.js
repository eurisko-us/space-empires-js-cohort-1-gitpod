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
    let logs = '';
    this.logSpecificText(`\n\tMovement Round ${movementRound}\n`);
    for (let playerNumber in newGameState['players']) {
      let player = newGameState['players'][playerNumber];
      let oldPlayer = oldGameState['players'][playerNumber];
      for (let unitIndex in player['units']) {
        let oldUnitAttributes = oldPlayer['units'][unitIndex];
        let newUnitAttributes = player['units'][unitIndex];
        if (!['Shipyard', 'Base', 'Homeworld', 'Colony'].includes(newUnitAttributes['type']) && (oldUnitAttributes['coords'] != newUnitAttributes['coords'])) {
          let number = parseInt(playerNumber) + 1;
          let text = `Player ${number} ${newUnitAttributes['type']} ${(newUnitAttributes['num'] + 1)}: ${oldUnitAttributes['coords']} -> ${newUnitAttributes['coords']}\n`;
          logs += text;
          this.logSpecificText('\t\t' + text); 
        }
      }
    }
    return logs;
  }
  
  endSimpleLogMovement(gameState) {
    let logs = '';
    logs += this.logSpecificText(`\n\tEnding Unit Locations\n`);
    for (let playerNumber in gameState['players']) {
      let player = gameState['players'][playerNumber];
      logs += this.logSpecificText(`\t\tPlayer ${(playerNumber + 1)}\n`);
      logs += this.logSpecificText(`\t\t\tHomeworld: ${player['homeworld']['coords']}\n`);
      for (let unitIndex in player['units']) {
        let unitAttributes = player['units'][unitIndex];
        logs += this.logSpecificText(`\t\t\t${unitAttributes['type']} ${(unitAttributes['num'] + 1)}: ${unitAttributes['coords']}\n`);
      }
    }
    logs += this.logSpecificText(`\nEND OF TURN ${gameState['turn']} MOVEMENT PHASE\n`);
    return logs;
  }

  simpleLogCombatInitialization(gameState) {
    let logs = '';
    this.logSpecificText('\n\t');
    //logs += this.logSpecificText(`Combat Locations:\n`);
    for (let location in gameState['combat']) {
      let units = gameState['combat'][location];
      this.logSpecificText('\t');
      //logs += this.logSpecificText(`\t(${location})\n`);
      for (let unitAttributes of units) {
        this.logSpecificText('\t');
        logs += this.logSpecificText(`\t\tPlayer ${(unitAttributes['playerIndex'] + 1)} ${unitAttributes['type']} ${(unitAttributes['num'] + 1)}`);
      }
    }
    return logs;
  }

  simpleLogCombat(playerOneIndex, unitOne, playerTwoIndex, unitTwo, didUnitOneHit, hitThreshold, currentRoll) {
    let logs = '';
    this.logSpecificText(`\t`);
    logs += this.logSpecificText(`\tAttacker: Player ${(playerOneIndex + 1)} ${unitOne['type']} ${(unitOne['num'] + 1)}\n`);
    this.logSpecificText(`\t`);
    logs += this.logSpecificText(`\tDefender: Player ${(playerTwoIndex + 1)} ${unitTwo['type']} ${(unitTwo['num'] + 1)}\n`);
    this.logSpecificText(`\t`);
    logs += this.logSpecificText(`\tMiss threshold: ${hitThreshold}\n`);
    this.logSpecificText(`\t`);
    logs += this.logSpecificText(`\tDie Roll: ${currentRoll}\n`);

    if (didUnitOneHit) {
      this.logSpecificText(`\t`);
      logs += this.logSpecificText(`\tHit!\n`);
      if (unitTwo['hitsLeft'] < 1) {
        this.logSpecificText(`\t`);
        logs += this.logSpecificText(`\n\tPlayer ${(playerTwoIndex + 1)} ${unitTwo['type']} ${(unitTwo['num'] + 1)} was destroyed\n`);
      }
    } else {
      this.logSpecificText(`\t`);
      logs += this.logSpecificText(`\t(Miss)\n`);
    }
      
    return logs;
  }

  simpleLogEconomic(playerTaxes, playerIncome, initialPlayerCreds, finalPlayerCreds, purchases) {
    let logs = '';
    let totalCreds = initialPlayerCreds + playerIncome - playerTaxes;
    let totalCost = 0;
    logs += '\n' + this.logSpecificText(`\n\tInitial Creds : ${initialPlayerCreds} \n\tMaintenance : ${playerTaxes} \n\tIncome : ${playerIncome} \n\tTotal Creds : ${totalCreds}\n`);
    if (purchases['technology'].length > 0) {
      logs += '\n' + this.logSpecificText(`\tTechnology Purchases`);
      for (let techIndex in purchases['technology']) {
        let tech = purchases['technology'][techIndex];
        logs += '\n' + this.logSpecificText(`\t\t${tech[0]} | Cost : ${tech[1]}`);
        totalCost += tech[1];
      }
    }
    if (purchases['units'].length > 0) {
      logs += '\n' +  this.logSpecificText(`\n\tUnit Purchases`);
      for (let unitIndex in purchases['units']) {
        let unit = purchases['units'][unitIndex];
        logs += '\n' + this.logSpecificText(`\t\tType : ${unit[0][0]} | Cost : ${unit[1]}`);
        totalCost += unit[1];
      }
    }
    logs += '\n' + this.logSpecificText(`\n\tTotal Cost : ${totalCost} \n\tFinal Creds : ${finalPlayerCreds}`);
    return logs;
  }

  logSpecificText(content) {
    fs.appendFileSync(this.activeFile, "\n" + content, { flag: 'a+' }, err => {
      if (err)
        console.log(err);
    });
    return content;
  }
}

module.exports = Logger;