//Visual Random script
//by Zoe Kniskern
//IGME 790

'use strict'

//globals
var canvas;
var ctx;
var w;
var h;
var color = 'gray';

window.onload = init();

function init(){
    canvas = document.getElementById('maincan');
    ctx = canvas.getContext('2d');

    //make canvas resizable
    window.addEventListener('resize', resizeWin, false);

    resizeWin();

    //start animation loop
    update();
}//end of init

function update(){
    //recursive updating
    requestAnimationFrame(update);

    draw();
}

function draw(){

    //draw background or don't depending on effect;

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    var col = "rgb(" + r + ", " + g + ", " + b + ")";
    var col1 = randColor();

    console.log(col1);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 150, 150);

    ctx.fillStyle = col1;
    ctx.fillRect(randPosition(w), randPosition(h), 70, 70);
    console.log(ctx.fillStyle);
}

//resize helper function
//based on updateForResize by Steven Yi
function resizeWin(){
    w = window.innerWidth;
    h = window.innerHeight;

    console.log(canvas.width);
    console.log(canvas.height);

    ctx.clearRect(0,0, w, h);

    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = color;
    ctx.fillRect(0,0, w, h);

    draw();
}

function randColor(){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random();

    var col= "rgba(" + r + "," + g + "," + b + "," + a + ")";
    return col;
}

function randPosition(d){
    let p = Math.random() * d;

    return p;
}