function gameBoard(){
  const board = [];
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
  return {getBoard, placeMark, printBoard};
};


function gameController(){
  let playerOneName = "john";
  let playerTwoName = "jasper";
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
      if (allIsEqual(getBoard[col]) && getBoard[col][0] === "X"){
        console.log(`${activePlayer.name} wins horizontal`);
        return true;
      }
      else if (allIsEqual(getBoard[col]) && getBoard[col][0] === "O"){
        console.log(`${activePlayer.name} wins horizontal`);
        return true;
      }
    }
    // vertical win condition
    for (col= 0; col < getBoard.length; col++){
      let symbolRef = getBoard[0][col];
      let win = true;
      if (symbolRef === "X" || symbolRef === "O"){
        for(row = 1; row < getBoard.length; row++){
          if (symbolRef !== getBoard[row][col]){
            win = false;
            break;
          }
        }
      }
      else {
        continue;
      }
      if (win){
        console.log(`${activePlayer.name} wins vertical`);
        return true;
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
        }
      }
      if (win){
        console.log(`${activePlayer.name} wins diagonal 1`)
        return true;
      }
    }
    // diagonal win condition 2 
    let symbolRef1 = getBoard[0][2];
    let win1 = true;
    if (symbolRef1 === "X" || symbolRef1 === "O"){
      let col = 1;
      for (row = 1; row >= 0; row--){
        if (symbolRef1 !== getBoard[col][row]){
        win1 = false;
        break;
        }
        col++;
      }
      if (win1){
        console.log(`${activePlayer.name} wins diagonal 2`)
        return true;
      }
    }
  }
  const playARound = (row, column) => {   
    if (getBoard[row][column] === 0){
      board.placeMark(row, column, getActivePlayer().symbol)
      if (winConditions()){
        console.log(`Game Over`);
      }
      else {
      switchTurn();
      printARound();
      };
    }
    else {
      console.log("cell is already take, smh")
    };
  };

  printARound();

  return {
    playARound,
    getActivePlayer,
    getBoard: board.getBoard
  };
};

function screenRender(){
  const boardDiv = document.querySelector(".board");
  const game = gameController();
  const board = game.getBoard();
  const update = ()=> {
    boardDiv.textContent = "";
    board.forEach((row, rowIndex) => { 
      row.forEach((cell, colIndex) =>{
        const cellB = document.createElement("button");
        cellB.classList.add("cell");
        cellB.dataset.row = rowIndex;
        cellB.dataset.column = colIndex;
        cellB.textContent = cell;
        if (cellB.textContent === "0"){
          cellB.classList.add("hidden");
        }
        else {
          cellB.classList.remove("hidden");
        }
        boardDiv.appendChild(cellB);
      })
    })
  }
  function insertSymbol(e){
    const column = e.target.dataset.column;
    const row = e.target.dataset.row;
    if (!column && !row) return;
    game.playARound(row, column);
    update();
  }
  boardDiv.addEventListener("click", insertSymbol);
  update();
}
screenRender();


