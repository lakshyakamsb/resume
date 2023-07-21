document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.getElementsByClassName("cell");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("reset-btn");
  
    let currentPlayer = "X";
    let isGameActive = true;
    let boardState = Array.from(Array(9).fill(""));
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          isGameActive = false;
          status.textContent = `${currentPlayer} wins!`;
          break;
        }
      }
  
      if (!boardState.includes("") && isGameActive) {
        isGameActive = false;
        status.textContent = "It's a draw!";
      }
    };
  
    const handleClick = (cellIndex) => {
      if (!isGameActive || boardState[cellIndex] !== "") {
        return;
      }
  
      boardState[cellIndex] = currentPlayer;
      cells[cellIndex].textContent = currentPlayer;
  
      checkWinner();
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `${currentPlayer}'s Turn`;
    };
  
    const handleCellClick = (event) => {
      const cellIndex = parseInt(event.target.dataset.cell);
      handleClick(cellIndex);
    };
  
    const handleResetGame = () => {
      boardState = Array.from(Array(9).fill(""));
      isGameActive = true;
      currentPlayer = "X";
      status.textContent = `${currentPlayer}'s Turn`;
  
      for (const cell of cells) {
        cell.textContent = "";
      }
    };
  
    for (const cell of cells) {
      cell.addEventListener("click", handleCellClick);
    }
  
    resetBtn.addEventListener("click", handleResetGame);
  });
  