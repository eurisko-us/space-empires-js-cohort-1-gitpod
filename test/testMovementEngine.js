const Game = require("../src/game")
const Scout = require("../src/units/scout")
const MoveRightStrat = require("../src/strategies/move-direction-strategies.js")
const MoveDownStrat = require("../src/strategies/move-direction-strategies.js")
const MoveLeftStrat = require("../src/strategies/move-direction-strategies.js")
const MoveUpStrat = require("../src/strategies/move-direction-strategies.js")

let testOne = new Game([MoveRightStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testOne.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testOne.players[0].technology))

testOne.generateState(phase = "Movement");
testOne.movementEngine.completeMovementPhase(testOne, 1);

if (testOne.players[0].units[0].position != {"x": 7, "y": 6})
  console.log(`Test 1 did not pass, the ship did not move to the right, 1 hex. The final position was ${JSON.stringify(testOne.players[0].units[0].position)}`);

let testTwo = new Game([MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testTwo.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testTwo.players[0].technology))

testTwo.generateState(phase = "Movement");
testTwo.movementEngine.completeMovementPhase(testTwo, 1);

if (testTwo.players[0].units[0].position != {"x": 6, "y": 7})
  console.log(`Test 2 did not pass, the ship did not move downwards, 1 hex. The final position was ${JSON.stringify(testTwo.players[0].units[0].position)}`);

let testThree = new Game([MoveLeftStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testThree.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testThree.players[0].technology))

testThree.generateState(phase = "Movement");
testThree.movementEngine.completeMovementPhase(testThree, 1);

if (testThree.players[0].units[0].position != {"x": 5, "y": 6})
  console.log(`Test 3 did not pass, the ship did not move to the left, 1 hex. The final position was ${JSON.stringify(testThree.players[0].units[0].position)}`);

let testFour = new Game([MoveUpStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testFour.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testFour.players[0].technology))

testFour.generateState(phase = "Movement");
testFour.movementEngine.completeMovementPhase(testFour, 1);

if (testFour.players[0].units[0].position != {"x": 6, "y": 5})
  console.log(`Test 4 did not pass, the ship did not move upwards, 1 hex. The final position was ${JSON.stringify(testFour.players[0].units[0].position)}`);

let testFive = new Game([MoveRightStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testFive.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testFive.players[0].technology))

testFive.generateState(phase = "Movement");
testFive.movementEngine.completeMovementPhase(testFive, 1);

if (testFive.players[0].units[0].position != {"x": 9, "y": 6})
  console.log(`Test 5 did not pass, the ship did not move to the right, 3 hexes. The final position was ${JSON.stringify(testFive.players[0].units[0].position)}`);

let testSix = new Game([MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testSix.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testSix.players[0].technology))

testSix.generateState(phase = "Movement");
testSix.movementEngine.completeMovementPhase(testSix, 1);

if (testSix.players[0].units[0].position != {"x": 6, "y": 9})
  console.log(`Test 6 did not pass, the ship did not move downwards, 3 hexes. The final position was ${JSON.stringify(testSix.players[0].units[0].position)}`);

let testSeven = new Game([MoveLeftStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testSeven.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testSeven.players[0].technology))

testSeven.generateState(phase = "Movement");
testSeven.movementEngine.completeMovementPhase(testSeven, 1);

if (testSeven.players[0].units[0].position != {"x": 3, "y": 6})
  console.log(`Test 7 did not pass, the ship did not move to the left, 3 hexes. The final position was ${JSON.stringify(testSeven.players[0].units[0].position)}`);

let testEight = new Game([MoveUpStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testEight.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testEight.players[0].technology))

testEight.generateState(phase = "Movement");
testEight.movementEngine.completeMovementPhase(testEight, 1);

if (testEight.players[0].units[0].position != {"x": 6, "y": 3})
  console.log(`Test 8 did not pass, the ship did not move upwards, 3 hexes. The final position was ${JSON.stringify(testEight.players[0].units[0].position)}`);

upgradedTech = { "attack": 0, "defense": 0, "movement": 6, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };

let testNine = new Game([MoveRightStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testNine.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testNine.generateState(phase = "Movement");
testNine.movementEngine.completeMovementPhase(testNine, 1);

if (testNine.players[0].units[0].position != {"x": 12, "y": 6})
  console.log(`Test 9 did not pass, the ship did not move to the right, 6 hexes. The final position was ${JSON.stringify(testNine.players[0].units[0].position)}`);

let testTen = new Game([MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testTen.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testTen.generateState(phase = "Movement");
testTen.movementEngine.completeMovementPhase(testTen, 1);

if (testTen.players[0].units[0].position != {"x": 6, "y": 12})
  console.log(`Test 10 did not pass, the ship did not move downwards, 6 hexes. The final position was ${JSON.stringify(testTen.players[0].units[0].position)}`);

let testEleven = new Game([MoveLeftStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testEleven.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testEleven.generateState(phase = "Movement");
testEleven.movementEngine.completeMovementPhase(testEleven, 1);

if (testEleven.players[0].units[0].position != {"x": 0, "y": 6})
  console.log(`Test 11 did not pass, the ship did not move to the left, 6 hexes. The final position was ${JSON.stringify(testEleven.players[0].units[0].position)}`);

let testTwelve = new Game([MoveUpStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testTwelve.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testTwelve.generateState(phase = "Movement");
testTwelve.movementEngine.completeMovementPhase(testTwelve, 1);

if (testTwelve.players[0].units[0].position != {"x": 6, "y": 0})
  console.log(`Test 12 did not pass, the ship did not move upwards, 6 hexes. The final position was ${JSON.stringify(testTwelve.players[0].units[0].position)}`);

let testThirteen = new Game([MoveUpStrat, MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testThirteen.players[0].units.push(new Scout(0, {"x": 6,"y": 7}, 0, upgradedTech))

testThirteen.players[1].units.push(new Scout(0, {"x": 6,"y": 5}, 0, upgradedTech))

testThirteen.generateState(phase = "Movement");
testThirteen.movementEngine.completeMovementPhase(testThirteen, 1);

if (testThirteen.players[0].units[0].position != {"x": 6, "y": 6} && testThirteen.players[1].units[0].position != {"x": 6, "y": 6})
  console.log(`Test 13 did not pass, the ships moved past eachother. The final position of the first unit was ${JSON.stringify(testThirteen.players[0].units[0].position)}. The final position of the second unit was ${JSON.stringify(testThirteen.players[1].units[0].position)}`);