function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    isGameOver = false;
    gameOverElement.firstElementChild.innerHTML = '<h2>You won, <span id="winner-name"> PLAYER NAME </span> ! </h2>';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            gameFieldElements[gameBoardIndex].textContent = '';
            gameFieldElements[gameBoardIndex].classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if(!players[0].name || !players[1].name) {
        alert('Please set custom player names for both Players !');
        // Here's the window to improve
        return;
    }
    resetGameStatus();
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
    if(isGameOver) return;
    if(gameData[selectedRow][selectedColumn]) return;
    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerID = checkForGameOver();

    if(winnerID) endGame(winnerID);

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    // Checking the rows for equality
    for(let i = 0; i < 3; i++) {
        if(gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) return gameData[i][0];
    }

    // Checking the columns for equality
    for(let i = 0; i < 3; i++) {
        if(gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[0][i] === gameData[2][i]) return gameData[0][i];
    }

    // Diagonal: Top left to bottom right
    if(gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) return gameData[0][0];

    // Diagonal: Bottom left to top right
    if(gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) return gameData[0][0];

    // Maybe a draw after 9 rounds
    if(currentRound === 9) return -1;

    // The game is still going
    return 0;
}

function endGame(winnerID) {
    isGameOver = true;
    gameOverElement.style.display = 'block';

    if(winnerID > 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerID - 1].name;
    } else {
        gameOverElement.firstElementChild.textContent = 'It is a draw !';
    }
}