const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1'); 
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('button');

//Making variables
const currentPlayer = 'X';
const otherPlayer = 'O';
const currentPlayerName = 'Player 1';
const otherPlayerName = 'Player 2';   
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${otherPlayer}`;

//Start game function
const startGame = ()=>{
    gameCells.forEach((cell)=>{
        cell.addEventListener('click', handleClick)
    })
}

const handleClick = (e) => {
    if (e.target.textContent === '') {
      e.target.textContent = playerTurn;
      const winner = checkWin();
  
      if (winner) {
        disableCell(winner); // Pass the winner's name
      } else if (checkDraw()) {
        disableCell();
      } else {
        changePlayerTurn();
      }
    }
  };

//Change Player Turn function
const changePlayerTurn = ()=>{
    if(playerTurn === currentPlayer){
        playerTurn = otherPlayer;
    }
    else{
        playerTurn = currentPlayer;
    }
}

//Winner check function
const checkWin = ()=>{
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i< winningCondition.length; i++){
        const [pos1, pos2, pos3] = winningCondition[i];
        if(gameCells[pos1].textContent !== '' && 
        gameCells[pos1].textContent === gameCells[pos2].textContent && 
        gameCells[pos2].textContent === gameCells[pos3].textContent){
            return playerTurn === currentPlayer ? currentPlayerName : otherPlayerName;
        }
    }
    return null;
}

//check for Draw
const checkDraw = ()=>{
    let emptyCellCount = 0;
    gameCells.forEach((cell)=>{
        if(cell.textContent === ''){
            emptyCellCount++;
        }
    })
    return emptyCellCount === 0 && !checkWin();
}

//disable game Board
const disableCell = (winner) => {
    const gameResult = document.querySelector('.game-result');
    if (winner) {
        gameResult.textContent = `${winner} Wins!`;
    } else {
        gameResult.textContent = "It's a Draw!";
    }

    // Remove click event listeners and disable the cells
    gameCells.forEach((cell) => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}



//restart function
const restartGame = () => {
    const gameResult = document.querySelector('.game-result');
    gameResult.textContent = ''; // Clear the game result message

    // Clear cell content and re-enable the cells
    gameCells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });

    startGame();
}



//restart button
restartBtn.addEventListener('click', restartGame)


//calling start game function
startGame();