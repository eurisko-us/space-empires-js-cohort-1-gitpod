const EconomicEngine = require("../src/economic-engine.js");
const Game = require("../src/game.js")
const SingleBuyStrategy = require("../src/strategies/economic-strategies.js");

g = new Game([SingleBuyStrategy, SingleBuyStrategy]);
p0 = g.players[0]
p1 = g.players[1]
p0.creds = 26

for (let x = 0; x < 2; x++) {
  g.economicEngine.completeEconomicPhase(g)
}

console.log('complete')


//2 players. Player 1 tactics 0, Player 2 tactics 1
//(0,0) P1 1 scout, 1 destroyer, 1 colony ship; P2 2 scouts, 1 ColonyShip
//(2,1) P1 3 scouts; P2 1 scout, 1 colony ship