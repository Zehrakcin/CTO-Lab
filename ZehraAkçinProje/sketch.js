let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let gamesList = [];
let playerXName = '';
let playerOName = '';

function setup() {
  createCanvas(300, 300);
}


function startGame() {
  playerXName = document.getElementById('playerX').value;
  playerOName = document.getElementById('playerO').value;

  document.getElementById('name-input').style.display = 'none';
  document.getElementById('game-board').style.display = 'block';

  displayResult('Game started! ' + playerXName + ' (X) vs ' + playerOName + ' (O)');
  
  if (playerXName != '' && playerOName != ''){
  drawBoard();
  }      
}
function drawBoard() {
  
if (playerXName != '' && playerOName != ''){
  background(255);
  strokeWeight(4);
    for (let i = 1; i < 3; i++) {
      line(0, i * 100, width, i * 100);
      line(i * 100, 0, i * 100, height);
    }

    for (let i = 0; i < 9; i++) {
      let x = (i % 3) * 100 + 50;
      let y = Math.floor(i / 3) * 100 + 50;

      if (board[i] == 'X') {
        drawX(x, y);
      } else if (board[i] == 'O') {
        drawO(x, y);
      }
    }
  }

function drawX(x, y) {
  line(x - 40, y - 40, x + 40, y + 40);
  line(x + 40, y - 40, x - 40, y + 40);
}

function drawO(x, y) {
  ellipse(x, y, 80, 80);
}

}
function mouseClicked() {
  if (!gameOver) {
    let col = floor(mouseX / 100);
    let row = floor(mouseY / 100);
    let index = row * 3 + col;

    if (board[index] === '') {
      board[index] = currentPlayer;
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

      let winner = checkWinner();
      if (winner !== null || !board.includes('')) {
        endGame(winner);
      } 
      else {
        drawBoard();
      }
    }
  }
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (board[i * 3] !== '' && board[i * 3] == board[i * 3 + 1] && board[i * 3] == board[i * 3 + 2]) {
      return board[i * 3];
    }
    if (board[i] !== '' && board[i] == board[i + 3] && board[i] == board[i + 6]) {
      return board[i];
    }
  }
  if (board[0] !== '' && board[0] == board[4] && board[0] == board[8]) {
    return board[0];
  }
  if (board[2] !== '' && board[2] == board[4] && board[2] == board[6]) {
    return board[2];
  }
  return null;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  drawBoard();
}

function endGame(winner) {
  gameOver = true;

  if (winner !== null) {
    displayResult(winner + ' wins!');
    
  } 
  else {
    displayResult('Its a tie');
    resetGame();
  }
}

function displayResult(result) {
  let resultElement = document.getElementById('result');
  resultElement.textContent = result;
  
  let playersInfoElement = document.getElementById('players-info');
  playersInfoElement.textContent = playerXName + ' (X) vs ' + playerOName + ' (O)';
}

