var runnableAdverFlag = false;
var event = new Event('adver');

function LoadAdver(){
    console.log('ADVER started loading');
    getKaiAd({
        publisher: 'ecdd6704-fd53-4e23-a424-dee48b333384',
        app: 'SoccerMaster',
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {
            console.log('ADVER finished loading and adding listener');
            // Ad is ready to be displayed
            // calling 'display' will display the ad
            document.addEventListener('adver', function DisplayAdver() {
                document.removeEventListener('adver', DisplayAdver)
                // calling 'display' will display the ad
                ad.call('display')
            }, false);
            runnableAdverFlag = true;
        }
    })
}

function RunAdver(){
    console.log('ADVER runnableAdverFlag: '+runnableAdverFlag);

    if(runnableAdverFlag){
        document.dispatchEvent('adver');
    }
}