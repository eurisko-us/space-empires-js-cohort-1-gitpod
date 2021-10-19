class Display {
  constructor(game){
    this.game = game;
    this.board = game.board.grid;
  }
  function generateBoard(boardSize){
    let boardSize = this.game.boardSize
    let columns = '';
    for(let i = 0; i < boardSize; i ++){
      columns += '50px '
    }
    document.getElementById("wrapper").style.['grid-template-columns'] = columns;
    document.getElementById("wrapper").style.['grid-template-rows'] = columns;

    for(let i = boardSize; i > 0; i--) {
      for(let j = boardSize; j > 0; j--){
          document.body.onload = createHex(i,j,boardSize);
      }
    }
    let starter = document.getElementById("starter");
    starter.remove();
  }

  function createHex (x,y){
    let newHex = document.createElement("div");
    newHex.setAttribute("id",'h_'+String(x)+','+String(y));
    let hexContent = document.createTextNode(String([x,y]));
    
    newHex.appendChild(hexContent);
    
    let previousHex = document.getElementById("starter");
    previousHex.parentNode.insertBefore(newHex, previousHex);
  }

  function updateBoard(){
    for(hex of Object.keys(this.board)){
      this.updateHexLoc(hex);
      this.updateHexUnits(hex);
    }
  }

  function updateHexLoc(){
      if (hex.planet){
        if(hex.planet.colony == null){
          return 'green'
        }else{
          if(hex.planet.colony,player == 0){
            return 'p0_planet_green'
          }else{
            return 'p1_planet_green'
          }
        }
      }else{
        return 'black'
      }
  }

  function updateHexUnits(hex){
    units = {'Scout':0, 'ColonyShip':0}
    
  }
}
module.exports = Display;
