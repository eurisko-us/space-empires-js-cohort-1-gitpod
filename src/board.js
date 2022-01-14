class Board {
  generateBoard(planetCoords, boardSize) {
    this.grid = {};
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        let currentCoords = x + ',' + y;
        let planetHere = false;
        if (planetCoords.includes(currentCoords))
          planetHere = true;
        let asteriodHere = false;
        this.grid[currentCoords] = new Hex(x + ',' + y, planetHere, asteriodHere);
      }
    }
  }

  generateState() {
    let state = {};
    for(let hexCoords in this.grid) {
      let hex = this.grid[hexCoords];
      let hexState = hex.generateState();
      state[hexCoords] = hexState;
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
    let currentCoords = (currentUnit.coords[0] - translation["x"]) + ',' + (currentUnit.coords[1] - translation["y"]);
    let currentHex = this.grid[currentCoords];
    currentHex.removeUnit(currentUnit)
    let newCoords = currentUnit.coords[0] + ',' + currentUnit.coords[1];
    let newHex = this.grid[newCoords];
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
  constructor(coords, planet, asteroid) {
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
    return this.units.map(x => x)
  }

  appendUnit(unit) {
    this.units.push(unit)
  }

  removeUnit(unit) {
    this.units.splice(this.units.indexOf(unit), 1)
  }

  generateState() {
    let planetState = null;
    if (this.planet != null)
      planetState = this.planet.generateState();

    let asteriodState = null;
    if (this.asteroid != null)
      asteriodState = this.asteroid.generateState();

    let unitState = [];
    for (let unitIndex in this.units)
      unitState.push(this.units[unitIndex].generateState());

    return {
      'coords': this.coords,
      'planet': planetState,
      'asteriod': asteriodState,
      'units': unitState
    };
  }
}

class Planet {
  constructor(coords, colony = null, barren = false) { // `barren` is for later but simple
    this.coords = coords;
    this.colony = colony;
    this.barren = barren;
  } 

  generateState() {
    let colonyState = null;
    if (this.colony != null)
      colonyState = this.colony.generateState();
      
    let status = 'habitable';
    if (this.barren)
      status = 'barren';

    return {'coords': this.coords, 'colony': colonyState, 'status': status};
    
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

  generateState() {
    return {
      'coords': this.coords,
      'value': this.value
    }
  }
}

module.exports.Board = Board;
module.exports.Planet = Planet;
module.exports.Asteroid = Asteroid;
module.exports.order = order;
module.exports.orderWithGameState = orderWithGameState;