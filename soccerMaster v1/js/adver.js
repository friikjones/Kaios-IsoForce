var adverCounter = 0;
var loadAdverFlag = true;
var exitAdverFlag = false;

function DisplayAdver(){
    if(loadAdverFlag){
        console.log('ADVERT started loading');
        getKaiAd({
            publisher: 'ecdd6704-fd53-4e23-a424-dee48b333384',
            app: 'SoccerMaster',
            onerror: err => console.error('Custom catch:', err),
            onready: ad => {
                // Ad is ready to be displayed
                // calling 'display' will display the ad
                ad.call('display');

		        // user closed the ad (currently only with fullscreen)
		        ad.on('close', () => exitAdverFlag = true )
            }
        })
        loadAdverFlag = false;
    }else{
        console.log('ADVERT adverCounter: '+adverCounter);
        adverCounter++;
        if(adverCounter > 300){
            adverCounter = true;
        }
    }
}

function UpdateAdverScreen(){
    if (exitAdverFlag) {
        nextState = state.MENU;
        stateChangedFlag = true;
        console.log("KEY next state: " + nextState);
        resetGamePositions();
        updateInfo();
        exitAdverFlag = false;    
    } else
        nextState = state.ADVER;
}

function handleKeydownAdver(e) {
    switch (e.key) {
        case 'Enter':
          exitAdverFlag = true;
          break;
        case '5':
          exitAdverFlag = true;
          break;
        default:
            //console.log(e);
            break;
    }
  }
  