let player = 0;
const allCells = document.querySelectorAll(".cell");

for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("click", function () {
    if (player == 0){
        this.style.backgroundImage = "url(./Assets/red.png)";
        player = 1;
    }
    else{
        this.style.backgroundImage = "url(./Assets/yellow.png)";
        player = 0;
    }
    
  });
}
