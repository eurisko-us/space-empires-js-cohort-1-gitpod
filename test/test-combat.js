const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")
g = new Game([DefaultStrategy,DefaultStrategy])
p0 = g.players[0]
p1 = g.players[1]

p1Units = [new Scout(0, [0,0], 0, p0.technology, 0), new Scout(0, [2,1], 1, p0.technology, 0), new Scout(0, [2,1], 2, p0.technology, 0), new Scout(0, [2,1], 3, p0.technology, 0), new Destroyer(0, [0,0], 4, p0.technology, 0), new ColonyShip(0, [0,0], 5, p0.technology, 0)]
p2Units = [new Scout(1, [0,0], 0, p1.technology, 0), new Scout(1, [2,1], 1, p1.technology, 0), new ColonyShip(1, [0,0], 2, p1.technology, 0), new Scout(1, [2,1], 3, p1.technology, 0), new ColonyShip(1, [2,1], 4, p1.technology, 0)]

for (let p1Unit of p1Units){
  g.players[0].units.push(p1Unit);
  g.board.grid[String(p1Unit.coords)].appendUnit(p1Unit);
}


for (let p2Unit of p2Units){
  g.players[1].units.push(p2Unit);
  g.board.grid[String(p2Unit.coords)].appendUnit(p2Unit);
}

g.combatEngine.completeCombatPhase(g)
console.log(g.board.grid[String([0,0])])
console.log(g.board.grid[String([2,1])])

// console.log(g.board.grid[String([0,0])])

// print('complete')
//2 players. Player 1 tactics 0, Player 2 tactics 1
//(0,0) P1 1 scout, 1 destroyer, 1 colony unit; P2 2 scouts, 1 ColonyShip
//(2,1) P1 3 scouts; P2 1 scout, 1 colony unit

