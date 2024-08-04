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
    console.log(getBoard[0][0]);
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
        console.log("game is done for");
      };
      switchTurn();
    }
    else {
      console.log("cell is already take, smh")
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

