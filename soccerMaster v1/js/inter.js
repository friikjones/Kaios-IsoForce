var gameBG = document.getElementById('gameBG');
var playerFrame02Normal = document.getElementById('playerFrame02Normal');
var ball = document.getElementById('ball');
var ballPositionX = canvasW / 2;
var ballPositionY = -30;

//Manager vars
var countdownEnded = false;
var timerLoop = 60;
var timerScreen = 3;

// =================== Game Functions ============================= 

//TODO; refactor all this crap
function UpdateScreenInter() {
    clearScreen();
    ctx.drawImage(gameBG, 0, 0);
    ctx.drawImage(playerFrame02Normal, (canvasW/2)-30, (canvasH - 40)-230);
    ctx.drawImage(ball, ballBorderX, ballBorderY);
    drawTimer();
    
    timerLoop--;
    console.log("KEY timer loop: " + timerLoop);

    if(timerLoop < 46){
        timerScreen = 2;
    }
    if(timerLoop < 31){
        timerScreen = 1;
    }
    if(timerLoop < 16){
        timerScreen = "Go!";
    }
    if(timerLoop < 1){
        countdownEnded = true;
    }
    




    if (countdownEnded) {
        nextState = state.GAME;
        stateChangedFlag = true;
        console.log("KEY next state: " + nextState);
        cleanInterFlags();
    } else
        nextState = state.INTER;

}

// Functions
// =================================================================== 

function cleanInterFlags(){
    countdownEnded = false;
    timerLoop = 90+15;
    timerScreen = 3;
}

function drawTimer() {
    ctx.font = "40px Arial";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = "center";
    ctx.strokeText(timerScreen, canvasW /2, 100);
    ctx.fillText(timerScreen, canvasW /2, 100);
}

