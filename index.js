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
startGame();

function startGame() {
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
  if (
    game_state[event.target.id] != "Red" &&
    game_state[event.target.id] != "Yellow"
  ) {
    const cell = document.getElementById(event.target.id);
    game_state[event.target.id] = user_player;
    cell.style.backgroundImage = "url(./Assets/red.png)";
    const winner = checkForWinners(game_state, computer_player);
    if (winner) {
      endGame(winner);
    }
    if (!checkForWinners(game_state, user_player) && !checkForTie()) {
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
function checkForWinners(playing_state, player) {
  const plays_of_player = [];
  for (let i = 0; i < playing_state.length; i++) {
    if (playing_state[i] == player) {
      plays_of_player.push(i);
    }
  }
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
function getOptimalCell() {
  return minimax(game_state, computer_player).index;
}
function getEmptyCells() {
  const empty_cells = [];
  for (let i = 0; i < game_state.length; i++) {
    if (game_state[i] != "Red" && game_state[i] != "Yellow") {
      empty_cells.push(game_state[i]);
    }
  }
  return empty_cells;
}
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
function minimax(playing_state, player) {
  const available_cells = getEmptyCells();

  if (checkForWinners(playing_state, user_player)) {
    return { score: -10 };
  } else if (checkForWinners(playing_state, computer_player)) {
    return { score: 10 };
  } else if (available_cells.length === 0) {
    return { score: 0 };
  }
  const moves = [];
  for (let i = 0; i < available_cells.length; i++) {
    const move = {};
    move.index = playing_state[available_cells[i]];
    playing_state[available_cells[i]] = player;

    if (player == computer_player) {
      var result = minimax(playing_state, user_player);
      move.score = result.score;
    } else {
      var result = minimax(playing_state, computer_player);
      move.score = result.score;
    }

    playing_state[available_cells[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  if (player === computer_player) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
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
reset_btn.addEventListener("click", startGame);
