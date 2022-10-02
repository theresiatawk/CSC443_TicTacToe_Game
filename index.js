let game_state = [];
const user_player = "Red";
const computer_player = "Yellow";
const winning_states = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const all_cells = document.querySelectorAll(".cell");
const reset_btn = document.getElementById("reset");
const state = document.getElementById("state");

// Starting the game
startGame();

function startGame() {
  // Setting the initial state of the game
  state.style.color = "black";
  state.innerText = "Enjoy the Process!";
  reset_btn.style.display = "none";
  for (let i = 0; i < 9; i++) {
    game_state[i] = i;
    all_cells[i].style.backgroundImage = "url()";
    all_cells[i].addEventListener("click", onCellClick);
  }
}

function onCellClick(event) {
  // if empty cell
  if (
    game_state[event.target.id] != "Red" &&
    game_state[event.target.id] != "Yellow"
  ) {
    // Place Reserved for the user
    const cell = document.getElementById(event.target.id);
    game_state[event.target.id] = user_player;
    cell.style.backgroundImage = "url(./Assets/red.png)";
    const winner = checkForWinners(game_state, computer_player);
    if (winner) {
      endGame(winner);
    }
    if (!checkForWinners(game_state, user_player) && !checkForTie()) {
      // Getting the optimal cell and reserve it for the computer
      const cell_index = getOptimalCell();
      const cell = document.getElementById(cell_index);
      game_state[cell_index] = computer_player;
      cell.style.backgroundImage = "url(./Assets/yellow.png)";
      const winner = checkForWinners(game_state, computer_player);
      if (winner) {
        endGame(winner);
      }
    }
  }
}
// Function that check if a certain player is a winner or not
function checkForWinners(playing_state, player) {
  let winner = null;
  for (let win of winning_states) {
    if (
      game_state[win[0]] == game_state[win[1]] &&
      game_state[win[0]] == game_state[win[2]] &&
      game_state[win[1]] == game_state[win[2]] &&
      game_state[win[0]] == player
    ) {
      winner = player;
    }
  }
  return winner;
}
// Checking if no winners and the game end
function checkForTie() {
  if (getEmptyCells().length == 0) {
    for (let i = 0; i < all_cells.length; i++) {
      all_cells[i].removeEventListener("click", onCellClick);
    }
    state.style.color = "red";
    state.innerText = "It's a tie.";
    reset_btn.style.display = "block";
    return true;
  }
  return false;
}
// Function that return the best optimal index to be reserved by the computer
function getOptimalCell() {
  return minimax(game_state, computer_player).index;
}
// Return an array that contain the indeces of empty cells
function getEmptyCells() {
  const empty_cells = [];
  for (let i = 0; i < game_state.length; i++) {
    if (game_state[i] != "Red" && game_state[i] != "Yellow") {
      empty_cells.push(game_state[i]);
    }
  }
  return empty_cells;
}
// Function that display the correct output (based on the winner) when the game end.
function endGame(winner) {
  for (var i = 0; i < all_cells.length; i++) {
    all_cells[i].removeEventListener("click", onCellClick);
  }
  if (winner.player == user_player) {
    state.style.color = "red";
    state.innerText = "You Won!";
    reset_btn.style.display = "block";
  } else {
    state.style.color = "red";
    state.innerText = "You lose!";
    reset_btn.style.display = "block";
  }
}
// Function that implement Minimax Algorithm and return an object with an index and score(hoighest one)
function minimax(playing_state, player) {
  //Getting the empty indexes in the game
  const available_cells = getEmptyCells();

  //Checking for the terminal states(win, lose, and tie)
  if (checkForWinners(playing_state, user_player)) {
    return { score: -10 };
  } else if (checkForWinners(playing_state, computer_player)) {
    return { score: 10 };
  } else if (available_cells.length === 0) {
    return { score: 0 };
  }
  const moves = [];
  //Looping through the available cells of the game
  for (let i = 0; i < available_cells.length; i++) {
    //Creating an object for each empty cell and storing the index of it
    const move = {};
    move.index = playing_state[available_cells[i]];
    // Setting the current cell to the empty player
    playing_state[available_cells[i]] = player;

    // Collecting the score resulted from each run
    if (player == computer_player) {
      var result = minimax(playing_state, user_player);
      move.score = result.score;
    } else {
      var result = minimax(playing_state, computer_player);
      move.score = result.score;
    }
    // Resetting the spot to empty
    playing_state[available_cells[i]] = move.index;

    moves.push(move);
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score (Maximizing)
  let bestMove;
  if (player === computer_player) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  // if it is the user's turn loop over the moves and choose the move with the lowest score (Minimizing)
  else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
// On Click Reset the game
reset_btn.addEventListener("click", startGame);
