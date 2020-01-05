// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded

window.addEventListener('DOMContentLoaded', function () {

  navigator.mozL10n.once(start);

  //starts here
  function start() {
    addMenuListeners();
    console.log("HERE");
    setInterval(mainLoop, 30);
  }

  // =================== MAIN LOOP ============================= 

  function mainLoop() {

    switch(currentState){
      case state.MENU:
        InputHandlingMenu();
        UpdateScreenMenu();
        break;
      case state.INTER:
        UpdateScreenInter();
        break;
      case state.GAME:
        InputHandlingGame();
        UpdateScreenGame();
        break;
      case state.ADVER:
        DisplayAdver();
        UpdateAdverScreen();
        break;
      default:
        //exception handling
        nextState = state.MENU;
        break;
    }

    if(stateChangedFlag){
      updateListeners();
      resetVariables();
      stateChangedFlag = false;
    }
    
    consoleState();
    currentState = nextState;
    
  }

  
  


});

