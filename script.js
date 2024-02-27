// Game settings
const screenWidth = 1220;
const playerWidth = 100;

// Player class
class Player {
    constructor(elementId, startPosition, wins) {
        this.element = document.getElementById(elementId);
        this.position = startPosition;
        this.wins = wins || 0; // Initialize wins to 0 if not provided
    }

    moveRight() {
        this.position = Math.min(screenWidth - playerWidth, this.position + 10); //ubah angka 10 untuk kecepatan perpindahan player
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = this.position + "px";
    }

    // Increment win count for the player
    win() {
        this.wins++;
        // Save wins count to localStorage
        sessionStorage.setItem(`${this.element.id}_wins`, this.wins);
        // Update wins display immediately
        displayWins();
    }

    // Get the number of wins for the player
    getWins() {
        // Retrieve wins count from localStorage
        const wins = sessionStorage.getItem(`${this.element.id}_wins`);
        return wins ? parseInt(wins) : 0; // Parse wins as integer, default to 0 if not found
    }
}

// Create player objects
const player1 = new Player("player1", 0);
const player2 = new Player("player2", 0);
const player3 = new Player("player3", 0);
const player4 = new Player("player4", 0);

// DOM elements
const finishLine = document.getElementById("finishLine");

// Function to start/restart the game
function startGame() {
    // Set player positions to start positions
    player1.position = 0;
    player2.position = 0;
    player3.position = 0;
    player4.position = 0;
    player1.updatePosition();
    player2.updatePosition();
    player3.updatePosition();
    player4.updatePosition();
}

// Event listener for keyboard input
document.addEventListener("keydown", function(event) {
    if (event.key === "1") {
        player1.moveRight();
    } else if (event.key === "2") {
        player2.moveRight();
    } else if (event.key === "3") {
        player3.moveRight();
    } else if (event.key === "4") {
        player4.moveRight();
    }

    // Check if any player reached finish line
    if (player1.position >= screenWidth - playerWidth) {
        player1.win();
        startGame(); // Restart the game
    } else if (player2.position >= screenWidth - playerWidth) {
        player2.win();
        startGame(); // Restart the game
    } else if (player3.position >= screenWidth - playerWidth) {
        player3.win();
        startGame(); // Restart the game
    } else if (player4.position >= screenWidth - playerWidth) {
        player4.win();
        startGame(); // Restart the game
    }
});

// Display number of wins for each player
function displayWins() {
    document.getElementById("player1Wins").innerText = player1.getWins();
    document.getElementById("player2Wins").innerText = player2.getWins();
    document.getElementById("player3Wins").innerText = player3.getWins();
    document.getElementById("player4Wins").innerText = player4.getWins();
}

// Start the game
startGame();
// Display initial wins count
displayWins();