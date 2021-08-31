class Board {
  constructor(game,size=5){
    this.game = game;
    this.grid = {};
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.grid[String([i,j])]= new Cell([i,j]);
      }
    }
  }
}

class Cell {
  constructor(coord){
    this.coord = coord;
    this.units = [];
  }
}

module.exports = Board;

// var board=Board("Game")
// print(board.grid)