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
  console.log(board);
  const printBoard = () => {
    console.log(board);
  };
  return {getBoard, placeMark, printBoard};
};


function gameController(){
  const players = {
    player1: "X",
    player2: "O",
  };
  const board = gameBoard();
  const getBoard = board.getBoard();
  const allIsEqual = arr => arr.every(val => val === arr[0]);

  let activePlayer = players.player1;
  const switchTurn = () => {
  activePlayer = (activePlayer === players.player1)? players.player2 : players.player1;
  };
  const getActivePlayer = () => activePlayer;
  const printARound = () => {
    board.printBoard();
    console.log(`${activePlayer} turn`);
  }
  const playARound = (row, column) => {   
    if (getBoard[row][column] === 0){
      board.placeMark(row, column, getActivePlayer())
      switchTurn();
    }
    else {
      console.log("cell is already take, smh")
    }
    for (i = 0; i < getBoard.length; i++){
      if (allIsEqual(getBoard[i]) && getBoard[i][0] === "X"){
        console.log("X Wins");
      }
      else if (allIsEqual(getBoard[i]) && getBoard[i][0] === "O"){
        console.log(`O wins`);
      }
    }
    printARound();
  };

  printARound();

  return {
    playARound,
    getActivePlayer
  };
};

const game = gameController();
