//Main Canvas vars

// document.documentElement.requestFullscreen();

var canvas = document.getElementById('mainCanvas'),
    ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvasW and canvasH are references to size of the screen
var canvasW = canvas.width;
var canvasH = canvas.height;

//Game State Manager vars
const state = {
    MENU: 'menu',
    INTER: 'inter',
    GAME: 'game',
    ADVER: 'adver'
    //Any other state should be added here
}

var stateChangedFlag = true;
var currentState = state.MENU;
var nextState = state.MENU;

var highScore = 0;
var currentScore = 0;
var newHighScoreFlag = true;

updateInfo();

// =================== Core Functions ============================= 

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function consoleState() {
    console.log("current state: "+currentState);
    console.log("next state: "+nextState);
}

function updateInfo() {
    if(localStorage.highScore > highScore){
        highScore = localStorage.highScore;
        newHighScoreFlag = true;
    }else{
        localStorage.highScore = highScore;
    }
    if (currentScore > highScore) {
        highScore = currentScore;
    }
    currentScore = 0;
}

function resetVariables(){

//Game
footPositionX = canvasW / 2;
footPositionY = canvasH - 10 - footSize;
ballPositionX = canvasW / 2;
ballPositionY = -30;
ballVelocityY = 0;
ballVelocityX = -10;
currentScore = 0;
}

function updateListeners(){
    switch(currentState){
        case state.MENU:
            removeMenuListeners();
          break;
        case state.GAME:
            removeGameListeners();
          break;
        case state.END:
            removeEndListeners();
          break;
        case state.ADVER:
            removeAdverListeners();
            break;
        default:
          break;
      }
    switch(nextState){
        case state.MENU:
            addMenuListeners();
          break;
        case state.GAME:
            addGameListeners();
          break;
        case state.END:
            addEndListeners();
          break;
        case state.ADVER:
            addAdverListeners();
            break;
        default:
          break;
    }
}

function addMenuListeners(){
    console.log("adding menu listeners");
    document.activeElement.addEventListener('keydown', handleKeydownMenu);
}

function removeMenuListeners(){
    console.log("removing menu listeners");
    document.activeElement.removeEventListener('keydown', handleKeydownMenu);
}

function addGameListeners(){
    console.log("adding game listeners");
    document.activeElement.addEventListener('keydown', handleKeydownGame);
    document.activeElement.addEventListener('keyup', handleKeyupGame);
}

function removeGameListeners(){
    console.log("removing game listeners");
    document.activeElement.removeEventListener('keydown', handleKeydownGame);
    document.activeElement.removeEventListener('keyup', handleKeyupGame);
}

function addEndListeners(){
    console.log("adding end listeners");
    document.activeElement.addEventListener('keydown', handleKeydownEnd);
}

function removeEndListeners(){
    console.log("removing end listeners");
    document.activeElement.removeEventListener('keydown', handleKeydownEnd);
}

function addAdverListeners(){
    console.log("adding end listeners");
    document.activeElement.addEventListener('keydown', handleKeydownAdver);
}

function removeAdverListeners(){
    console.log("removing end listeners");
    document.activeElement.removeEventListener('keydown', handleKeydownAdver);
}
