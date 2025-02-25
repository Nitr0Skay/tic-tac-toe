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
    const selectedField = event.target;
    const selectedRow = selectedField.dataset.row - 1;
    const selectedColumn = selectedField.dataset.col - 1;
    
    if(gameData[selectedRow][selectedColumn]) return;
    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    switchPlayer();
}