let turn = true;
let lastPosition;
let isGameOver = false;
let gameData = Array(9).fill(1);
const cells = document.querySelectorAll('td');
const winner = document.querySelector('.win');
const undoButton = document.querySelector('#undo-btn');
const resetButton = document.querySelector('#reset-btn');
const success = new Audio('./static/click.wav');
const winStates = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];


function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}

function togglePlayer() {
  one.classList.toggle('highlight');
  two.classList.toggle('highlight');
}

function undoMove() {
  if (lastPosition) {
    let [cell, index] = lastPosition;
    turn = !turn;
    gameData[index] = 1;
    cell.textContent = "";
    togglePlayer();
  }
}

function getPlayer() {
  let currentPlayer = turn ? "X" : "0";
  turn = !turn;
  togglePlayer();
  return currentPlayer;
}

function resetBoard() {
  togglePlayer();
  isGameOver = false;
  gameData = Array(9).fill(1);
  undoButton.classList.remove('hidden');
  winner.classList.add('hidden');
  resetButton.textContent = "Restart";
  cells.forEach(function(cell) {
    cell.textContent = "";
  });
}

function playGame(event, index) {
  if (gameData[index] === 1 && !isGameOver) {
    playAudio(success);
    let cell, currentPlayer;
    cell = event.currentTarget;
    currentPlayer = getPlayer();
    lastPosition = [cell, index];
    gameData[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkGameState(currentPlayer);
  }
}

function checkGameState(currentPlayer) {
  let isDraw = true;
  winStates.forEach(function([i, j, k]) {
    let A = gameData[i];
    let B = gameData[j];
    let C = gameData[k];
    if (assertGameData(A, B, C, currentPlayer)) {
      isDraw = false;
    }
  });
  if (isDraw) {
    if (!gameData.includes(1)) {
      displayResults(!isDraw); // Draw
    }
  }
  else {
    displayResults(currentPlayer); // Win
  }
}

function displayResults(win) {
  winner.classList.remove('hidden');
  if (win === false) {
    winner.textContent = "Draw";
  }
  else {
    //↻
    winner.textContent = (win === "X") ? "Winner is X" : "Winner is 0";
  }
  isGameOver = true;
  undoButton.classList.add('hidden');
  resetButton.innerHTML = "New Game";
}

function assertGameData(A, B, C, currentPlayer) {
  if (A === B) {
    if (B === C) {
      return (C === currentPlayer);
    }
  }
  return false;
}