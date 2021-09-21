const Game = require("../src/game")
 
const Board = require("../src/board.js");
console.log("start")

const Scout = require("../src/units/scout")
console.log("start")


let board = new Board();
 
// console.log(board.grid);
 
let testOne = new Game();

testOne.players[0].units.push(new Scout(0, {"x": 6,"y": 6}, 0, testOne.players[0].technology))
 
 
 
console.log(board.grid);
 
/*
 
 
board.addUnit(sacrifice)
 
console.log(board.grid);
 
console.log(board.grid["0,1"].units)
 
board.removeUnit(sacrifice)
 
console.log(board.grid)
console.log(board.grid["0,1"].units)
 
*/
