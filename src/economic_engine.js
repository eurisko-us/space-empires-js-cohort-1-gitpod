class EconomicEngine {
    constructor(game, board) {
        this.game = game
        this.board = board
    }

    completeEconomics() {
        for (player of this.game.players) {
            player.creds += this.income(player) - this.taxes(player);
            if (player.creds < 0) {
                // remove ships code
            }
            this.game.generateState(phase='Economic', currentPlayer=player);
            // After looking over the rule book theres no rule 
            // Saying the either technology or ships have to get bought first
            // Decide purchases should be formatted as an array like this: ["Movement", "Scout", "Attack"]
            purchases = player.strategy.decidePurchases(this.game.gameState);
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

    income(player) {
        total_income = 0
        for (ship of player.ships) {
            if (ship.type == "Colony" || ship.type == "Home Base")
                income += ship.income ;
        }
        return income;
    }

    taxes(player) {
        this.game.generateState(phase='Economic', currentPlayer=player)
        total_taxes = 0;
        for (ship of player.ships) 
            total_taxes += this.game.gameState['unitData'][ship.type]['maintenance'];
        return total_taxes
    }
}