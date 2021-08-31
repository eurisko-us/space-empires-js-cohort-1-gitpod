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

  sortForCombat(){
    //Need to look at rules for exact combat ordering
    function order(s1,s2){
      let s1_grade = s1.technolgy['tactics'] + s1.attack_class;
      let s2_grade = s2.technolgy['tactics'] + s2.attack_class;
      if (s1_grade > s2_grade){
        return 1;
      }else if(s1_grade < s2_grade){
        return -1;
      }else{
        if (s1.playerIndex < s2.playerIndex){
          return 1;
        }else{
          return -1;
        }
      }
    }
    return this.units.sort(order(s1,s2));
  }
}

module.exports = Board;

// var board=Board("Game")
// print(board.grid)