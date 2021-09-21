class Board {
  generateBoard(boardSize = 13) {
    this.grid = {};
      for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) 
          this.grid[{"x": x, "y": y}] = new Hex({"x": x, "y": y});
      }
    console.log(`yes ${JSON.stringify(this.grid)}`)
  }

  removeUnit(unit, game) {
    unit.destroy(game); // Remove current unit's player's refernce from the player's `units` array
    // Remove grid's reference to the current unit
    this.grid[String(unit.coords)].units.splice(this.grid[String((unit.position["x"], unit.position["y"]))].units.indexOf(unit)); // Removes the unit from the grid with the unit's location
  }

  moveShip(currentUnit, translation) { // Move unit reference from one hex to another
    console.log(`fuckyoujs0 ${JSON.stringify(this.grid)}`);
    let currentPosition = {"x": currentUnit.position["x"] - translation["x"], "y": currentUnit.position["y"] - translation["y"]};
    console.log(`fuckyoujs ${JSON.stringify(currentPosition)}`);
    let currentHex = this.grid[currentPosition];
    console.log(`fuckyoujs2 ${JSON.stringify(currentHex)}`);
    currentHex.removeUnit(currentUnit)
    let newPosition = {"x": currentUnit.position["x"], "y": currentUnit.position["y"]};
    console.log(`fuckyoujs3 ${JSON.stringify(newPosition)}`);
    let newHex = this.grid[newPosition];
    newHex.appendUnit(currentUnit)
    console.log(`fuckyoujs4 ${JSON.stringify(currentHex)}`);
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

class Hex extends Board {
  constructor(position, planet = false, asteroid = false) {
    super(null); // A Hex is a part of the board, so it has to inherit from the board
    this.position = position;
    this.units = []
    if (planet)
      this.planet = new Planet(this.position);
    else
      this.planet = null;
    if (asteroid)
      this.asteroid = new Asteroid(this.position);
    else
      this.asteroid = null;
  }

  sortForCombat() {
    return this.units.sort(order(firstShip,secondShip));
  }

  appendUnit(unit) {
    this.units.push(unit)
  }

  removeUnit(unit) {
    this.units.splice(this.units.indexOf(unit), 1)
  }
}

class Planet {
  constructor(position, colony = null, barren = false) { // `barren` is for later but simple
    this.position = position;
    this.colony = colony;
    this.barren = barren;
  } 
}

class Asteroid {
  constructor(position, deepSpace = false) { // `deepSpace` is for later but simple
    this.position = position;
    if (deepSpace)
      this.value = 10;
    else 
      this.value = 5;
  }
}

module.exports = Board;
module.exports.order = order;
module.exports.orderWithGameState = orderWithGameState;