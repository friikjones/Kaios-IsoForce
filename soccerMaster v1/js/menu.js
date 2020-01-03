var menuBG = document.getElementById('menuBG');
var startGameFlag = false;
var flickerText = "Press OK / 5 to start!";
var flickerHighscoreText = "New Highscore!";
var highscoreText = "Highscore: ";
var flickerFlag = true;
var counter = 0;

// =================== Menu Functions ============================= 

function InputHandlingMenu() {
    // Check Landing Inputs
    // Change Landing Variables
    // Perform logic steps

    // console.log("InputHandlingMenu check");
}

function UpdateScreenMenu() {
    clearScreen();
    // draw BG
    ctx.drawImage(menuBG, 0, 0);
    // draw highscore
    // TODO: font fix
    drawFlickerScore();
    drawHighscore();
    // draw flickering text
    // TODO: font fix
    drawFlickerText();

    if (startGameFlag) {
        nextState = state.INTER;
        stateChangedFlag = true;
        console.log("KEY next state: " + nextState);
        cleanMenuFlags();
    } else
        nextState = state.MENU;

    // console.log("UpdateScreenMenu check");    
}

// Functions
// =================================================================== 

function handleKeydownMenu(e) {
    switch (e.key) {
        case 'Enter':
            startGameFlag = true;
            newHighScoreFlag = false;
            break;
        case '5':
            startGameFlag = true;
            newHighScoreFlag = false;
            break;
        case '0':
            localStorage.highScore = 0;
            highScore = 0;
            break;
        default:
            //console.log(e);
            break;
    }
}

function cleanMenuFlags() {
    startGameFlag = false;
}

function drawFlickerScore() {
    if(newHighScoreFlag){
        if(flickerFlag){
            ctx.font = "15px Arial";
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.textAlign = "center";
            ctx.strokeText(flickerHighscoreText, canvasW -50, 50);
            ctx.fillText(flickerHighscoreText, canvasW -50, 50);
        }
    }else{
        ctx.font = "15px Arial";
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.textAlign = "center";
            ctx.strokeText(highscoreText, canvasW -50, 50);
            ctx.fillText(highscoreText, canvasW -50, 50);
    }
    
}

function drawHighscore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.strokeText(highScore, canvasW -50, 75);
    ctx.fillText(highScore, canvasW -50, 75);
}

function drawFlickerText() {
    if(flickerFlag){
        ctx.font = "20px Arial";
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.textAlign = "center";
        ctx.strokeText(flickerText, canvasW / 2, canvasH - 50);
        ctx.fillText(flickerText, canvasW / 2, canvasH - 50);
    }
    console.log("counter: "+counter);
    counter++;

    if(counter > 15){
        counter = 0;
        flickerFlag = !flickerFlag;
    }
    
}