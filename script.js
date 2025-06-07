let boardWidth = 360;
let boardHeight = 640;
let backgroundImg = new Image();
backgroundImg.src = "./IMAGES/flappybirdbg.png";
let inputLocked = false;

document.addEventListener("keydown", handleKeyDown);

let GAME_STATE = {
    MENU: "menu",
    PLAYING: "playing",
    GAME_OVER: "gameOver"
};
let currentState = GAME_STATE.MENU;

let playButton = {
    x: boardWidth / 2 - 115.5 / 2,
    y: boardHeight / 2 - 64 / 2,
    width: 115,
    height: 64,
    text: "Play"
};

let logo = {
    x: boardWidth / 2 - 300 / 2,
    y: boardHeight / 4,
    width: 300,
    height: 100,
};

let flappyBirdTextImg = new Image();
flappyBirdTextImg.src = "./IMAGES/flappyBirdLogo.png";

let gameOverTextImg = new Image();
gameOverTextImg.src = "./IMAGES/flappy-gameover.png";

let bird = {
    x: 50,
    y: boardHeight / 2,
    width: 40,
    height: 30,
}

let velocityY = 0;
let velocityX = -2;
let gravity = 0.5;
let birdY = boardHeight / 2;

let pipeWidth = 50;
let pipeGap = 200;
let pipeArray = [];
let pipeIntervalId;

function placePipes() {
    createPipes()
}

function createPipes() {
    let maxTopPipeHeight = boardHeight - pipeGap - 50; // 50 is the bottom margin
    let topPipeHeight = Math.floor(Math.random() * (maxTopPipeHeight)); // Random height up to maxTopPipeHeight
    let bottomPipeHeight = boardHeight - topPipeHeight - pipeGap;

    let topPipe = {
        x : boardWidth,
        y: 0,
        width: pipeWidth,
        height: topPipeHeight,
        passed: false // Flag to check if the bird has passed this pipe
    };

    let bottomPipe = {
        x: boardWidth,
        y: topPipeHeight + pipeGap,
        width: pipeWidth,
        height: bottomPipeHeight,
        passed: false // Flag to check if the bird has passed this pipe
    };

    pipeArray.push(topPipe, bottomPipe);

}  

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext ("2d");

    birdImg = new Image();
    birdImg.src = "./IMAGES/flappybird.png";

    topPipeImg = new Image();
    topPipeImg.src = "./IMAGES/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./IMAGES/bottompipe.png";

    playButtonImg = new Image();
    playButtonImg.src = "./IMAGES/flappyBirdPlayButton.png";

    requestAnimationFrame(update);
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width, board.height);

    if (currentState == GAME_STATE.MENU){
        renderMenu();
    }else if(currentState == GAME_STATE.PLAYING){
        renderGame();
    }else if(currentState == GAME_STATE.GAME_OVER){
        renderGameOver();
    }
}

