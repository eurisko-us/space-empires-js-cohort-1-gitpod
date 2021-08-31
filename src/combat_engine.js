class CombatEngine {
    completeCombatPhase(game, board) {
        possibleCombats = []
        for (let position, ships of board.shipDict) {
            if (moreThanTwoPlayersInSpace(ships))
                possibleCombats.append(position);
        }

        for (combatPosition of possibleCombats) {
            shipsInCombat = [];
            for (let ships of board.shipDict[combatPosition]) {
                for (let ship of ships) {
                    if (ship.canFight)
                        shipsInCombat.append(ship);
                }
            }
            combatOrder = shipsInCombat.sort(/*RILEY or ELI code this im lazy*/);
            while (!moreThanTwoPlayersInSpace(combatOrder)) {
                /*
                i
                am
                laaaaaaaaaaaaaa
                zzzzyyyyyyyyy
                */
            }
        }
    }

    moreThanTwoPlayersInSpace(ships) {
        playerOne = ships[0].playerIndex;
        for (let ship of ships.slice(1)) {
            if (ship.playerIndex != playerOne)
                return True
        }
        return False
    }
}