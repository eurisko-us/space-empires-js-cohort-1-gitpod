const DefaultStrategy = require("../strategies/default-strategy.js")


class RandomStrat extends DefaultStrategy {
  constructor(playerIndex) {
    super(playerIndex);
    this.name = 'Strategy One';
  }

  decideUnitMovement(unitIndex, gameState) {
    let unit = gameState["players"][this.playerIndex]["units"][unitIndex]
    let boardSize = gameState.boardSize
    let possMoves = [[0,1], [1,0], [-1,0], [0,-1], [0,0]]
    while(True){
      let rand = Math.floor(Math.random() * 5)
      let newX = unit["coords"]["x"] + possMoves[rand][0]
      let newY = unit["coords"]["y"] + possMoves[rand][1]
      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize){
        return {"x": possMoves[rand][0], "y": possMoves[rand][1]};
      }
    }
  }

  decidePurchases(hiddenGameState) {
    let homeCoords = hiddenGameState["players"][this.playerIndex]["homeworld"]["coords"];
    let cp = hiddenGameState["players"][this.playerIndex]["cp"];
    let ships = [["Battleship",20],["Battlecruiser",15],["Cruiser",12],["Destroyer",9],["Dreadnaught",24],["Scout",6],["Decoy",1],["Colonyship",8]];
    let randShip = Math.floor(Math.random() * ships.length)
    if (cp > ships[randShip][1]){
      return [ships[randShip][0],homeCoords];
    }
  }

}

module.exports.RandomStrat = RandomStrat