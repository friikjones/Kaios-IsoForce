var gameEndedFlag = false;
var gameBG = document.getElementById('gameBG');

//Foot vars
var foot = document.getElementById('foot');
var playerFrame02Normal = document.getElementById('playerFrame02Normal');
var playerFrame01Normal = document.getElementById('playerFrame01Normal');
var playerFrame02Flipped = document.getElementById('playerFrame02Flipped');
var playerFrame01Flipped = document.getElementById('playerFrame01Flipped');

var footPositionX = canvasW / 2;
var footSize = foot.width - 5;
var footPositionY = canvasH - 10 - footSize;
var footBorderX, footBorderY;
var footRadius = footSize / 2;
var footVelocity = 10;
var footMoveLeftFlag, footMoveRightFlag;
var footOutOfBoundsLeftFlag, footOutOfBoundsRightFlag;
var playerFootDiffX = 35;
var playerFootDiffY = 230;
var playerFootMoveFlag = false;
var playerFootMoveCounter = 0;


//Ball vars
var ball = document.getElementById('ball');
var ballPositionX = canvasW / 2;
var ballPositionY = -30;
var ballSize = ball.width - 5;
var ballRadius = ballSize / 2;
var ballBorderX, ballBorderY;
var ballVelocityY = 0;
var ballVelocityX = -10;
var ballGravity = 0.7;

//Manager vars
var gameEnded = false;
var changeToGame = false;
var playAgainFlag = false;
var currentScore = 0;
var highScore = 0;
var collisionEnded = true;



// =================== Game Functions ============================= 

function InputHandlingGame() {
    footPositionCalc();
    checkBallColision();
    ballPositionCalc();
    calculateFootDrawPoint();
    calculateBallDrawPoint();
}

//TODO; refactor all this crap
function UpdateScreenGame() {
    clearScreen();
    //draw BG
    ctx.drawImage(gameBG, 0, 0);
    //draw player
    drawPlayer();
    //draw ball
    drawBall();
    //draw Score
    // TODO: fix score and stuff font
    drawScore();

    if (gameEnded) {
        nextState = state.MENU;
        stateChangedFlag = true;
        console.log("KEY next state: " + nextState);
        resetGamePositions();
        updateInfo();
        gameEnded = false;    
    } else
        nextState = state.GAME;

}

// Functions
// =================================================================== 

function handleKeydownGame(e) {
  switch (e.key) {
      case 'ArrowRight':
        footMoveRightFlag = true;
        break;
      case '6':
        footMoveRightFlag = true;
        break;
      case 'ArrowLeft':
        footMoveLeftFlag = true;
        break;
      case '4':
        footMoveLeftFlag = true;
        break;
      default:
          //console.log(e);
          break;
  }
}

function handleKeyupGame(e) {
  switch (e.key) {
      case 'ArrowRight':
        footMoveRightFlag = false;
        break;
      case '6':
        footMoveRightFlag = false;
        break;
      case 'ArrowLeft':
        footMoveLeftFlag = false;
        break;
      case '4':
        footMoveLeftFlag = false;
        break;
      default:
          //console.log(e);
          break;
  }
}

function cleanGameFlags(){
    gameEndedFlag = false;
}

function resetGamePositions(){
  ballPositionX = canvasW / 2;
  ballPositionY = -30;
}


function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.textAlign = "center";
  ctx.strokeText(currentScore, canvasW -50, 50);
  ctx.fillText(currentScore, canvasW -50, 50);
}

function drawBall() {
  ctx.drawImage(ball, ballBorderX, ballBorderY);
}

// function drawFoot() {
//   ctx.drawImage(foot, footBorderX, footBorderY);
// }

function drawPlayer() {
  if(!collisionEnded)
    playerFootMoveFlag = true;

  if(playerFootMoveFlag)
    playerFootMoveCounter++;

  if(playerFootMoveCounter > 10){
    playerFootMoveFlag = false;
    playerFootMoveCounter = 0;
  }

  if(ballPositionX > canvasW/2){
    //ball to the right
    if(playerFootMoveFlag)
      ctx.drawImage(playerFrame01Normal, footBorderX-playerFootDiffX, footBorderY-playerFootDiffY);
    else
      ctx.drawImage(playerFrame02Normal, footBorderX-playerFootDiffX, footBorderY-playerFootDiffY);
  }else{
    //ball to the left
    if(playerFootMoveFlag)
      ctx.drawImage(playerFrame01Flipped, footBorderX+playerFootDiffX, footBorderY-playerFootDiffY);
    else
      ctx.drawImage(playerFrame02Flipped, footBorderX+playerFootDiffX, footBorderY-playerFootDiffY);
  }
  // ctx.drawImage(foot, footBorderX, footBorderY);
}

function calculateFootDrawPoint() {
  footBorderX = footPositionX - footRadius;
  footBorderY = footPositionY + footRadius;
}

function calculateBallDrawPoint() {
  ballBorderX = ballPositionX - ballRadius;
  ballBorderY = ballPositionY + ballRadius;
}

function ballPositionCalc() {
  ballVelocityY = ballVelocityY + ballGravity;
  ballPositionY = ballPositionY + ballVelocityY;
  ballPositionX = ballPositionX + ballVelocityX;
}

function checkFootOutOfBounds(){
  if((footPositionX-footRadius) <= 0){
    footOutOfBoundsLeftFlag = true;
  }else{
    footOutOfBoundsLeftFlag = false;
  }
  //console.log("left: "+(footPositionX-footRadius));
  if((footPositionX+footRadius) >= canvasW){
    footOutOfBoundsRightFlag = true;
  }else{
    footOutOfBoundsRightFlag = false;
  }
  //console.log("right: "+(footPositionX-footRadius)+" canvas: "+canvasW);
}

function footPositionCalc() {
  checkFootOutOfBounds();
  if (footMoveRightFlag && !footOutOfBoundsRightFlag)
    footPositionX = footPositionX + footVelocity;
  if (footMoveLeftFlag && !footOutOfBoundsLeftFlag)
    footPositionX = footPositionX - footVelocity;
}

function checkBallColision() {
  var radiusSum = ballRadius + footRadius;
  var difX = ballPositionX - footPositionX;
  var difY = ballPositionY - footPositionY;
  var distBallFoot = Math.sqrt(Math.pow(difX, 2) + Math.pow(difY, 2));
  //check lateral position
  if ((ballPositionX - ballRadius) <= 0 || (ballPositionX + ballRadius) >= canvasW) {
    ballVelocityX = -ballVelocityX;
  }
  //check game ended
  if ((ballPositionY - ballRadius) >= canvasH) {
    gameEnded = true;
  }
  if (distBallFoot <= radiusSum) {
    //collision event
    if (collisionEnded)
      currentScore++;
    ballVelocityY = -15;
    ballVelocityX = (Math.random() * 20) - 10;
    collisionEnded = false;
  }
  if (distBallFoot >= radiusSum + 10) {
    collisionEnded = true;
  }
}

function updateInfo() {
  if(localStorage.highScore > highScore){
    highScore = localStorage.highScore;
  }else{
    localStorage.highScore = highScore;
  }
  if (currentScore > highScore) {
    highScore = currentScore;
  }
  currentScore = 0;
}