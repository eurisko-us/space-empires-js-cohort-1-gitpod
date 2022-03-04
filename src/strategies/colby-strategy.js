const DefaultStrategy = require("../strategies/default-strategy.js")

class ColbyStrat extends DefaultStrategy {
  constructor(playerIndex) {
    
    super(playerIndex);
    this.name = 'Best Strategy';
    this.miscShipsPlaceMoved = {}; // "type: id": [positions where they've been] 
    this.possiblePurchases = [ "shipsize", "shipsize", "shipsize", "shipyard", "shipyard", "movement", "movement", "movement", "tactics", "tactics", "tactics", "attack", "attack", "attack" ];
    
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

    if (unit.type == "MiningShip" && unit.asteroid) {

        let translation = this.bestMove(unit, gameState["players"][this.playerIndex]["homeworld"]["coords"]);
        return {"x": translation[0], "y": translation[1]};

    } else if (unit.type == "MiningShip" || unit.type == "ColonyShip") { // controlled random movement for mining ships and colony ships

        while (true) {
        
        let rand = Math.floor(Math.random() * possibleMoves.length);
        let translation = possibleMoves[rand];
        let newCoords = [ unit.coords[0] + translation[0], unit.coords[1] + translation[1] ];

        if (newCoords[0] < 0 || newCoords[0] >= boardSize || newCoords[1] < 0 || newCoords[1] >= boardSize) { continue; } // need to change

        let unitId = `${unit.type}: ${unit.id}`;

        if (!(unitId in this.miscShipsPlaceMoved)) { this.miscShipsPlaceMoved[unitId] = []; } // if key doesnt exist create key

        if (this.miscShipsPlaceMoved[unitId].includes(newCoords)) { continue; } // so it doesnt cover old ground

        return {"x": translation[0], "y": translation[1]};

        }

    }

  }

  decidePurchases(hiddenGameState) {

    let purchases = [];
    let player = hiddenGameState["players"][this.playerIndex];
    let cp = JSON.parse(JSON.stringify(player["cp"])); // copy of players cp
    let closestEnemyShip = findClosestEnemyShipDistance(hiddenGameState);
    //let closestEnemyShipDistance = stuff

    while (closestEnemyShipDistance > 6 && cp > 0 && this.possiblePurchases.length > 0) {

        let possiblePurchase = this.possiblePurchases[0];
        cp -= hiddenGameState.technologyData[possiblePurchase][player.technology[possiblePurchase]];
        purchases.push(possiblePurchase); // add purchase to cart
        this.possiblePurchases.shift(); // remove first element of array

    }

    let buildingCapacity = {}; // { colony coords: [ available building capacity, current hullsize being built ] }

    for (let colony of player.colonies) {

      buildingCapacity[ JSON.parse("[" + colony.coords + "]") ] = [/* something */, 0];

    }

    while (closestEnemyShipDistance <= 6 && cp > 6) {

      let closestColonyToClosestEnemyShip = getClosestColoniesToClosestEnemyShip( JSON.parse(JSON.stringify(player)), closestEnemyShip, buildingCapacity )[0]; // [closest colony, 2nd closest colony, ...] excluding colonies that have maxed out building capacity
      let parsedColonyCoords = JSON.parse("[" + closestColonyToClosestEnemyShip[0].coords + "]");// [x,y]
      let currentBuildingCapacity = buildingCapacity[parsedColonyCoords]; // [max hullsize capability, current hullsize used]
      let bestShipPurchase = getBestShipPurchase( cp, player.technologyData.shipsize, currentBuildingCapacity); // [type, hullsize]
      
      if (bestShipPurchase) { // if i can buy, then buy

        purchases.push([ bestShipPurchase[0], parsedColonyCoords]);
        buildingCapacity[parsedColonyCoords] += bestShipPurchase[1];

      }

    }

    return purchases;

    
    let homeCoords = player["homeworld"]["coords"];
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
      
      if (hiddenGameState.technologyData.shipsize < currentShip.shipsizeNeeded) { continue; } // tech no high enough skip
      
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

  bestMove(unit, target) {

    let possibleMoves = [
      [ 0, 1 ], 
      [ 1, 0 ],
      [ -1, 0 ],
      [ 0, -1 ]
    ];
    let start = unit.coords;
    let distances = possibleMoves.map(move => Math.sqrt((target[0] - (move[0] + start[0]))**2 + (target[1] - (move[1] + start[1]))**2));
    
    return possibleMoves[distances.indexOf(Math.min(...distances))];

  }

  getBestShipPurchase(cp, shipSize, buildingCapacity) { // if it has money, shipsize, and building capacity to build then buy

    if (cp >= 12 && shipSize > 2 && buildingCapacity[0] >= buildingCapacity[1] + 3) { return [ "Cruiser", 3 ]; }
    if (12 > cp >= 9 && shipSize > 1 && buildingCapacity[0] >= buildingCapacity[1] + 2) { return [ "Destroyer" , 2 ]; }
    if (9 > cp >= 6 && buildingCapacity[0] >= buildingCapacity[1] + 1) { return [ "Scout", 1 ]; }
    else { return null; }

  }

  getClosestColoniesToClosestEnemyShip(player, closestEnemyShip, buildingCapacity) {

    player.colonies.sort( function(colonyOne, colonyTwo) { // sort colonies on distance to closest enemy ship(s)

      colonyOneDistance = distance(colonyOne, closestEnemyShip);
      colonyTwoDistance = distance(colonyTwo, closestEnemyShip);

      if (colonyOneDistance < colonyTwoDistance) { return -1; }
      if (colonyOneDistance > colonyTwoDistance) { return 1; }
      else { return 0; }

    });

    let availableColonies = [];

    for (let colony of player.colonies) { // exclude colonies that have reached max building capacity

      let currentBuildingCapacity = buildingCapacity[JSON.parse("[" + colony.coords + "]")];

      if ( currentBuildingCapacity[0] > currentBuildingCapacity[1] ) { availableColonies.push(colony); }

    }

    return availableColonies;

  }

  distance(unitOne, unitTwo) { return ( unitOne.coords[0] - unitTwo.coords[0] ) ^ 2 + ( unitOne.coords[1] - unitTwo.coords[1] ) ^ 2; }

}

module.exports.ColbyStrat = ColbyStrat;