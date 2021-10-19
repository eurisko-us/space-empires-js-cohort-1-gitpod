const fs = require('fs');
const path = require('path');

class Logger {

  constructor(logState, fileName = None){
    this.loggerState = logState;
    this.fileName    = fileName;
    this.currentDirectory = process.cwd()
    this.loggingFile = this.currentDirectory + "/" + this.fileName
    fs.truncate(this.loggingFile, 0, function(){console.log('done')})
  }

  log(content) {
    fs.writeFile(this.loggingFile,"\n" + content, { flag: 'a+' } , err => {
      if (err) {
        console.log(err);
      }
    })
  }
}

module.exports = Logger;