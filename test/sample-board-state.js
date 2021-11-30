const Game = require("../src/game");
const Scout = require("../src/units/scout.js");
const moveDirectionStrategies = require("../src/strategies/move-direction-strategies.js");
const MoveDownStrat = moveDirectionStrategies.MoveDownStrat;
const MoveUpStrat = moveDirectionStrategies.MoveUpStrat;
const BoardClasses = require("../src/board.js");
const Planet = BoardClasses.Planet;

let sampleBoardState = {}

for (let x = 0; x < 13; x++) {
  for (let y = 0; y < 13; y++) {
    sampleBoardState[JSON.stringify([x,y])] = {
      "planet": null,
      "units": []
    }
  }
}

let technology = { "attack": 0, "defense": 0, "movement": 1, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };

let sample_planet_one = new Planet([7,0], null, null);
let sample_unit_one   = new Scout(0, [7,0], 0, technology, turnCreated = 0);
sampleBoardState[JSON.stringify([7,0])]["planet"] = JSON.stringify(sample_planet_one.generateState());
sampleBoardState[JSON.stringify([7,0])]["units"].push(JSON.stringify(sample_unit_one.generateState()));

let sample_planet_two = new Planet([7,12], null, null);
let sample_unit_two = new Scout(0, [7,12], 0, technology, turnCreated = 0);
sampleBoardState[JSON.stringify([7,12])]["planet"] = JSON.stringify(sample_planet_two.generateState());
sampleBoardState[JSON.stringify([7,12])]["units"].push(JSON.stringify(sample_unit_two.generateState()));

console.log(sampleBoardState);