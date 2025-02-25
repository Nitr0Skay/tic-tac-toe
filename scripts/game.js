function startNewGame() {
    if(!players[0].name || !players[1].name) {
        alert('Please set custom player names for both Players !');
        // Here's the window to improve
        return;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() { 
    activePlayer = (activePlayer) ? 0 : 1; 
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');
    switchPlayer();
}