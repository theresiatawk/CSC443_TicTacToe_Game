const allCells = document.querySelectorAll(".cell");
console.log(allCells);

for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("click", function () {
    console.log("You clicked:", this.innerText);
  });
}
