let boxes = document.querySelectorAll(".playBox");
let resetBtn = document.querySelector("#resetGameButton");
let newGameBtn = document.querySelector(".newGameBtn");
let winningMessage = document.querySelector("#winningMessage");
let winningMsgContainer = document.querySelector(".winningMsgContainer")

let turnO = true; // if this is false then value = X and if this is true the value = O

const winPatters = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const resetGame = () => {
    turnO = true;
    enableButtons();
    winningMsgContainer.classList.add("hide");
}

const enableButtons = ()=> {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableButtons = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=> {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // disabled the box so it can't be clicked again
        
        checkWinner();
    })
})

const showWinner = (winner) => {
    winningMessage.innerText = `Congratulations Player ${winner}`;
    winningMsgContainer.classList.remove("hide");
    disableButtons();
}

const checkWinner = ()=> {
    for(let pattern of winPatters) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)