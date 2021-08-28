class CombatEngine {
    constructor(game, board) {
        this.game = game
        this.board = board
    }

    completeCombat() {
        possibleCombats = []
        for (position, ships of this.board.shipDict) {
            if (moreThanTwoPlayersInSpace(ships))
                possibleCombats.append(position);
        }

        for (combatPosition of possibleCombats) {
            shipsInCombat = [];
            for (ships of this.board.shipDict[combatPosition]) {
                for (ship of ships) {
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
        for (ship of ships.slice(1)) {
            if (ship.playerIndex != playerOne)
                return True
        }
        return False
    }
}