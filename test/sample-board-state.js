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

sampleBoardState[JSON.stringify([7,0])]["planet"] = new Planet([7,0], null, null);
sampleBoardState[JSON.stringify([7,0])]["units"].push(new Scout(0, [7,0], 0, technology, turnCreated = 0));

sampleBoardState[JSON.stringify([7,12])]["planet"] = new Planet([7,12], null, null);
sampleBoardState[JSON.stringify([7,12])]["units"].push(new Scout(0, [7,12], 0, technology, turnCreated = 0));


