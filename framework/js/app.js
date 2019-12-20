// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded

window.addEventListener('DOMContentLoaded', function () {

  navigator.mozL10n.once(start);

  //Main Canvas vars
  var canvas = document.getElementById('mainCanvas'),
    ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //canvasW and canvasH are references to size of the screen
  var canvasW = canvas.width;
  var canvasH = canvas.height;

  //Game State Manager vars
  const state = {
    LANDING: 'landing',
    MENU: 'menu',
    LOOP: 'loop',
    END: 'end'
    //Any other state should be added here
  }
  var currentState = state.LANDING;
  var nextState = state.LANDING;

  //starts here
  function start() {
    setInterval(mainLoop, 30);
  }

  // =================== MAIN LOOP ============================= 

  function mainLoop() {

    switch(currentState){
      case state.LANDING:
        InputHandlingLanding()
        UpdateScreenLanding()
        break;
      case state.MENU:
        // InputHandlingMenu()
        // UpdateScreenLanding()
        break;
      case state.LOOP:
        // InputHandlingLoop()
        // UpdateScreenLoop()
        break;
      case state.END:
        // InputHandlingEnd()
        // UpdateScreenEnd()
        break;
    }
    
  }

  // =================== Core Functions ============================= 

  function clearScreen() {
    ctx.drawImage(bg, 0, 0);
  }

  // =================== Landing Functions (Sample)============================= 

  //Update positions
  function InputHandlingLanding() {
    // Check Landing Inputs
    // Change Landing Variables
    // Perform logic steps
    
  }

  function UpdateScreenLanding() {
    clearScreen();
    // Draw Landing Objects
    currentState = nextState
    // Update Local Storage
  }

  // =================================================================== 

});

