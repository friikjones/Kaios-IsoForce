// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function () {

  navigator.mozL10n.once(start);

  //Game Canvas vars
  var canvas = document.getElementById('gameCanvas'),
    ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvasW = canvas.width;
  var canvasH = canvas.height;

  //Foot vars
  var foot = document.getElementById('foot');
  var footPositionX = canvasW / 2;
  var footSize = foot.width - 5;
  var footPositionY = canvasH - 10 - footSize;
  var footBorderX, footBorderY;
  var footRadius = footSize / 2;
  var footVelocity = 10;
  var footMoveLeftFlag, footMoveRightFlag;
  var footOutOfBoundsLeftFlag, footOutOfBoundsRightFlag;

  //Ball vars
  var ball = document.getElementById('ball');
  var ballPositionX = canvasW / 2;
  var ballPositionY = -30;
  var ballSize = ball.width - 5;
  var ballRadius = ballSize / 2;
  var ballBorderX, ballBorderY;
  var ballVelocityY = 0;
  var ballVelocityX = -10;
  var ballGravity = 1;

  //Manager vars
  var gameEnded = true;
  var changeToGame = false;
  var playAgainFlag = false;
  var currentScore = 0;
  var highScore = 0;
  var collisionEnded = true;

  //starts here
  function start() {
    document.activeElement.addEventListener('keydown', handleKeydown);
    document.activeElement.addEventListener('keyup', handleKeyup);
    setInterval(mainLoop, 30);

  }

  // =================== MAIN LOOP ============================= 

  function mainLoop() {

    if(changeToGame){
      changeToGame = false;
      gameEnded = false;
    }
    if(playAgainFlag){
      changeToGame = true;
      resetVariables();
      gameEnded = false;
    }

    if (gameEnded) {
      updateInfo();
      updateMenu();
    } else {
      updatePositions();
      updateScreen();
    }
    //consoleGameState();
  }

  // =================== GAME FUNCTIONS ============================= 


  //Update positions
  function updatePositions() {
    footPositionCalc();
    checkBallColision();
    ballPositionCalc();
    calculateFootDrawPoint();
    calculateBallDrawPoint();
  }

  function updateScreen() {
    //console.log("updating screen===================")
    clearScreen();
    drawScore();
    drawFoot();
    drawBall();
  }


  //Key handlers
  function handleKeydown(e) {
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
      case 'Enter':
        if(gameEnded)
          playAgainFlag = true;
        break;
      case '5':
        if(gameEnded)
          playAgainFlag = true;
        break;
      case '0':
        localStorage.highScore = 0;
        highScore = 0;
      default:
        console.log(e);
        break;
    }
  }
  function handleKeyup(e) {
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
      case 'Enter':
        playAgainFlag = false;
        break;
      case '5':
        playAgainFlag = false;
        break;
      default:
        console.log(e);
        break;
    }
  }

  function initializeItems() {
    resetVariables();
    clearScreen();
    drawScore();
    drawFoot();
    drawBall();
  }

  function resetVariables() {
    footPositionX = canvasW / 2;
    footPositionY = canvasH - 10 - footSize;
    footMoveLeftFlag = false;
    footMoveRightFlag = false;
    gameEnded = false;
    currentScore = 0;
    
    ballVelocityY = 0;
    ballPositionX = canvasW / 2;
    ballPositionY = -30;
    
    if (Math.random() * 2 > 1) {
      ballVelocityX = -10;
    } else {
      ballVelocityX = 10;
    }
  }

  function clearScreen() {
    ctx.drawImage(bg, 0, 0);
  }

  function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(currentScore, canvasW / 2, 50);
  }

  function drawBall() {
    ctx.drawImage(ball, ballBorderX, ballBorderY);
  }

  function drawFoot() {
    ctx.drawImage(foot, footBorderX, footBorderY);
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
    console.log("left: "+(footPositionX-footRadius));
    if((footPositionX+footRadius) >= canvasW){
      footOutOfBoundsRightFlag = true;
    }else{
      footOutOfBoundsRightFlag = false;
    }
    console.log("right: "+(footPositionX-footRadius)+" canvas: "+canvasW);
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


  // =================== MENU FUNCTIONS ============================= 

  function updateMenu() {
    drawMenu();
  }

  function drawMenu() {
    //Menu BG

    /* ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = 'white';
    ctx.fillRect(5, 5, canvasW - 10, canvasH - 10);*/
    ctx.drawImage(menubg, 0, 0);


    //Highscore text
    ctx.font = "60px Arial";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(highScore, (canvasW/2), 50);
    ctx.strokeText(highScore, (canvasW/2), 50);

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

  function consoleGameState() {
    console.log("Game ended: "+gameEnded);
    console.log("Play again: "+playAgainFlag);
  }

});

