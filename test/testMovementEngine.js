const Game = include("../src/game")
const Scout = include("../src/units/Scout")
const MoveRightStrat = include("../src/strategies/move-direction-strategies.js")
const MoveDownStrat = include("../src/strategies/move-direction-strategies.js")
const MoveLeftStrat = include("../src/strategies/move-direction-strategies.js")
const MoveUpStrat = include("../src/strategies/move-direction-strategies.js")

testOne = Game([MoveRightStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testOne.players[0].ships.append(Scout(0, (7,7), 0, testOne.players[0].technology))

testOne.generateState(phase = "Movement");
testOne.movementEngine.completeMovementPhase(testOne, value);

if (testOne.players[0].ships[0].position["x"] == {"x": 8, "y": 7})
  throw `Test 1 did not pass, the ship did not move to the right, 1 hex`

testTwo = Game([MoveDownStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testTwo.players[0].ships.append(Scout(0, (7,7), 0, testTwo.players[0].technology))

testTwo.generateState(phase = "Movement");
testTwo.movementEngine.completeMovementPhase(testTwo, value);

if (testTwo.players[0].ships[0].position["x"] == {"x": 7, "y": 8})
  throw `Test 2 did not pass, the ship did not move downwards, 1 hex`

testThree = Game([MoveLeftStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testThree.players[0].ships.append(Scout(0, (7,7), 0, testThree.players[0].technology))

testThree.generateState(phase = "Movement");
testThree.movementEngine.completeMovementPhase(testThree, value);

if (testFour.players[0].ships[0].position["x"] == {"x": 6, "y": 7})
  throw `Test 3 did not pass, the ship did not move to the left, 1 hex`

testFour = Game([MoveUpStrat], maxTurns = 1, phaseStats = {"Movement": 1})

testFour.players[0].ships.append(Scout(0, (7,7), 0, testFour.players[0].technology))

testFour.generateState(phase = "Movement");
testFour.movementEngine.completeMovementPhase(testFour, value);

if (testFour.players[0].ships[0].position["x"] == {"x": 8, "y": 7})
  throw `Test 3 did not pass, the ship did not move upwards, 1 hex`