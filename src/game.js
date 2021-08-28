class Game {
    constructor(playerStrats, boardSize=13, phaseStats = {"Economic": null, "Movement": 3, "Combat": null}, maxTurns = 100) {
        this.playerStrats = playerStrats;
        this.boardSize = boardSize;
        this.turn = 1
        this.maxTurns = maxTurns;
        // `phaseStats` is when we want only 
        // For example 1 economic phase for the whole game,
        // We would pass in `"economic": 1` in phase stats
        // We could also reduce the number of movement rounds there are
        // And also limit the combat similar to the econonic phase
        this.phaseStats = {};
        for (phase, value of phaseStats) {
            if (value == null) 
                this.phaseStats[phase] = maxTurns;
            else
                this.phaseStats[phase] = value;
        }
        // Doing exactly what they say
        this.initializePlayers();
        this.initializeBoard();
        this.initializeEngines();
    }

    initializePlayers() {
        this.players = []
        this.playerHomeBasePositions = [
            [Math.round(this.boardSize / 2), 0], 
            [Math.round(this.boardSize / 2), this.boardSize - 1], 
            [0, Math.round(this.boardSize / 2)], 
            [this.boardSize - 1, Math.round(this.boardSize / 2)]
        ]
        this.playerColors = [ // These are the colors of the actual game for the four players
            "rgb(255, 100, 70)" /* Red */,
            "rgb(75, 165, 225)" /* Sky Blue */,
            "rgb(255, 255, 100)" /* Darkish Yellow */,
            "rgb(50, 125, 5)" /* Dark Green */
        ] // CSS code for the colors in rgb codes
        for (var i = 0; i < this.playerStrats.length(); i++) {
            this.players.append(Player(this.playerStrats[i], this.playerHomeBasePositions[i], this.boardSize, i, this.playerColors[i]));
        }
    }

    initializeBoard() {
        this.board = new Board(this.boardSize); // Will probs need more args, but thats for later
    }

    initializeEngines() { // All of these will probs need more args, but thats for later
        this.movementEngine = new MovementEngine(this, this.board);
        this.combatEngine = new CombatEngine(this, this.board);
        this.economicEngine = new EconomicEngine(this, this.board);
    }

    play() { 
        while (!this.checkIfPlayerHasWon() && this.turn <= this.maxTurns) {
            this.generateState(); // Not even gonna bother right now
            this.completeTurn();
            this.turn += 1;
        }
    }

    completeTurn() { // Iterate through the phases
        for (phase, value of this.phaseStats) {
            if (phase == "Movement") {
                this.generateState(phase = "Movement");
                this.movementEngine.completeMovements(value);
            } 
            if (phase == "Combat" && this.turn <= value) {
                this.generateState(phase = "Combat");
                this.combatEngine.completeCombat();
            } 
            if (phase == "Economic" && this.turn <= value) {
                this.generateState(phase = "Economic");
                this.economicEngine.completeEconomics();
            }
        }
    }
}