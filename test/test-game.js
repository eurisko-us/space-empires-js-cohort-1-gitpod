const Game = require("../src/game");
const Scout = require("../src/units/scout");
const gameTestingStrategies = require("../src/strategies/game-testing-strategies.js");
const StratOne = gameTestingStrategies.StratOne;
const StratTwo = gameTestingStrategies.StratTwo;

console.log(`\nTesting Simple Strategies`);

let testOne = new Game([StratOne, StratTwo], 13, {"Economic": null, "Movement": 3, "Combat": null}, 3);

console.log("0 player 0\n\n", testOne.players[0])
console.log("0 player 1\n\n", testOne.players[1])

testOne.generateState();
testOne.completeTurn();

console.log("\n\n1 player 0\n\n", testOne.players[0])
console.log("1 player 1\n\n", testOne.players[1])

testOne.turn += 1;

testOne.generateState();
testOne.completeTurn();

console.log("\n\n2 player 0\n\n", testOne.players[0])
console.log("2 player 1\n\n", testOne.players[1])

testOne.turn += 1;

testOne.generateState();
testOne.completeTurn();

console.log("\n\n3 player 0\n\n", testOne.players[0])
console.log("3 player 1\n\n", testOne.players[1])

testOne.turn += 1;
