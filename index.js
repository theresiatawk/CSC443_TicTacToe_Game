var game_state;
const user_player = 'X';
const computer_player = 'O';
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
	game_state = Array.from(Array(9).keys());
  for (let i = 0; i < 9; i++) {
    all_cells[i].style.backgroundImage = "url()";
    all_cells[i].addEventListener("click", onCellClick);
  }	
}

function onCellClick(event) {
  if (typeof game_state[event.target.id] == 'number') {
    const cell = document.getElementById(event.target.id);
		game_state[event.target.id] = user_player;
    cell.style.backgroundImage = "url(./Assets/red.png)";
	  // let gameWon = checkWin(origBoard, player)
	  // if (gameWon) gameOver(gameWon)
		if (!checkForWinners(game_state, user_player) && !checkForTie()){
      const cell_index = bestCell();
      const cell = document.getElementById(cell_index);
		  game_state[cell_index] = computer_player;
      cell.style.backgroundImage = "url(./Assets/red.png)";
      const winner = checkForWinners(game_state, computer_player)
	    // if (winner) gameOver(winner)
    }
	}
}
function checkForWinners(playing_state, player){
  let plays = playing_state.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let winner = null;
	for (let [index, win] of winning_states.entries()) {
		if (win.every(element => plays.indexOf(element) > -1)) {
			winner = {index: index, player: player};
			break;
		}
	}
	return winner;
}
function checkForTie(playing_state, player){
  if (getEmptyCells().length == 0) {
		for (let i = 0; i < all_cells.length; i++) {
			all_cells[i].removeEventListener('click', onCellClick);
		}
    state.style.color = "red";
    state.innerText = "It's a tie.";
    reset_btn.style.display = "block";
		// declareWinner("Tie Game!")
		return true;
	}
	return false;
}
function getBestCell() {

}
function getEmptyCells(){

}


// let game_state_minimax = [-1, -1, -1, -1, -1, -1, -1, -1, -1];


// function playMode(event) {
//   game_state_minimax = [...game_state];
//   console.log("game_state"+ game_state);
//   console.log("game_state_minimax"+ game_state_minimax);
//   console.log("game_state[event.target.id]: "+game_state[event.target.id])
//   if (game_state[event.target.id] == -1 && game_active) {
//     counter++;
//     game_state[event.target.id] = player;
//     game_state_minimax[event.target.id] = player;
//     player = 1;
//     let cell = document.getElementById(event.target.id);
//     cell.style.backgroundImage = "url(./Assets/red.png)";
//     for (let win_state of winning_states) {
//       //Check if someone won
//       if (
//         game_state[win_state[0]] == game_state[win_state[1]] &&
//         game_state[win_state[1]] == game_state[win_state[2]] &&
//         game_state[win_state[0]] != -1
//       ) {
//         // Check who won
//         if (player == 1) {
//           state.style.color = "red";
//           state.innerText = "Red has Won!";
//           game_active = false;
//           reset_btn.style.display = "block";
//         } else {
//           state.style.color = "red";
//           state.innerText = "Yellow has Won!";
//           game_active = false;
//           reset_btn.style.display = "block";
//         }
//       }
//     }
//     if (counter == 9 && game_active) {
//       console.log("It's a tie.");
//       state.style.color = "red";
//       state.innerText = "It's a tie.";
//       reset_btn.style.display = "block";
//     } else {
//       const best_index = minimax(game_state_minimax, player).index;
//       console.log("BestIndex:" +best_index);
//       const best_cell = document.getElementById(best_index);
//       console.log("Best Cell" + best_cell);
//       game_state[best_index] = player;
//       best_cell.style.backgroundImage = "url(./Assets/yellow.png)";
//       player = 0;
//       counter++;
//     }
    
//   }
// }
// function checkForWinner(state) {
//   let winner;
//   for (let win_state of winning_states) {
//     //Check if someone won
//     if (
//       state[win_state[0]] == state[win_state[1]] &&
//       state[win_state[1]] == state[win_state[2]] &&
//       state[win_state[0]] != -1
//     ) {
//       // Check who won
//       if (player == 1) {
//         winner = 0;
//       } else {
//         winner = 1;
//       }
//     }
//   }
//   if (counter == 9 && game_active) {
//     winner = -1;
//   }
//   return winner;
// }
// function getEmptyCells(state) {
//   let availableCells = [];
//   for (let i = 0; i < state.length; i++) {
//     if (state[i] == -1) {
//       availableCells.push(i);
//     }
//   }
//   return availableCells;
// }

// function minimax(new_game_state, player) {
//   const availableCells = getEmptyCells(new_game_state);
//   console.log("AvailableCells" + availableCells);
//   let winner = checkForWinner(new_game_state);
//   // console.log("CheckForWinner: " + result);
//   if (winner == 0) {
//     return { score: -10 };
//   } else if (winner == 1) {
//     return { score: 10 };
//   } else if (availableCells.length === 0) {
//     return { score: 0 };
//   }
//   const moves = [];
//   for (let i = 0; i < availableCells.length; i++) {
//     const move = {};
//     move.index = availableCells[i];
//     console.log("Index:" + move.index);
//     new_game_state[availableCells[i]] = player;
//     // console.log("Game State" + new_game_state[availableCells[i]]);
//     if (player == 1) {
//       const result = minimax(new_game_state, 0);
//       move.score = result.score;
//       // console.log("ResultOfPlayer1: " + move.score);
//     } else {
//       const result = minimax(new_game_state, 1);
//       move.score = result.score;
//       // console.log("ResultOfPlayer0: " + move.score);
//     }
//     console.log("Game State" + new_game_state[availableCells[i]]);
//     new_game_state[availableCells[i]] = move.index;

//     moves.push(move);
//   }
//   console.log(moves);

//   let bestMove;
//   if (player === 1) {
//     let bestScore = -10000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     let bestScore = 10000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }
//   return moves[bestMove];
// }

// for (let i = 0; i < all_cells.length; i++) {
//   all_cells[i].addEventListener("click", playMode);
// }
// reset_btn.addEventListener("click", resetGame);
