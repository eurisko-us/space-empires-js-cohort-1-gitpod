const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")
g = new Game([DefaultStrategy,DefaultStrategy])
p0 = g.players[0]
p1 = g.players[1]
p1_units = [new Scout(0, {"x": 0,"y": 0}, 0, p0.technology, turnCreated = null), new Scout(0, {"x": 2,"y": 1}, 0, p0.technology, turnCreated = null), new Scout(0, {"x": 2,"y": 1}, 0, p0.technology, turnCreated = null), new Scout(0, {"x": 2,"y": 1}, 0, p0.technology, turnCreated = null), new Destroyer(0, {"x": 0,"y": 0}, 0, p0.technology, turnCreated = null), new ColonyShip(0, {"x": 0,"y": 0}, 0, p0.technology, turnCreated = null)]

for (let p1_unit of p1_units){
  g.players[0].units.push(p1_unit)
  g.board.grid[String([p1_unit.position["x"], p1_unit.position["y"]])].appendUnit(p1_unit)
}

p2_units = [new Scout(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null), new Scout(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null), new ColonyShip(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null), new Scout(1, {"x": 2,"y": 1}, 0, p1.technology, turnCreated = null), new ColonyShip(1, {"x": 0,"y": 0}, 0, p1.technology, turnCreated = null)]


for (let p2_unit of p2_units){
  g.players[1].units.push(p2_unit)
  g.board.grid[String([p2_unit.position["x"], p2_unit.position["y"]])].appendUnit(p2_unit)
}

g.combatEngine.completeCombatPhase(g)

// print('complete')
//2 players. Player 1 tactics 0, Player 2 tactics 1
//(0,0) P1 1 scout, 1 destroyer, 1 colony ship; P2 2 scouts, 1 ColonyShip
//(2,1) P1 3 scouts; P2 1 scout, 1 colony ship

