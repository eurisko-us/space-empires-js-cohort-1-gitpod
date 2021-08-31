class CombatEngine {

    completeCombat(game) {
        let possibleCombats = []
        for (boardCell of Object.values(game.board.grid)) {
            if (moreThanTwoPlayersInSpace(boardCell.units)){
                possibleCombats.append(boardCell);
            }
        }

        for (combatPosition of possibleCombats) {
            let shipsInCombat = [];
            for (ship of combatPosition.units) {
                if (ship.canFight){
                        shipsInCombat.append(ship);
                }
            }
            let combatOrder = combatPosition.sortForCombat();
            let attackingShipIndex = 0;
            while (!moreThanTwoPlayersInSpace(combatOrder)) {
                let attackingShip = combatOrder[attackingShipIndex];
                let defendingShip = attackingShip.AttackChoice(combatOrder);
                let duelResult = duel(attackingShip, defendingShip);
                if (duelResult == 'hit'){
                    if (defendingShip.hp > 1){
                        defendingShip.hp -= 1;
                    }else{
                        combatPosition.removeUnit(defendingShip);
                        combatOrder.splice(combatOrder.indexOf(defendingShip), 1);
                    }
                }
                attackingShipIndex += 1;
            }
        }
    }

    duel(attackingShip, defendingShip){
        let diceRoll = randInt(1,10);
        let attackThreshold = attackingShip.attack + attackingShip.attackTech;
        let defenseThreshold = defendingShip.defense + defendingShip.defenseTech;
        let hitThreshold = attackThreshold - defenseThreshold;
        if (diceRoll == 1 || hitThreshold >= diceRoll){
            return 'hit';
        }else{
            return 'miss';
        }
    }

    randInt(min, max) {
        return Math.round(Math.random() * (max - min + 1)) + min;
    }

    moreThanTwoPlayersInSpace(ships) {
        if (length(ships) < 2){
            return False;
        }
        let shipZeroPlayer = ships[0].playerIndex;
        for (ship of ships.slice(1)) {
            if (ship.playerIndex != shipZeroPlayer)
                return True;
        }
        return False;
    }
}