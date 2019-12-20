var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var canvasW = canvas.width;
var canvasH = canvas.height;

function drawStuff() {
    // do your drawing stuff here
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
}