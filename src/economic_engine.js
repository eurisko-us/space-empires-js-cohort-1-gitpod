class EconomicEngine {
    completeEconomicPhase(game, board) {
        for (let player of game.players) {
            player.creds += this.income(game, board, player) - this.taxes(game, board, player);
            if (player.creds < 0) {
                // remove ships code
            }
            game.generateState(phase='Economic', currentPlayer=player);
            // After looking over the rule book theres no rule 
            // Saying the either technology or ships have to get bought first
            // Decide purchases should be formatted as an array like this: ["Movement", "Scout", "Attack"]
            purchases = player.strategy.decidePurchases(game.gameState);
            /*
            do
            the
            thing
            gorg
            im
            lazy
            */
        }

    }

    income(game, board, player) {
        total_income = 0
        for (let ship of player.ships) {
            if (ship.type == "Colony" || ship.type == "Home Base")
                income += ship.income ;
        }
        return income;
    }

    taxes(game, board, player) {
        game.generateState(phase='Economic', currentPlayer=player)
        total_taxes = 0;
        for (let ship of player.ships) 
            total_taxes += game.gameState['unitData'][ship.type]['maintenance'];
        return total_taxes
    }
}