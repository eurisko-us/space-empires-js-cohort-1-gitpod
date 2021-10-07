const Game = require("../src/game");
const Scout = require("../src/units/scout");
const moveDirectionStrategies = require("../src/strategies/move-direction-strategies.js");
const MoveRightStrat = moveDirectionStrategies.MoveRightStrat;
const MoveDownStrat = moveDirectionStrategies.MoveDownStrat;
const MoveLeftStrat = moveDirectionStrategies.MoveLeftStrat;
const MoveUpStrat = moveDirectionStrategies.MoveUpStrat;

console.log(`\nTesting Basic Movement`);

let testOne = new Game([MoveRightStrat], maxTurns = 1, phaseStats = {"Movement": 1});

testOne.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testOne.players[0].technology));

testOne.generateState(phase = "Movement");
testOne.movementEngine.completeMovementPhase(testOne, 1);

if (JSON.stringify(testOne.players[0].units[0].coords) != JSON.stringify({"x": 7, "y": 6}))
  console.log(`\n\tTest 1 did not pass, the ship did not move to the right, 1 hex. The final coords was ${JSON.stringify(testOne.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 1 Passed!`)

let testTwo = new Game([MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 1});

testTwo.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testTwo.players[0].technology));

testTwo.generateState(phase = "Movement");
testTwo.movementEngine.completeMovementPhase(testTwo, 1);

if (JSON.stringify(testTwo.players[0].units[0].coords) != JSON.stringify({"x": 6, "y": 7}))
  console.log(`\n\tTest 2 did not pass, the ship did not move downwards, 1 hex. The final coords was ${JSON.stringify(testTwo.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 2 Passed!`)

let testThree = new Game([MoveLeftStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testThree.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testThree.players[0].technology))

testThree.generateState(phase = "Movement");
testThree.movementEngine.completeMovementPhase(testThree, 1);

if (JSON.stringify(testThree.players[0].units[0].coords) != JSON.stringify({"x": 5, "y": 6}))
  console.log(`\n\tTest 3 did not pass, the ship did not move to the left, 1 hex. The final coords was ${JSON.stringify(testThree.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 3 Passed!`)

let testFour = new Game([MoveUpStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testFour.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testFour.players[0].technology))

testFour.generateState(phase = "Movement");
testFour.movementEngine.completeMovementPhase(testFour, 1);

if (JSON.stringify(testFour.players[0].units[0].coords) != JSON.stringify({"x": 6, "y": 5}))
  console.log(`\n\tTest 4 did not pass, the ship did not move upwards, 1 hex. The final coords was ${JSON.stringify(testFour.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 4 Passed!`)

console.log(`\nTesting 3 Movement Rounds`);

let testFive = new Game([MoveRightStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testFive.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testFive.players[0].technology))

testFive.generateState(phase = "Movement");
testFive.movementEngine.completeMovementPhase(testFive, 3);

if (JSON.stringify(testFive.players[0].units[0].coords) != JSON.stringify({"x": 9, "y": 6}))
  console.log(`\n\tTest 5 did not pass, the ship did not move to the right, 3 hexes. The final coords was ${JSON.stringify(testFive.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 5 Passed!`)

let testSix = new Game([MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testSix.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testSix.players[0].technology))

testSix.generateState(phase = "Movement");
testSix.movementEngine.completeMovementPhase(testSix, 3);

if (JSON.stringify(testSix.players[0].units[0].coords) != JSON.stringify({"x": 6, "y": 9}))
  console.log(`\n\tTest 6 did not pass, the ship did not move downwards, 3 hexes. The final coords was ${JSON.stringify(testSix.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 6 Passed!`)

let testSeven = new Game([MoveLeftStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testSeven.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testSeven.players[0].technology))

testSeven.generateState(phase = "Movement");
testSeven.movementEngine.completeMovementPhase(testSeven, 3);

if (JSON.stringify(testSeven.players[0].units[0].coords) != JSON.stringify({"x": 3, "y": 6}))
  console.log(`\n\tTest 7 did not pass, the ship did not move to the left, 3 hexes. The final coords was ${JSON.stringify(testSeven.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 7 Passed!`)

