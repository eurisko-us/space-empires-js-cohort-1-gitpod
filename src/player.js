class Player {
  constructor(strategy, position, boardSize, playerIndex, playerColor) {
    this.strategy = new strategy(playerIndex);
    this.creds = 0;
    this.boardSize = boardSize;
    this.technology = { "attack": 0, "defense": 0, "movement": 1, "shipsize": 1, "shipyard": 1, "terraform": 0, "tactics": 0, "exploration": 0 };
    this.homeBase = Colony(playerIndex, position, boardSize, 0, this.technology, homeBase = True);
    this.playerIndex = playerIndex;
    this.playerColor = playerColor;
  }

  build(game, unit) { // Unit is formatted as ["string of ship type", (tuple of position)]
    unitTypes = {"Scout": Scout, "Destroyer": Destroyer,/*, more fighting ships later */ "Colony Ship": ColonyShip, "Ship Yard": ShipYard}
    if (!getPossibleBuildPositions().includes(unit[1]))
      throw `Player ${this.playerIndex} tried to cheat by 
            building a ${unit[0]} in an invalid hex at ${unit[1]}`; 
    newShip = new unitTypes[unit[0]](/* stuff */);
    this.ships.append(newShip);
  }

  upgrade(game, tech) { // Tech is formmated as a string
    if (canUpgrade(tech, game.gameState)) {
      // Upgrade Attack Technology
      if (tech == "attack" and this.technology["attack"] < 3) {
        this.technology["attack"] += 1;
        if (game.print_state_obsolete)
          console.log(`Player ${this.player_number} upgraded their attack strength from ${this.technology["attack"] - 1} to ${this.technology["attack"]}`);
      }
      // Upgrade Defense Technology
      else if (tech == "defense" and this.technology["defense"] < 3) {
        this.technology["defense"] += 1;
        if (game.print_state_obsolete)
          console.log(`Player ${this.player_number} upgraded their defense strength from ${this.technology["defense"] - 1} to ${this.technology["defense"]}`);
      }
      // Upgrade Tactics Technology
      else if (tech == "tactics" and this.technology["tactics"] < 3) {
        this.technology["tactics"] += 1;
        if (game.print_state_obsolete)
          console.log(`Player ${this.player_number} upgraded their fighting class from ${this.technology["tactics"] - 1} to ${this.technology["tactics"]}`);
      }
      // Upgrade Movement Technology
      else if (tech == "movement" and this.technology["movement"] < 6) {
        this.technology["movement"] += 1;
        if (game.print_state_obsolete)
          console.log(`Player ${this.player_number} upgraded their movement speed from ${this.technology["movement"] - 1} to ${this.technology["movement"]}`);
      }
      // Upgrade Shipyard Technology
      else if (tech == "shipyard" and this.technology["shipyard"] < 2) {
        this.technology["shipyard"] += 0.5;
        if (game.print_state_obsolete)
          console.log(`Player ${this.player_number} upgraded their ship-yard"s building size from ${this.technology["shipyard"] - 0.5} to ${this.technology["shipyard"]}`);
      }
      // Upgrade Terraform Technology
      else if (tech == "terraform" and this.technology["terraform"] < 2) {
        this.technology["terraform"] += 1;
        if (game.print_state_obsolete)
          console.log(`Player ${this.player_number} upgraded their ablility to terraform from ${this.technology["terraform"] - 1} to ${this.technology["terraform"]}`);
      }
      // Upgrade Ship Size Technology 
      else if (tech == "shipsize" and this.technology["shipsize"] < 6) {
        this.technology["shipsize"] += 1;
        if (game.print_state_obsolete)
          console.log(`Player ${this.player_number} upgraded their max building size from ${this.technology["shipsize"] - 1} to ${this.technology["shipsize"]}`);
      }
    }
  }

  generate_state(isCurrentPlayer, inCombat) {
    if (isCurrentPlayer || inCombat) {
      return {
        'name': this.strategy.__name__,
        'cp': this.creds,
        'units': this.units,
        //'colonies': [colony.generate_state(current_player, combat) for colony in sorted([ship for ship in this..ships if ship.type == 'Colony'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        //'ship_yards': [ship_yard.generate_state(current_player, combat) for ship_yard in sorted([ship for ship in this..ships if ship.type == 'Shipyard'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        'technology': this.technology,
        'homeworld': this.home_base.generate_state(current_player, combat),
        'num': this.player_number
      }
    } else {
      return {
        'name': this.strategy.name,
        'units': this.units,
        //'colonies': [colony.generate_state(current_player, combat) for colony in sorted([ship for ship in this..ships if ship.type == 'Colony'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        //'ship_yards': [ship_yard.generate_state(current_player, combat) for ship_yard in sorted([ship for ship in this..ships if ship.type == 'Shipyard'], key=lambda ship: (ship.technology['tactics'], -ship.player.player_number, -ship.ID), reverse=True)],
        'homeworld': this.home_base.generate_state(current_player, combat),
        'num': this.player_number
      }
    }

  }