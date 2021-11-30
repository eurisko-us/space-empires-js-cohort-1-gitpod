class Board {
  generateBoard(planetCoords, boardSize = 13) {
    this.grid = {};
    this.boardSize = 13;
    for (let x = 0; x < this.boardSize; x++) {
      for (let y = 0; y < this.boardSize; y++) {
        if (planetCoords.includes(String([x,y]))){
          this.grid[[x,y]] = new Hex({"x": x, "y": y, }, true);
          // console.log("boogy")
        }
        else{
          this.grid[[x,y]] = new Hex({"x": x, "y": y});
        }

      }
    }
  }

  generateState() {
    let state = {};
    for(let hex in this.grid) {
      let hexObject = this.grid[hex];
      state[hex] == {'planet':null, 'units':[]};
      try{
        state[hex]['planet'] = hexObject.planet.generateState();
      }
      catch(err){}

      for(let unit in hexObject.units){
        state[hex]['units'].push(unit.generateState());
      }
    };
    return state;
  }

  removeUnit(unit, game) {
   unit.destroy(game); // Remove current unit's player's refernce from the player's `units` array
   // Remove grid's reference to the current unit
   this.grid[unit.coords].removeUnit(unit) // Removes the unit from the grid with the unit's location
   //.splice(this.grid[String(unit.coords)].units.indexOf(unit)); 
 }

  moveShip(currentUnit, translation) { // Move unit reference from one hex to another
    let currentCoord = String([currentUnit.coords[0] - translation["x"], currentUnit.coords[1] - translation["y"]]); 
    let currentHex = this.grid[currentCoord];
    currentHex.removeUnit(currentUnit)
    let newCoord = String(currentUnit.coords);
    let newHex = this.grid[newCoord];
    newHex.appendUnit(currentUnit)
  }
}

function order (firstShip,secondShip) {
  if (firstShip.technology["tactics"] + firstShip.fightingClass > secondShip.technology["tactics"] + secondShip.fightingClass) // If firstShip has a tactical advantage
    return 1;
  else if (firstShip.technology["tactics"] + firstShip.fightingClass == secondShip.technology["tactics"] + secondShip.fightingClass) { // If both ships are tied
    if (firstShip.lastMoved["turn"] < secondShip.lastMoved["turn"]) // If firstShip moved first, last turn
      return 1;
    else if (firstShip.lastMoved["turn"] == secondShip.lastMoved["turn"]) {  // If both ships are tied
      if (firstShip.lastMoved["phase"] < secondShip.lastMoved["phase"]) // If firstShip moved first, last movement round
        return 1;
      else if (firstShip.lastMoved["phase"] == secondShip.lastMoved["phase"]) {  // If both ships are tied
        if (firstShip.lastMoved["playerIndex"] < secondShip.lastMoved["playerIndex"])// If firstShip has a lower player index
          return 1;
        else if (firstShip.lastMoved["playerIndex"] == secondShip.lastMoved["playerIndex"]) {  // If both ships are fully tied which should be impossible
          return 0;
        }
      }
    }
  }
  return -1;
}

function orderWithGameState(firstShip,secondShip) { // But using gameState
  if (firstShip["technology"]["tactics"] + firstShip["fightingClass"] > secondShip["technology"]["tactics"] + secondShip["fightingClass"]) // If firstShip has a tactical advantage
    return 1;
  else if (firstShip["technology"]["tactics"] + firstShip["fightingClass"] == secondShip["technology"]["tactics"] + secondShip["fightingClass"]) { // If both ships are tied
    if (firstShip["lastMoved"]["turn"] < secondShip["lastMoved"]["turn"]) // If firstShip moved first, last turn
      return 1;
    else if (firstShip["lastMoved"]["turn"] == secondShip["lastMoved"]["turn"]) {  // If both ships are tied
      if (firstShip["lastMoved"]["phase"] < secondShip["lastMoved"]["phase"]) // If firstShip moved first, last movement round
        return 1;
      else if (firstShip["lastMoved"]["phase"] == secondShip["lastMoved"]["phase"]) {  // If both ships are tied
        if (firstShip["lastMoved"]["playerIndex"] < secondShip["lastMoved"]["playerIndex"])// If firstShip has a lower player index
          return 1;
        else if (firstShip["lastMoved"]["playerIndex"] == secondShip["lastMoved"]["playerIndex"]) {  // If both ships are fully tied which should be impossible
          return 0;
        }
      }
    }
  }
  return -1;
}

class Hex {
  constructor(coords, planet = false, asteroid = false) {
    this.coords = coords;
    this.units = [];
    if (planet)
      this.planet = new Planet(this.coords);
    else
      this.planet = null;
    if (asteroid)
      this.asteroid = new Asteroid(this.coords);
    else
      this.asteroid = null;
  }

  sortForCombat() {
    this.units = this.units.sort(order);
    return this.units
  }

  appendUnit(unit) {
    this.units.push(unit)
  }

  removeUnit(unit) {
    this.units.splice(this.units.indexOf(unit), 1)
  }
}

class Planet {
  constructor(coords, colony = null, barren = false) { // `barren` is for later but simple
    this.coords = coords;
    this.colony = colony;
    this.barren = barren;
  } 

  generateState() {
    if(this.colony){
       return {coord:this.coords, colony: this.colony.generateState()};
    }else{
      return {coord:this.coords, colony: null};
    }
  }
}

class Asteroid {
  constructor(coords, deepSpace = false) { // `deepSpace` is for later but simple
    this.coords = coords;
    if (deepSpace)
      this.value = 10;
    else 
      this.value = 5;
  }
}

module.exports.Board = Board;
module.exports.Planet = Planet;
module.exports.Asteroid = Asteroid;
module.exports.order = order;
module.exports.orderWithGameState = orderWithGameState;

b = new Board()
b.generateBoard([[0,0],[1,1]])
b.generateState()