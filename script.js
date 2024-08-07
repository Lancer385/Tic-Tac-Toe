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
  const players = [
    {
      name: "X",
      symbol: "X",
      score: 0
    }, 
    {
      name: "O",
      symbol: "O",
      score: 0
    }
  ];
  const board = gameBoard();
  let turnCounter = 0;
  const incraseCounter = () => {
    turnCounter++;
  };
  const resetCounter = () => {
    turnCounter = 0;
  };
  let activePlayer = players[0];
  const switchTurn = () => {
  activePlayer = (activePlayer === players[0])? players[1] : players[0];
  };
  const getTurnCounter = () => turnCounter;
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
  const isGameOver = () => {
    let getBoard = board.getBoard()
    for (i = 0; i < getBoard.length; i++){
      if (isRowEqual(getBoard[i])){
        return true;
      };
      if (isColEqual(getBoard, i)){
        return true;
      };
    };
    if (isDiagEqual(getBoard)){
      return true;
    };
    return false;
  };
  const playARound = (row, column) => {
      board.placeMark(row, column, getActivePlayer().symbol)
      printARound();
      if (!isGameOver()){
      switchTurn();
      incraseCounter();
      }
      if (isGameOver()){
        getActivePlayer().score++;
      }
  };

  printARound();

  return {
    playerOne:players[0],
    playerTwo:players[1],
    playARound,
    switchTurn,
    isGameOver,
    getTurnCounter,
    resetCounter,
    getActivePlayer,
    getBoard: board.getBoard,
    resetBoard: board.resetBoard
  };
};

function screenController(){
  const boardDiv = document.querySelector(".board");
  const status = document.querySelector(".status");
  const scores = {
    cross: document.querySelector(".cross"),
    circle: document.querySelector(".circle")
  };
  const names = {
    cross: document.querySelector(".one"),
    circle: document.querySelector(".two")
  };
  const retryButton = document.querySelector(".retry");
  const game = gameController();
  let board = game.getBoard();
  const updateScreen = ()=> {
    board = game.getBoard();
    status.textContent = `${game.getActivePlayer().name}\nTURN`;
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
        };
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
    if (game.isGameOver()){
      status.textContent = `${game.getActivePlayer().name} WINS`;
    };
    if (game.getTurnCounter() === 9){
      status.textContent = "TIE";
    };
    names.cross.textContent = `${game.playerOne.name}`;
    names.circle.textContent = `${game.playerTwo.name}`;
    scores.cross.innerHTML = `X<br>${game.playerOne.score}`;
    scores.circle.innerHTML = `O<br>${game.playerTwo.score}`;
  };
  function insertSymbol(e){
    const column = e.target.dataset.column;
    const row = e.target.dataset.row;
    if (!row && !column || (board[row][column] === game.playerOne.symbol || board[row][column] === game.playerTwo.symbol) || game.isGameOver()) {return};
      game.playARound(row, column);
      updateScreen();
  };
  function retry(){
    game.resetBoard();
    game.isGameOver();
    if (game.getActivePlayer().symbol === game.playerTwo.symbol){
      game.switchTurn();
    };
    game.resetCounter();
    updateScreen();
  };
  retryButton.addEventListener("click", retry);
  boardDiv.addEventListener("click", insertSymbol);
  updateScreen();
};
screenController();


