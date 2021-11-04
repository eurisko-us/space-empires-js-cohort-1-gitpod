class Board {
  generateBoard(planetCoords, boardSize = 13) {
    this.grid = {};
    this.boardSize = 13;
    for (let x = 0; x < this.boardSize; x++) {
      for (let y = 0; y < this.boardSize; y++) {
        if (planetCoords.includes(String([x,y]))){
          this.grid[String([x,y])] = new Hex([x,y], true);
        }
        else{
          this.grid[String([x,y])] = new Hex([x,y]);
        }
      }
    }
  }

  removeUnit(unit, game) {
    unit.destroy(game); // Remove current unit's player's refernce from the player's `units` array
    // Remove grid's reference to the current unit
    this.grid[String(unit.coords)].removeUnit(unit) // Removes the unit from the grid with the unit's location
   //.splice(this.grid[String(unit.coords)].units.indexOf(unit)); 
 }

  moveUnit(currentUnit, translation) { // Move unit reference from one hex to another
    let currentCoord = String([currentUnit.coords[0] - translation["x"], currentUnit.coords[1] - translation["y"]]); 
    let currentHex = this.grid[currentCoord];
    currentHex.removeUnit(currentUnit)
    let newCoord = String(currentUnit.coords);
    let newHex = this.grid[newCoord];
    newHex.appendUnit(currentUnit)
  }
}

function order (firstUnit,secondUnit) {
  if (firstUnit.technology["tactics"] + firstUnit.fightingClass > secondUnit.technology["tactics"] + secondUnit.fightingClass) // If firstUnit has a tactical advantage
    return 1;
  else if (firstUnit.technology["tactics"] + firstUnit.fightingClass == secondUnit.technology["tactics"] + secondUnit.fightingClass) { // If both units are tied
    if (firstUnit.lastMoved["turn"] < secondUnit.lastMoved["turn"]) // If firstUnit moved first, last turn
      return 1;
    else if (firstUnit.lastMoved["turn"] == secondUnit.lastMoved["turn"]) {  // If both units are tied
      if (firstUnit.lastMoved["phase"] < secondUnit.lastMoved["phase"]) // If firstUnit moved first, last movement round
        return 1;
      else if (firstUnit.lastMoved["phase"] == secondUnit.lastMoved["phase"]) {  // If both units are tied
        if (firstUnit.lastMoved["playerIndex"] < secondUnit.lastMoved["playerIndex"])// If firstUnit has a lower player index
          return 1;
        else if (firstUnit.lastMoved["playerIndex"] == secondUnit.lastMoved["playerIndex"]) {  // If both units are fully tied which should be impossible
          return 0;
        }
      }
    }
  }
  return -1;
}

function orderWithGameState(firstUnit,secondUnit) { // But using gameState
  if (firstUnit["technology"]["tactics"] + firstUnit["fightingClass"] > secondUnit["technology"]["tactics"] + secondUnit["fightingClass"]) // If firstUnit has a tactical advantage
    return 1;
  else if (firstUnit["technology"]["tactics"] + firstUnit["fightingClass"] == secondUnit["technology"]["tactics"] + secondUnit["fightingClass"]) { // If both units are tied
    if (firstUnit["lastMoved"]["turn"] < secondUnit["lastMoved"]["turn"]) // If firstUnit moved first, last turn
      return 1;
    else if (firstUnit["lastMoved"]["turn"] == secondUnit["lastMoved"]["turn"]) {  // If both units are tied
      if (firstUnit["lastMoved"]["phase"] < secondUnit["lastMoved"]["phase"]) // If firstUnit moved first, last movement round
        return 1;
      else if (firstUnit["lastMoved"]["phase"] == secondUnit["lastMoved"]["phase"]) {  // If both units are tied
        if (firstUnit["lastMoved"]["playerIndex"] < secondUnit["lastMoved"]["playerIndex"])// If firstUnit has a lower player index
          return 1;
        else if (firstUnit["lastMoved"]["playerIndex"] == secondUnit["lastMoved"]["playerIndex"]) {  // If both units are fully tied which should be impossible
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

module.exports = Board;
module.exports.order = order;
module.exports.orderWithGameState = orderWithGameState;