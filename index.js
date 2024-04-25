// TIC TAC TOE
// Play Tic Tac Toe by clicking on an empty cell

// Select the status display
const statusDisplay = document.querySelector(".gameStatus");
// Select all the cells
let gameActive = true;
// Select the player
let currentPlayer = "X";
// Select the cells
let gameState = ["", "", "", "", "", "", "", "", ""];

// Select the winning conditions
const winnerMessage = () => `Player ${currentPlayer} has won!`;
// Select the draw
const drawMessage = () => `Game ended in a draw!`;
// Select the next player
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Display the next player
statusDisplay.innerHTML = currentPlayerTurn();

//Set winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to play the game
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}
//function to change the player
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

//function to check if the game is over
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winnerMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

//function to handle click events
function handleCellClick(clickCellEvent) {
  const clickedCell = clickCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

//function to handle restart button
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

//Add event listeners
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".gameRestart")
  .addEventListener("click", handleRestartGame);
