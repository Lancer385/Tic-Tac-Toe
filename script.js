function gameBoard(){
  let board;
  const gridSize = 3;
  let cells;
  // handles creating the game board  
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
  // initial call to create the board
  makeBoard();
  // gets the updated board
  const getBoard = () => board;
  // handles inputing players' symbols
  const addSymbol = (row, column, player) => {
      board[row][column] = player;
  };
  return {
    getBoard,
    addSymbol,
    // this is used for the retry button
    resetBoard: makeBoard};
};


function gameController(){
  // stores players data
  const players = [
    {
      name: "Player One",
      symbol: "X",
      score: 0
    }, 
    {
      name: "Player Two",
      symbol: "O",
      score: 0
    }
  ];
  // gets the reuired methods to change the board
  const board = gameBoard();
  // count the turns to check when there's a tie which is at the ninth turn
  let turnCounter = 0;
  const incraseCounter = () => {
    turnCounter++;
  };
  const resetCounter = () => {
    turnCounter = 0;
  };
  const getTurnCounter = () => turnCounter;

  // method to switch players' turns
  let activePlayer = players[0];
  const switchTurn = () => {
  activePlayer = (activePlayer === players[0])? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;



  // the logic that handles the winning conditions
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
  // if one of the conditions are met, then the game is over!
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



  // handles each player turn
  const playARound = (row, column) => {
      board.addSymbol(row, column, getActivePlayer().symbol)
      if (!isGameOver()){
      switchTurn();
      incraseCounter();
      }
      if (isGameOver()){
        getActivePlayer().score++;
      }
  };
  // all the returned methods that are needed for the UI
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
  // displays the game status such as the player's turn and winning condition
  const status = document.querySelector(".status");


  // displays each player score and name
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
    // this part is needed to update the board whenever you retry
    board = game.getBoard();
    status.innerHTML = `${game.getActivePlayer().name}<br>TURN`;
    boardDiv.textContent = "";

    // handles disaplying the symbols in each cell
    board.forEach((row, rowIndex) => { 
      row.forEach((cell, colIndex) =>{
        const cellB = document.createElement("button");
        cellB.classList.add("cell");
        cellB.dataset.row = rowIndex;
        cellB.dataset.column = colIndex;
        // only displays the players symbol. any other value will be disgarded
        if (cell === game.playerOne.symbol || cell === game.playerTwo.symbol){
          cellB.textContent = cell;
        };
        // this is just for styling, making different color for X
        if (cellB.textContent === "X"){
          cellB.classList.add("unique");
        }
        else {
          cellB.classList.remove("unique");
        };
        boardDiv.appendChild(cellB);
      });
    });
    if (game.isGameOver()){
      status.innerHTML = `${game.getActivePlayer().name}<br>WINS`;
    };
    if (game.getTurnCounter() === 9){
      status.textContent = "TIE";
    };
    names.cross.textContent = `${game.playerOne.name}`;
    names.circle.textContent = `${game.playerTwo.name}`;
    scores.cross.innerHTML = `X<br>${game.playerOne.score}`;
    scores.circle.innerHTML = `O<br>${game.playerTwo.score}`;
  };

  // click handler for adding player's symbol 
  function inputClicker(e){
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

  // handles renaming players
  function rename(player){
    let userPrompt = prompt("Insert Your Name Here");
    if (userPrompt !== null){
    player.name = userPrompt;
    updateScreen();
    };
  };
  names.cross.addEventListener("click", () => rename(game.playerOne));
  names.circle.addEventListener("click", () => rename(game.playerTwo));
  retryButton.addEventListener("click", retry);
  boardDiv.addEventListener("click", inputClicker);
  updateScreen();
};
screenController();


