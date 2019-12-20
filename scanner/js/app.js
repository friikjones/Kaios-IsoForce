// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function () {

  navigator.mozL10n.once(start);

  var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var canvasW = canvas.width;
  var canvasH = canvas.height;

  //starts here
  function start() {
    drawPattern();
    //clearScreen();

  }
  
  function drawPattern() {
    /* ctx.fillStyle = 'black';
    ctx.fillRect(10,10,canvasW-20, canvasH-20);
     */
    //div calculations    
    var divs = 100;
    var heigthDiv = canvasH/divs;
    var widthDiv = canvasW/divs;
    console.log("canvas: W."+canvasW+ " H."+canvasH);
    console.log("W.div: "+widthDiv);
    console.log("H.div: "+heigthDiv);
    
    for (let i = 0; i < divs; i++) {
      for (let j = 0; j < divs; j++) {
        ctx.fillStyle = 'rgb('+
        Math.floor(i*255/divs)+',0,'+
        Math.floor(255-(j*255/divs))+')';
        //+1 tira a borda, sem o +1 fica o quadriculado de fundo
        ctx.fillRect(i*widthDiv, j*heigthDiv,widthDiv+1,heigthDiv+1);      
      }
    }
  }

  function clearScreen(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvasW,canvasH);
  }

});
