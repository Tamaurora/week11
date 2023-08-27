const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const restartButton = document.getElementById('restart');
const winnerAlert = document.getElementById('winner-alert');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

//this checks the winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (gameBoard.every(cell => cell !== '')) {
    return 'draw';
  }

  return null;
}
// if the board is full the game ends
function handleCellClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (gameBoard[index] !== '' || gameOver) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // this tells the game if it's a draw or there's a winner
  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    if (winner === 'draw') {
      winnerAlert.textContent = "It's a draw!";
    } else {
      winnerAlert.textContent = `Player ${winner} wins!`;
    }
    winnerAlert.classList.remove('d-none');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `${currentPlayer}'s Turn`;
  }
}

//this restarts the game
function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  turnDisplay.textContent = `${currentPlayer}'s Turn`;
  winnerAlert.classList.add('d-none');
}

//this button restarts the game when clicked
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
