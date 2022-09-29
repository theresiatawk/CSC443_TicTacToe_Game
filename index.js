let player = 0; // player = 0:Red  1: yellow -1:Empty
let counter = 0;
let game_active = true;
let game_state = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
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

function resetGame() {
  counter = 0;
  player = 0;
  game_active = true;
  state.style.color = "black";
  state.innerText = "Enjoy the process!";
  for (let i = 0; i < 9; i++) {
    game_state[i] = -1;
    all_cells[i].style.backgroundImage = "url()";
  }
  reset_btn.style.display = "none";
}

function playMode() {
  if (game_state[this.id] == -1 && game_active) {
    counter++;
    game_state[this.id] = player;

    if (player == 0) {
      this.style.backgroundImage = "url(./Assets/red.png)";
      player = 1;
    } else {
      this.style.backgroundImage = "url(./Assets/yellow.png)";
      player = 0;
    }
    for (let win_state of winning_states) {
      //Check if someone won
      if (
        game_state[win_state[0]] == game_state[win_state[1]] &&
        game_state[win_state[1]] == game_state[win_state[2]] &&
        game_state[win_state[0]] != -1
      ) {
        // Check who won
        if (player == 1) {
          state.style.color = "red";
          state.innerText = "Red has Won!";
          game_active = false;
          reset_btn.style.display = "block";
        } else {
          state.style.color = "red";
          state.innerText = "Yellow has Won!";
          game_active = false;
          reset_btn.style.display = "block";
        }
      }
    }
    if (counter == 9 && game_active) {
      console.log("It's a tie.");
      state.style.color = "red";
      state.innerText = "It's a tie.";
      reset_btn.style.display = "block";
    }
  }
}

for (let i = 0; i < all_cells.length; i++) {
  all_cells[i].addEventListener("click", playMode);
}
reset_btn.addEventListener("click", resetGame);
