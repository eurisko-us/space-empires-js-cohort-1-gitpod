const Game = require("../src/game")
const Scout = require("../src/units/scout")
const Destroyer = require("../src/units/destroyer")
const ColonyShip = require("../src/units/colony-ship")
const DefaultStrat = require("../src/strategies/default-strat")
g = Game([dumbStrat,dumbStrat])
p0 = g.players[0]
p1 = g.players[1]
p1_units = [Scout(p0, [0,0], g.board, 'Sc0', turnCreated = null), Scout(p0, [2,1], g.board, 'Sc1', turnCreated = null), Scout(p0, [2,1], g.board, 'Sc2', turnCreated = null), Scout(p0, [2,1], g.board, 'Sc3', turnCreated = null), Destroyer(p0, [0,0], g.board, 'Ds0', turnCreated = null), ColonyShip(p0, [0,0], g.board, 'CS0', turnCreated = null)]
p2_units = [Scout(p0, [0,0], g.board, 'Sc0', turnCreated = null), Scout(p0, [0,0], g.board, 'Sc1', turnCreated = null), ColonyShip(p0, [0,0], g.board, 'CS0', turnCreated = null), Scout(p0, [2,1], g.board, 'Sc2', turnCreated = null), ColonyShip(p0, [0,0], g.board, 'CS1', turnCreated = null)]

for (p1_unit of p1_units){
  g.players[0].units.push(p1_unit)
  p1_unit.board.addUnit(p1_unit)
}
for (p2_unit of p2_units){
  g.players[1].units.push(p2_unit)
  p2_unit.board.addUnit(p2_unit)
}

g.combatEngine.completeCombat(g)

// print('complete')
//2 players. Player 1 tactics 0, Player 2 tactics 1
//(0,0) P1 1 scout, 1 destroyer, 1 colony ship; P2 2 scouts, 1 ColonyShip
//(2,1) P1 3 scouts; P2 1 scout, 1 colony ship

