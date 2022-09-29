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
const allCells = document.querySelectorAll(".cell");

function resetGame(){

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
        (game_state[win_state[0]] == game_state[win_state[1]]) &&
        game_state[win_state[1]] == game_state[win_state[2]] &&
        game_state[win_state[0]] != -1
      ) {
        // Check who won
        if (player == 1) {
          console.log("Red has won.");
          game_active = false;
        } else {
          console.log("Yellow has won.");
          game_active = false;
        }
      }
    }
    if(counter == 9){
      console.log("It's a tie.")
    }
  }
}

for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("click", playMode);
}
