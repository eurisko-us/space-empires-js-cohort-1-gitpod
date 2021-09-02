class EconomicEngine {
    constructor(game, board) {
        this.game = game
        this.board = board
        this.techAdjustment = 1
        this.techNames = ["shipsize", "attack", "defense", "movement", "shipyard"]
    }

    completeEconomics() {
        for (player of this.game.players) {
            this.game.generateState(phase='Economic', currentPlayer=player);
            player.creds += this.income(player);
            taxes = this.taxes(player)
            if (player.creds < taxes) {
                removalCutoff = taxes - player.creds
                while(removalCutoff > 0) {
                    removalCP = removeShip(player);
                    removalCutoff -= removalCP;
                }
                taxes = this.taxes(player)
            }
            player -= this.taxes(player);
            purchases = player.strategy.decidePurchases(this.game.gameState);
            for (purchase in purchases) {
                if (this.techNames.includes(purchase)) {
                    this.buyTech(purchase, player)
                }
                else {
                    this.buyUnit(purchase, player)
                }
            }
        }

    }

    buyTech(tech, player) {
        playerTechLevel = player.technology[tech]
        techCost = this.game.gameState["technologyData"][tech][playerTechLevel - 1]// adjustment for array indexing
        maxLevel = this.game.gameState["technologyData"][tech].length
        if (playerTechLevel < maxLevel) {
            if (techCost < player.creds) {
                player.creds -= techCost
                playerTechLevel += 1
            }
        }

    }

    buyUnit(unit, player) {
        unitCost = this.game.gameState["unitData"][unit]["cpCost"]
        if (unitCost < player.creds) { // I CAN'T ADD THE BUILDERS STUFF BECAUSE I HAVE NO IDEA WHERE IT'S GONNA BE??????
            player.creds -= unitCost
            player.buildUnit(unit) // builds unit and adds to self in player class

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

    removeShip(player) {
        this.game.generateState(phase='Economic', currentPlayer=player)
        removalIndex = player.strategy.decideRemoval(game.gameState)
        removalUnit = player.units[removalIndex]
        cp = removalUnit.maintenance
        this.game.board.removeUnit(removalUnit)
        return cp
    }
}