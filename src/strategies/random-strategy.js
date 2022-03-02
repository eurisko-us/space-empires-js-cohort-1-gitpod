const DefaultStrategy = require("../strategies/default-strategy.js")

class RandomStrat extends DefaultStrategy {
  constructor(playerIndex) {
    
    super(playerIndex);
    this.name = 'Random Strategy';
    
  }

  decideUnitMovement(unitIndex, gameState) {

    let unit = gameState["players"][this.playerIndex]["units"][unitIndex];
    let boardSize = gameState.boardSize;
    let possibleMoves = [
      [ 0, 1 ], 
      [ 1, 0 ],
      [ -1, 0 ],
      [ 0, -1 ]
    ];

    if (unit.type == "MiningShip" && unit.asteroid){

        let translation = this.bestMove(unit, gameState["players"][this.playerIndex]["homeworld"]["coords"]);
        return {"x": translation[0], "y": translation[1]};

    }

    while (true) {
      
      let rand = Math.floor(Math.random() * possibleMoves.length);
      let translation = possibleMoves[rand];
      let newCoords = [ unit.coords[0] + translation[0], unit.coords[1] + translation[1] ]

      if (newCoords[0] < 0 || newCoords[0] >= boardSize || newCoords[1] < 0 || newCoords[1] >= boardSize) {  continue; }

      return {"x": translation[0], "y": translation[1]};

    }

  }

  bestMove(unit, target){
    let possibleMoves = [
      [ 0, 1 ], 
      [ 1, 0 ],
      [ -1, 0 ],
      [ 0, -1 ]
    ];

    let start = unit.coords;
    let distances = possibleMoves.map(x => Math.sqrt((target[0] -(x[0] + start[0]))**2 + (target[1] - (x[1] + start[1]))**2));
    
    return possibleMoves[distances.indexOf(Math.min(...distances))];
  }

  decidePurchases(hiddenGameState) {

    let player = hiddenGameState["players"][this.playerIndex];
    let homeCoords = player["homeworld"]["coords"];
    let cp = JSON.parse(JSON.stringify(player["cp"])); // copy of players cp
    let ships = [ 
      //[ "Dreadnaught", 24 ],
      //[ "Battleship", 20 ], 
      //[ "Battlecruiser", 15 ],
      //[ "Base", 12 ],
      //[ "Cruiser", 12 ],
      //[ "Destroyer" ,9 ],
      //[ "Colony Ship", 8 ],
      [ "Scout", 6 ],
      [ "Shipyard", 6 ],
      //[ "Mining Ship", 5 ],
      //[ "Decoy", 1 ]
    ];   
    let purchases = [];

    while (true) { // add ships to cart

      if ( cp <= 10 ) { break; }

      let randomIndex = Math.floor(Math.random() * ships.length);
      let randomShip = ships[randomIndex];
      let currentShip = hiddenGameState.unitData[randomShip[0]];

      if (cp < randomShip[1]) { continue; } // if can't buy skip
      if (player.technology.shipsize < currentShip.shipsizeNeeded) { continue; } // tech no high enough skip
      let possiblePositions = [homeCoords];

      for (let unit of player.units) { 

        if (unit.type != "Shipyard") { continue; }
        
        possiblePositions.push(JSON.parse("[" + unit.coords + "]"));
      
      }

      for (let colony of player.colonies) { // if building a shipyard you can build on empty colony,

        if (currentShip.type != "Shipyard" && possiblePositions.indexOf(JSON.parse("[" + colony.coords + "]")) !== -1) { continue; }

        possiblePositions.push(JSON.parse("[" + colony.coords + "]"));        

      }

      randomIndex = Math.floor(Math.random() * possiblePositions.length);
      let randomPosition = possiblePositions[randomIndex];
      
      purchases.push([ randomShip[0], randomPosition ]);
      cp -= randomShip[1];

    }

    return purchases;

  }

}

module.exports.RandomStrat = RandomStrat;