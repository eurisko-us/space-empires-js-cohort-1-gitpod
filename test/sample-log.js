const Game = require("../src/game");
const gameTestingStrategies = require("../src/strategies/game-testing-strategies.js");
const StratOne = gameTestingStrategies.StratOne;
const StratTwo = gameTestingStrategies.StratTwo;

console.log(`\nTesting Simple Strategies`);

let testOne = new Game([StratOne, StratTwo], 13, {"Movement": 3, "Combat": null, "Economic": null}, 10, true);

testOne.play();

console.log('complete');