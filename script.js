function gameBoard(){
  let board;
  const gridSize = 3;
  let cells;
  const makeBoard = ()=> {
    board = [];
    cells = 1;
    for (i = 0; i < gridSize; i++){
      board.push([]);
      for(j = 0; j < gridSize; j++){
        board[i].push(cells);
        cells++;
      }
    };
  }
  makeBoard();
  const getBoard = () => board;
  const placeMark = (row, column, player) => {
      board[row][column] = player;
  };
  const printBoard = () => {
    console.log(board);
  };
  return {
    getBoard,
    placeMark,
    printBoard,
    resetBoard: makeBoard};
};


function gameController(){
  let playerOneName = "Player One";
  let playerTwoName = "Player Two";
  const players = [
    {
      name: playerOneName,
      symbol: "X"
    }, 
    {
      name: playerTwoName,
      symbol: "O"
    }
  ];
  const board = gameBoard();
  let activePlayer = players[0];
  const switchTurn = () => {
  activePlayer = (activePlayer === players[0])? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const printARound = () => {
    board.printBoard();
    console.log(`${activePlayer.name}'s turn`);
  }
  const isRowEqual = arr => arr.every(val => val === arr[0]);
  const isColEqual = (board, col) => {
    let colCells = board.map(row => row[col]);
    return colCells.every(val => val === colCells[0]);
  };
  const isDiagEqual = (board) => {
    let diagCells = [];
    let diagCells2 = [];
    let col = board.length - 1;
    for (i = 0; i < board.length; i++){
      diagCells.push(board[i][i]);
      diagCells2.push(board[i][col]);
      col--;
    };
    let checkDiag = diag => diag.every(val => val === diag[0]);
    return checkDiag(diagCells) || checkDiag(diagCells2);
  };
  const winConditions = () => {
    let getBoard = board.getBoard()
    for (i = 0; i < getBoard.length; i++){
      if (isRowEqual(getBoard[i])){
        console.log("row win")
        return true;
      };
      if (isColEqual(getBoard, i)){
        console.log("column win");
        return true;
      };
    };
    if (isDiagEqual(getBoard)){
      console.log("diagonal win")
      return true;
    };
    return false;
  };
  const playARound = (row, column) => {
      board.placeMark(row, column, getActivePlayer().symbol)
      printARound();
      if (!winConditions()){
      switchTurn();
      }
  };

  printARound();

  return {
    playerOne:players[0],
    playerTwo:players[1],
    playARound,
    switchTurn,
    winConditions,
    getActivePlayer,
    getBoard: board.getBoard,
    resetBoard: board.resetBoard
  };
};

function screenRender(){
  const boardDiv = document.querySelector(".board");
  const turn = document.querySelector(".turn");
  const retryButton = document.querySelector(".retry");
  const game = gameController();
  let board = game.getBoard();
  const update = ()=> {
    board = game.getBoard();
    turn.textContent = `${game.getActivePlayer().name}\nTURN`;
    boardDiv.textContent = "";
    board.forEach((row, rowIndex) => { 
      row.forEach((cell, colIndex) =>{
        const cellB = document.createElement("button");
        cellB.classList.add("cell");
        cellB.dataset.row = rowIndex;
        cellB.dataset.column = colIndex;
        // only display the players symbol
        if (cell === game.playerOne.symbol || cell === game.playerTwo.symbol){
          cellB.textContent = cell;
        }
        // this is for making a different color for x
        if (cellB.textContent === "X"){
          cellB.classList.add("cross");
        }
        else {
          cellB.classList.remove("cross");
        };
        boardDiv.appendChild(cellB);
      });
    });
    if (game.winConditions()){
      turn.textContent = `${game.getActivePlayer().name}\n WINS`;
    };
  }
  function insertSymbol(e){
    const column = e.target.dataset.column;
    const row = e.target.dataset.row;
    if (!row && !column || (board[row][column] === game.playerOne.symbol || board[row][column] === game.playerTwo.symbol) || game.winConditions()) {return};
      game.playARound(row, column);
      update();
  };
  function retry(){
    game.resetBoard();
    game.winConditions();
    if (game.getActivePlayer().symbol === game.playerTwo.symbol){
      game.switchTurn();
    };
    update();
  };
  retryButton.addEventListener("click", retry);
  boardDiv.addEventListener("click", insertSymbol);
  update();
};
screenRender();


