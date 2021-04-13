const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message')
const winningTextElement = document.querySelector('[data-winning-text]');
const restartBtn = document.getElementById('restartbtn');
const winningConbinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 4, 8],
    [0, 4, 8], [2, 4, 6]
]
const x_Class = 'x';
const o_Class = 'o';

let circleTurn;

restartBtn.addEventListener('click', startGame);

startGame();

function startGame(){    
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(x_Class);
        cell.classList.remove(o_Class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once:true })
    });
    setBoardClass()
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentCLass = circleTurn ? o_Class : x_Class;

    placeMark(cell, currentCLass);
    if (checkWin(currentCLass)){
        endGame(false);
    } else if(isDraw()){
        endGame(true);
    }else{
        swapTurn()
        setBoardClass()
    }
    
}

function placeMark(cell, currentCLass){    
    cell.classList.add(currentCLass);
}

function swapTurn(){
    circleTurn = !circleTurn;
}

function setBoardClass(){
    if (circleTurn) {
        board.classList.remove(x_Class);
        board.classList.add(o_Class);
    } else {
        board.classList.remove(o_Class);
        board.classList.add(x_Class);
    }
}

function checkWin(currentCLass){
    return winningConbinations.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentCLass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_Class) ||
        cell.classList.contains(o_Class);
    });
}

function endGame(draw){
    if (draw) {
        winningTextElement.innerText= "Draw!";
    }else {
        winningTextElement.innerText = circleTurn ? "O's Wins!" : "X's Wins!";
    }

    winningMessageElement.classList.add('show');
}