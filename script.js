function gameBoard(){
  let board = [];
  const gridSize = 3;
  for (i = 0; i < gridSize; i++){
    board.push([]);
    for(j = 0; j < gridSize; j++){
      board[i].push(0);
    }
  };
  const getBoard = () => board;
  const placeMark = (row, column, player) => {
      board[row][column] = player;
  };
  const printBoard = () => {
    console.log(board);
  };
  const resetBoard = () => {
    board = [];
    console.log(board);
  };
  return {getBoard, placeMark, printBoard, resetBoard};
};


function gameController(){
  let playerOneName = "Player One";
  let playerTwoName = "Player Two";
  const players = [
  {
  name: playerOneName,
  symbol: "X"
  }
  , 
  {
    name: playerTwoName,
    symbol: "O"
  }
  ];
  const board = gameBoard();
  const getBoard = board.getBoard();
  const allIsEqual = arr => arr.every(val => val === arr[0]);

  let activePlayer = players[0];
  const switchTurn = () => {
  activePlayer = (activePlayer === players[0])? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const printARound = () => {
    board.printBoard();
    console.log(`${activePlayer.name}'s turn`);
  }
  const winConditions = () => {
    // horizontal win condition
    for (col = 0; col < getBoard.length; col++){
      let symbolRef = getBoard[col][0];
      let win = true;
      if (symbolRef === "X" || symbolRef === "O"){
        if (!allIsEqual(getBoard[col])){
          win = false;
        };
      }
      else {
        continue;
      };
      if (win){
        console.log(`${activePlayer.name} wins`);
        return win;
      };
    };
    // vertical win condition
    for (col= 0; col < getBoard.length; col++){
      let symbolRef = getBoard[0][col];
      let win = true;
      if (symbolRef === "X" || symbolRef === "O"){
        for(row = 1; row < getBoard.length; row++){
          if (symbolRef !== getBoard[row][col]){
            win = false;
            break;
          };
        };
      }
      else {
        continue;
      };
      if (win){
        console.log(`${activePlayer.name} wins vertical`);
        return win;
      };
    };
    //* diagonal win condition
    let symbolRef = getBoard[0][0];
    let win = true;
    if (symbolRef === "X" || symbolRef === "O"){
      for (row = 1; row < getBoard.length; row++){
        if (symbolRef !== getBoard[row][row]){
        win = false;
        break;
        };
      };
      if (win){
        console.log(`${activePlayer.name} wins diagonal 1`)
        return win;
      };
    };
    // diagonal win condition 2 
    symbolRef = getBoard[0][2];
    win = true;
    if (symbolRef === "X" || symbolRef === "O"){
      let col = 1;
      for (row = 1; row >= 0; row--){
        if (symbolRef !== getBoard[col][row]){
        win = false;
        break;
        }
        col++;
      };
      if (win){
        console.log(`${activePlayer.name} wins diagonal 2`)
        return win;
      };
    };
  };
  const playARound = (row, column) => {
    if (getBoard[row][column] === 0){
      board.placeMark(row, column, getActivePlayer().symbol)
      if (!winConditions()){
        switchTurn();
      };
      printARound();
      };
  };

  printARound();

  return {
    playerOne:players[0].name,
    playerTwo:players[1].name,
    playARound,
    winConditions,
    getActivePlayer,
    getBoard: board.getBoard,
    reset: board.resetBoard
  };
};

function screenRender(){
  const boardDiv = document.querySelector(".board");
  const turn = document.querySelector(".turn");
  const retry = document.querySelector(".retry");
  const game = gameController();
  const board = game.getBoard();
  const update = ()=> {
    turn.textContent = `${game.getActivePlayer().name}\nTURN`;
    boardDiv.textContent = "";
    board.forEach((row, rowIndex) => { 
      row.forEach((cell, colIndex) =>{
        const cellB = document.createElement("button");
        cellB.classList.add("cell");
        cellB.dataset.row = rowIndex;
        cellB.dataset.column = colIndex;
        cellB.textContent = cell;
        // this is to hide the initial value
        if (cellB.textContent === "0"){
          cellB.classList.add("hidden");
        }
        else {
          cellB.classList.remove("hidden");
        };
        // this is to make a different color for X
        if (cellB.textContent === "X"){
          cellB.classList.add("cross");
        }
        else {
          cellB.classList.remove("cross");
        };
        boardDiv.appendChild(cellB);
      })
    })
  }
  function insertSymbol(e){
    const column = e.target.dataset.column;
    const row = e.target.dataset.row;
    if (!column && !row) return;
    if (!game.winConditions()){
    game.playARound(row, column);
    update();
    }
    if (game.winConditions()){
      update();
      turn.textContent = `${game.getActivePlayer().name}\n WINS`;
    };
  };
  function reset(){
    game.reset();
  }
  retry.addEventListener("click", reset);
  boardDiv.addEventListener("click", insertSymbol);
  update();
}
screenRender();


