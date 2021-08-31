class Board {
  constructor(game,size=5){
    var this.game = game;
    var this.grid = {};
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.grid(String((i,j)))=Cell((i,j))
    }
  }
}
class Cell {
  constructor(coord){
    var coord = coord;
    var units = [];
  }
}


