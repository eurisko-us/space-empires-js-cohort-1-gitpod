const Scout = require("../src/units/scout.js");

const Board = require("../src/board.js");

let board = new Board();

console.log(board.grid);

/* 

sacrifice = Scout(whatever the requirements are)

board.addUnit(sacrifice)

console.log(board.grid);

console.log(board.grid["0,1"].units)

board.removeUnit(sacrifice)

console.log(board.grid)
console.log(board.grid["0,1"].units)

/*