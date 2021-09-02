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

  addUnits(unit) {
    this.grid[String(unit.coords)].units.push(unit)
  }
  removeUnit(unit) {
    unit.removeSelf
    this.grid[String(unit.coords)].units.splice(this.grid[String(unit.coords)].units.indexOf(unit))
  }
}

class Hex {
  constructor(coord){
    this.coord = coord;
    this.units = [];
  }
  sortForCombat(){
    function order(s1,s2){
      if (s1.tech['tactics'] > s2.tech['tactics']){
        return 1;
      }else if(s1.tech['tactics'] < s2.tech['tactics']){
        return -1;
      }else{
        if (s1.attack_class < s2.attack_class){
          return 1;
        }else if(s1.attack_class > s2.attack_class){
          return -1;
        }else{
          if (s1.lastMoved < s2.lastMoved){
            return 1;
          }else if(s1.lastMoved > s2.lastMoved){
            return -1;
          }else{
            return 0;
          }
        }
      }
    }

    return this.units.sort(order(s1,s2));
  }
}

module.exports = Board;



