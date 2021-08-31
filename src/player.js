class Player {
    constructor(strategy, position, boardSize, playerIndex, playerColor) {
        this.strategy = new strategy(playerIndex);
        this.creds = 0;
        this.boardSize = boardSize;
        this.technology = {"attack": 0, "defense": 0, "movement": 1, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0};
        this.homeBase = Colony(position, boardSize, 0, home_base=True, turn_created = -1);
        this.playerIndex = playerIndex;
        this.playerColor = playerColor;
    }

    upgrade(statToUpgrade, gameState):
        if (canUpgrade(statToUpgrade, gameState)):
            // Upgrade Attack Technology
            if statToUpgrade == 'attack' and self.technology['attack'] < 3:
                self.technology['attack'] += 1
                if self.game.print_state_obsolete: print('Player', self.player_number, 'upgraded their attack strength from', self.technology['attack'] - 1, 'to', self.technology['attack'])

            // Upgrade Defense Technology
            elif statToUpgrade == 'defense' and self.technology['defense'] < 3:
                self.technology['defense'] += 1
                if self.game.print_state_obsolete: print('Player', self.player_number, 'upgraded their defense strength from', self.technology['defense'] - 1, 'to', self.technology['defense'])

            // Upgrade Tactics Technology
            elif statToUpgrade == 'tactics' and self.technology['tactics'] < 3:
                self.technology['tactics'] += 1
                if self.game.print_state_obsolete: print('Player', self.player_number, 'upgraded their fighting class from', self.technology['tactics'] - 1, 'to', self.technology['tactics'])

            // Upgrade Movement Technology
            elif statToUpgrade == 'movement' and self.technology['movement'] < 6:
                self.technology['movement'] += 1
                if self.game.print_state_obsolete: print('Player', self.player_number, 'upgraded their movement speed from', self.technology['movement'] - 1, 'to', self.technology['movement'])

            // Upgrade Shipyard Technology
            elif statToUpgrade == 'shipyard' and self.technology['shipyard'] < 2:
                self.technology['shipyard'] += 0.5
                if self.game.print_state_obsolete: print('Player', self.player_number, "upgraded their ship-yard's building size from", self.technology['shipyard'] - 0.5, 'to', self.technology['shipyard'])

            // Upgrade Terraform Technology
            elif statToUpgrade == 'terraform' and self.technology['terraform'] < 2:
                self.technology['terraform'] += 1
                if self.game.print_state_obsolete: print('Player', self.player_number, "upgraded their ablility to terraform from", self.technology['terraform'] - 1, 'to', self.technology['terraform'])

            // Upgrade Ship size 
            elif statToUpgrade == 'shipsize' and self.technology['shipsize'] < 6:
                self.technology['shipsize'] += 1
                if self.game.print_state_obsolete: print('Player', self.player_number, "upgraded their max building size from", self.technology['shipsize'] - 1, 'to', self.technology['shipsize'])

    }