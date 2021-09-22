const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")
g = new Game([DefaultStrategy,DefaultStrategy])
p0 = g.players[0]
p1 = g.players[1]

p1_units = [new Scout(0, [0,0], 0, p0.technology, 0), new Scout(0, [2,1], 1, p0.technology, 0), new Scout(0, [2,1], 2, p0.technology, 0), new Scout(0, [2,1], 3, p0.technology, 0), new Destroyer(0, [0,0], 4, p0.technology, 0), new ColonyShip(0, [0,0], 5, p0.technology, 0)]
p2_units = [new Scout(1, [0,0], 0, p1.technology, 0), new Scout(1, [2,1], 1, p1.technology, 0), new ColonyShip(1, [0,0], 2, p1.technology, 0), new Scout(1, [2,1], 3, p1.technology, 0), new ColonyShip(1, [2,1], 4, p1.technology, 0)]

for (let p1_unit of p1_units){
  g.players[0].units.push(p1_unit);
  g.board.grid[String(p1_unit.coords)].appendUnit(p1_unit);
  console.log(g.board.grid[String(p1_unit.coords)])
}

p2_units = [new Scout(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null), new Scout(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null), new ColonyShip(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null), new Scout(1, {"x": 2,"y": 1}, 0, p1.technology, turnCreated = null), new ColonyShip(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null)]


for (let p2_unit of p2_units){
  g.players[1].units.push(p2_unit);
  g.board.grid[String(p2_unit.coords)].appendUnit(p2_unit);
}

g.combatEngine.completeCombatPhase(g)

// print('complete')
//2 players. Player 1 tactics 0, Player 2 tactics 1
//(0,0) P1 1 scout, 1 destroyer, 1 colony ship; P2 2 scouts, 1 ColonyShip
//(2,1) P1 3 scouts; P2 1 scout, 1 colony ship

