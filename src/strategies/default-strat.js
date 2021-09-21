class DefaultStrat {
  constructor(playerIndex){
    this.playerIndex = playerIndex
  }

  decideShipMovement(unit_state, hidden_game_state){
    return null;
  }

  decidePurchases(){
    return null;
  }

  
}
module.exports = DefaultStrat;