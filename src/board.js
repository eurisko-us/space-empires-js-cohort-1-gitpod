class Board {
  constructor(boardSize = 13) {
    this.grid = {};
      for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) 
          this.grid[String((x,y))]= new Hex((x,y));
      }
  }

  removeUnit(unit, game) {
    unit.destroy(game); // Remove current unit's player's refernce from the player's `units` array
    // Remove grid's reference to the current unit
    this.grid[String(unit.coords)].units.splice(this.grid[String(unit.coords)].units.indexOf(unit)); // Removes the unit from the grid with the unit's location
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

class Hex {
  constructor(coord, planet = false, asteroid = false) {
    this.coord = coord;
    this.units = [];
    if (planet)
      this.planet = new Planet();
    else
      this.planet = null;
    if (asteroid)
      this.asteroid = new Asteroid();
    else
      this.asteroid = null;
  }

  sortForCombat() {
    return this.units.sort(order(firstShip,secondShip));
  }
}

class Planet {
  constructor(colony = null, barren = false) { // `barren` is for later but simple
    this.colony = colony;
    this.barren = barren;
  } 
}

class Asteroid {
  constructor(deepSpace = false) { // `deepSpace` is for later but simple
    if (deepSpace)
      this.value = 10;
    else 
      this.value = 5;
  }
}

module.exports = Board;