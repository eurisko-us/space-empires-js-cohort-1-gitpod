const fs = require('fs');
const dir = '/src'

class Logger {
  getActiveFile(currentPath) {
    // console.log(process.cwd()) // what directory ur in (for debugging)
    this.currentDirectory = process.cwd() + dir + currentPath;
    let newLogNumber = fs.readdirSync(this.currentDirectory).length;
    this.activeFileName = `log-${newLogNumber}.txt`;
    this.activeFile = `${this.currentDirectory}/${this.activeFileName}`;
    console.log(`active file ${this.activeFile}`);
   fs.truncate(this.activeFile, 0, function(){console.log('done')});
  }

  simpleLogMovement(oldGameState, newGameState, movementRound) {
    this.logSpecificText(`\n\tMovement Round ${movementRound}\n`);
    for (let playerNumber in newGameState['players']) {
      let player = newGameState['players'][playerNumber];
      let oldPlayer = oldGameState['players'][playerNumber];
      for (let shipIndex in player['units']) {
        let oldShipAttributes = oldPlayer['units'][shipIndex];
        let newShipAttributes = player['units'][shipIndex];
        if (!['Shipyard', 'Base', 'Home Base', 'Colony'].includes(newShipAttributes['type']) && (oldShipAttributes['coords'] != newShipAttributes['coords'])) {
          let shipString = `\t\tPlayer ${playerNumber} ${newShipAttributes['type']} ${newShipAttributes['num']}: ${oldShipAttributes['coords']} -> ${newShipAttributes['coords']}\n`;
          this.logSpecificText(shipString);
        }
      }
    }
  }
  
  endSimpleLogMovement(gameState) {
    this.logSpecificText(`\n\tEnding Unit Locations\n`);
    for (let playerNumber in gameState['players']) {
      let player = gameState['players'][playerNumber];
      let playerString = `\t\tPlayer ${playerNumber}\n`;
      this.logSpecificText(playerString);
      let homeBaseString = `\t\t\tHomeworld: ${player['homeworld']['coords']}\n`;
      this.logSpecificText(homeBaseString);
      for (let shipIndex in player['units']) {
        let shipAttributes = player['units'][shipIndex];
        let shipString = `\t\t\t${shipAttributes['type']} ${shipAttributes['num']}: ${shipAttributes['coords']}\n`;
        this.logSpecificText(shipString);
      }
    }
  }

  simpleLogCombatInitialization(gameState) {
    this.logSpecificText(`\n\tCombat Locations:\n`);
    for (let location in gameState['combat']) {
      let ships = gameState['combat'][location];
      let locationString = `\n\t\t${location}\n\n`;
      this.logSpecificText(locationString);
      for (let shipAttributes of ships) {
        let shipString = `\t\tPlayer ${shipAttributes['playerNumber']} ${shipAttributes['type']} ${shipAttributes['num']}`;
        this.logSpecificText(shipString);
      }
    }
  }

  simpleLogCombat(playerOne, shipOne, playerTwo, shipTwo, didShipOneHit, hitThreshold, currentRoll) {
    let strings = [`\t\tAttacker: Player ${playerOne['num']} ${shipOne['type']} ${shipOne['num']}\n`];
    strings.push(`\t\tDefender: Player ${playerTwo['num']} ${shipTwo['type']} ${shipTwo['num']}\n`);
    strings.push(`\t\tMiss threshold: ${hitThreshold}\n`);
    strings.push(`\t\tDie Roll: ${currentRoll}\n`);
    if (didShipOneHit) {
      strings.push(`\t\tHit!\n`);
      if (shipTwo['hitsLeft'] < 1)
        strings.push(`Player ${playerTwo['num']} ${shipTwo['type']} ${shipTwo['num']} was destroyed\n`);
    } else
      strings.push(`\t\t(Miss)\n`);
    for (let string of strings)
      this.logSpecificText(string);
  }

  endSimpleLogCombat(gameState) {
    this.logSpecificText(`\n\tSurvivors:\n`);
    for (let location in gameState['combat']) {
      let ships = gameState['combat'][location];
      this.logSpecificText(`\n\t${location}\n\n`);
      for (let shipAttributes of ships) {
        let shipString = `\t\tPlayer ${shipAttributes['playerNumber']} ${shipAttributes['type']} ${shipAttributes['num']}: ${shipAttributes['coords']}\n`;
        this.logSpecificText(shipString);
      }
    }
  }

  simpleLogEconomic(playerTaxes, playerIncome, initialPlayerCreds, finalPlayerCreds, purchases) {
    let playerString = `\n\tInitial Creds : ${initialPlayerCreds} \n\tMaintenance : ${playerTaxes} \n\tIncome : ${playerIncome} \n\tTotal Creds : ${initialPlayerCreds + playerIncome - playerTaxes}`;
    if (purchases['technology'].length > 0) {
      playerString += `\n\tTechnology Purchases\n`;
      for (let techIndex in purchases['technology']) {
        let tech = purchases['technology'][techIndex];
        playerString += `\t\t${tech[0]} | Cost : ${tech[1]}\n`;
      }
    }
    if (purchases['units'].length > 0) {
      playerString += `\n\tUnit Purchases\n`;
      for (let unitIndex in purchases['units']) {
        let unit = purchases['units'][unitIndex];
        playerString += `\t\tType : ${unit[0][0]} | Cost : ${unit[1]}\n`;
      }
    }
    playerString += `\n\tTotal Cost : ${initialPlayerCreds + playerIncome - playerTaxes - finalPlayerCreds} \n\tFinal Creds : ${finalPlayerCreds}`;
    this.logSpecificText(playerString);
  }

  logSpecificText(content) {
    fs.appendFileSync(this.activeFile, "\n" + content, { flag: 'a+' }, err => {
      if (err)
        console.log(err);
    })
  }
}

module.exports = Logger;