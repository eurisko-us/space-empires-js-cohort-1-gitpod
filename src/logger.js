const fs = require('fs');
const path = require('path');
const dir = './src/logs'

class Logger {
  getActiveFile(path, isCurrentFile) {
    // console.log(process.cwd()) // what directory ur in (for debugging)
    if (isCurrentFile) {
      newLogNumber = 0;
    } else {
      newLogNumber = 1;
    }
    fs.readdir(dir, (err, files) => {
      newLogNumber += 1;
    }
    this.activeFileName = `/log_${newLogNumber}`.txt';
    this.activeFile = `${this.currentDirectory}/${this.activeFileName}`;
    if (!isCurrentFile) {
      fs.truncate(this.activeFile, 0, function(){console.log('done')});
    }
  }

  simpleLogMovement(oldGameState, newGameState, movementRound, logColonies, logShipYards) {
    this.logSpecificText(`\n\tMovement Round ${movementRound}\n`);
    for (playerNumber of newGameState['players']) {
      player = gameState['players'][playerNumber];
      oldPlayer = oldGameState['players'][playerNumber];
      for (shipIndex in player['units']) {
        shipAttributes = player[shipIndex];
        if (!['Shipyard', 'Base', 'Home Base', 'Colony'].includes(shipAttributes['type']) && (oldPlayer['units'][shipIndex]['coords'] != shipAttributes['coords'])) {
          shipString = `\t\tPlayer ${playerNumber} ${shipAttributes['type']} ${shipAttributes['num']}: ${oldPlayer['units'][shipIndex]['coords'])} -> ${shipAttributes['coords']}\n`;
          this.logSpecificText(shipString);
        }
      }
    }
  }
  
  endSimpleLogMovement(gameState) {
    this.logSpecificText(`\n\tEnding Unit Locations\n`);
    for (playerNumber of gameState['players']) {
      player = gameState['players'][playerNumber];
      homeBaseString = `\n\t\tPlayer ${playerNumber} Homeworld: ${player['homeworld']['coords']}\n`;
      this.logSpecificText(homeBaseString);
      for (shipAttributes of player['units']) {
        shipString = `\t\tPlayer ${playerNumber} ${shipAttributes['type']} ${shipAttributes['num']}: ${shipAttributes['coords']}\n`;
        this.logSpecificText(shipString);
      }
    }
  }

  simpleLogCombatInitialization(gameState) {
    this.logSpecificText(`\n\tCombat Locations:\n`);
    for (location of gameState['combat']) {
      ships = gameState['combat'][location];
      locationString = `\n\t\t${location}\n\n`;
      this.logSpecificText(locationString);
      for (shipAttributes in ships)
        shipString = `\t\tPlayer ${shipAttributes['playerNumber']} ${shipAttributes['type']} ${shipAttributes['num']}`;
    }
  }

  simpleLogCombat(playerOne, shipOne, playerTwo, shipTwo, didShipOneHit, hitThreshold, currentRoll) {
    strings = [`\t\tAttacker: Player ${playerOne['num']} ${shipOne['type']} ${shipOne['num']}`];
    strings.append(`\t\tDefender: Player ${playerTwo['num']} ${shipTwo['type']} ${shipTwo['num']}`);
    strings.append(`\t\tMiss threshold: ${hitThreshold}`);
    strings.append(`\t\tDie Roll: ${currentRoll}`);
    if (didShipOneHit) {
      strings.append(`\t\tHit!\n`);
      if (shipTwo['hitsLeft'] < 1)
        strings.append(`Player ${playerTwo['num']} ${shipTwo['type']} ${shipTwo['num']} was destroyed\n`);
    } else
      strings.append(`\t\t(Miss)\n`);
    for (string of strings)
      this.logSpecificText(string);
  }

  endSimpleLogCombat(gameState) {
    this.logSpecificText(`\n\tSurvivors:\n`);
    for (location of gameState['combat']) {
      ships = gameState['combat'][location];
      this.logSpecificText(`\n\t${location}\n\n`);
      for (shipAttributes of ships) {
        shipString = `\t\tPlayer ${shipAttributes['playerNumber']} ${shipAttributes['type']} ${shipAttributes['num']}: ${shipAttributes['coords']}\n`;
        this.logSpecificText(shipString);
      }
    }
  }

  logSpecificText(content) {
    fs.writeFile(this.loggingFile,"\n" + content, { flag: 'a+' } , err => {
      if (err)
        console.log(err);
    })
  }

}

module.exports = Logger;