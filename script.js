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
  const winConditions = () => {
    for (col = 0; col < getBoard.length; col++){
      if (allIsEqual(getBoard[col]) && getBoard[col][0] === "X"){
        console.log("X Wins horizontal");
        return true;
      }
      else if (allIsEqual(getBoard[col]) && getBoard[col][0] === "O"){
        console.log(`O wins horizontal`);
        return true;
      }
    }
    // vertical win condition
    for (col= 0; col < getBoard.length; col++){
      let symbolRef = getBoard[col][0];
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
        console.log(`${symbolRef} wins vertical`);
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
        console.log(`${symbolRef} wins diagonal 1`)
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
        console.log(`${symbolRef1} wins diagonal 2`)
        return true;
      }
    }
  }
  const playARound = (row, column) => {   
    if (getBoard[row][column] === 0){
      board.placeMark(row, column, getActivePlayer())
      switchTurn();
    }
    else {
      console.log("cell is already take, smh")
    }
    if (winConditions()){
      console.log("game is done for");
    };
    printARound();
  };

  printARound();

  return {
    playARound,
    getActivePlayer
  };
};
const game = gameController();