let testEight = new Game([MoveUpStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testEight.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testEight.players[0].technology))

testEight.generateState(phase = "Movement");
testEight.movementEngine.completeMovementPhase(testEight, 3);

if (JSON.stringify(testEight.players[0].units[0].coords) != JSON.stringify({"x": 6, "y": 3}))
  console.log(`\n\tTest 8 did not pass, the ship did not move upwards, 3 hexes. The final coords was ${JSON.stringify(testEight.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 8 Passed!`)

console.log(`\nTesting Upgraded Movement with 3 Movement Rounds`);

upgradedTech = { "attack": 0, "defense": 0, "movement": 5, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };

let testNine = new Game([MoveRightStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testNine.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testNine.generateState(phase = "Movement");
testNine.movementEngine.completeMovementPhase(testNine, 3);

if (JSON.stringify(testNine.players[0].units[0].coords) != JSON.stringify({"x": 12, "y": 6}))
  console.log(`\n\tTest 9 did not pass, the ship did not move to the right, 6 hexes. The final coords was ${JSON.stringify(testNine.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 9 Passed!`)

let testTen = new Game([MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testTen.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testTen.generateState(phase = "Movement");
testTen.movementEngine.completeMovementPhase(testTen, 3);

if (JSON.stringify(testTen.players[0].units[0].coords) != JSON.stringify({"x": 6, "y": 12}))
  console.log(`\n\tTest 10 did not pass, the ship did not move downwards, 6 hexes. The final coords was ${JSON.stringify(testTen.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 10 Passed!`)

let testEleven = new Game([MoveLeftStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testEleven.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testEleven.generateState(phase = "Movement");
testEleven.movementEngine.completeMovementPhase(testEleven, 3);

if (JSON.stringify(testEleven.players[0].units[0].coords) != JSON.stringify({"x": 0, "y": 6}))
  console.log(`\n\tTest 11 did not pass, the ship did not move to the left, 6 hexes. The final coords was ${JSON.stringify(testEleven.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 11 Passed!`)

let testTwelve = new Game([MoveUpStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testTwelve.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, upgradedTech))

testTwelve.generateState(phase = "Movement");
testTwelve.movementEngine.completeMovementPhase(testTwelve, 3);

if (JSON.stringify(testTwelve.players[0].units[0].coords) != JSON.stringify({"x": 6, "y": 0}))
  console.log(`\n\tTest 12 did not pass, the ship did not move upwards, 6 hexes. The final coords was ${JSON.stringify(testTwelve.players[0].units[0].coords)}`);
else
  console.log(`\n\tTest 12 Passed!`)

console.log(`\nTesting Combat Movement Freeze`);

let testThirteen = new Game([MoveUpStrat, MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 3})

testThirteen.players[0].units.push(new Scout(0, {"x": 6,"y": 7}, 1, upgradedTech))
testThirteen.board.grid[String([6,7])].appendUnit(testThirteen.players[0].units[0])

testThirteen.players[1].units.push(new Scout(1, {"x": 6,"y": 5}, 1, upgradedTech))
testThirteen.board.grid[String([6,5])].appendUnit(testThirteen.players[1].units[0])

testThirteen.generateState(phase = "Movement");
testThirteen.movementEngine.completeMovementPhase(testThirteen, 3);

if (JSON.stringify(testThirteen.players[0].units[0].coords) != JSON.stringify({"x": 6, "y": 5}) && JSON.stringify(testThirteen.players[1].units[0].coords) != JSON.stringify({"x": 6, "y": 5}))
  console.log(`\n\tTest 13 did not pass, the ships moved past eachother. The final coords of the first unit was ${JSON.stringify(testThirteen.players[0].units[0].coords)}. The final coords of the second unit was ${JSON.stringify(testThirteen.players[1].units[0].coords)}`);
else
  console.log(`\n\tTest 13 Passed!\n`)