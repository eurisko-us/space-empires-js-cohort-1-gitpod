const Board = require("../src/board");


const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrategy = require("../src/strategies/default-strategy")

g = new Game([DefaultStrategy,DefaultStrategy]);
p0 = g.players[0];
// p1 = g.players[1]
// p1_units = [new Scout(0, [0,0], 0, p0.technology, 0), new Scout(0, [2,1], 1, p0.technology, 0), new Scout(0, [2,1], 2, p0.technology, 0), new Scout(0, [2,1], 3, p0.technology, 0), new Destroyer(0, [0,0], 4, p0.technology, 0), new ColonyShip(0, [0,0], 5, p0.technology, 0)]
console.log("WOOW")
console.log(p0.homeBase.coords)
testUnit = ["Scout", [7,0]]
 
// console.log(g.board)


p0.build(g,testUnit);

console.log(g.board.grid['7,0']);

g.board.removeUnit(p0.units[0],g);

console.log(g.board.grid['7,0']);

/*
 
sacrifice = Scout(whatever the requirements are)
 
board.addUnit(sacrifice)
 
console.log(board.grid);
 
console.log(board.grid["0,1"].units)
 
board.removeUnit(sacrifice)
 
console.log(board.grid)
console.log(board.grid["0,1"].units)
 
*/
