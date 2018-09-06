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
var starsArray = [];
var numStars;
var testStar;
var testLight;

window.onload = init();

function init(){
    canvas = document.getElementById('maincan');
    ctx = canvas.getContext('2d');

    //make canvas resizable
    window.addEventListener('resize', resizeWin, false);
    //window.addEventListener('mouseMove', getMousePos);
    //window.setInterval()

    resizeWin();

    numStars = 150;
    starsArray = makeStars(numStars, starsArray);

    let x = randNum(w);
    let y = randNum(h);
    let d = randNum(5);
    let colar = randColor();
    testStar = new Star(x,y,d, colar);

    testLight = new Lighting(randBetween(0,w),randBetween(-30,0));

    //start animation loop
    update();
}//end of init

function update(){
    //recursive updating
    requestAnimationFrame(update);

    moveStars(starsArray);
    testStar.moveStar();
   
    //draw background or don't depending on effect;
    ctx.fillStyle = randBlue();
    ctx.fillRect(0,0, w, h);

    testLight.strike(10);

    drawStars(starsArray);
    testStar.drawStar();

    testLight.strike(10);

    //drawLines(starsArray);
}

function draw(){

    //Tests to ensure update is working
    /*
    var col1 = randColor();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 150, 150);
    ctx.fillStyle = col1;
    ctx.fillRect(randNum(w), randNum(h), 70, 70);
    console.log(ctx.fillStyle);
    */

}

/////////////EXPERIMENTAL FUNCTIONS/////////////
function drawLines(array){

    for(var i=0; i<numStars; i++){
        //finding distance using pythagorean theorem
        //https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
        let a = mouse.x - array[i].posx;
        let b = mouse.y - array[i].posy;

        let c = Math.sqrt (a*a + b*b);
        if(c < 30){
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(array[i].posx, array[i].posy);
            ctx.stroke();
            ctx.closePath;
        }
    }
}


/////////////STAR ARRAY BATCH OPERATIONS/////////////

//allStars()
//create all stars
function makeStars(numStars, array){

    for(var i=0; i<numStars; i++){
        let x = randNum(w);
        let y = randNum(h);
        let d = randNum(5);
        let color = randColor()
        var newStar = new Star(x,y,d, color);
        array[i] = newStar;
    }

    return array;
    console.log(array);
}

//moveStars()
//moves all stars
function moveStars(array){
    for(var i=0; i<numStars; i++){
        array[i].moveStar();
    }
}

function drawStars(array){
    for(var i=0; i<numStars; i++){
        array[i].drawStar();
    }
}

//makeStar()
//create star object and related functions
function Star (x,y,d, col)  {
    this.posx = x;
    this.posy = y;
    this.drop = d;
    this.radius = randNum(Math.floor(randNum(7)));
    this.drawStar = function(){
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, this.radius, 0, 2*Math.PI, false);
        ctx.closePath;
        ctx.fill();
    };
    this.moveStar = function(){
        this.posy += this.drop;
        if(this.posy > canvas.height){
            //console.log("left the screen");
            this.posx = randNum(w);
            this.posy = 0;
        }
    };
};

function Lighting(x,y) {
    this.startX = x;
    this.startY = y;
    this.moveX;
    this.moveY;
    this.pX;
    this.pY;
    this.strike = function(l){
        this.pX = this.startX;
        this.pY = this.startY; 
        ctx.beginPath(); 
        for(var i=0; i<l; i++){
            this.moveX = randBetween(-45,45);
            this.moveY = randBetween(90,7);
            ctx.lineWidth = randBetween(1,7);
            ctx.strokeStyle = 'rgba(255,255,255,.1)';
           
            ctx.moveTo(this.pX,this.pY);
            ctx.lineTo(this.pX + this.moveX, this.pY + this.moveY);
            
            this.pX = this.pX + this.moveX;
            this.pY = this.pY + this.moveY;
            //console.log("starting x: " + this.pX);
            //console.log("starting y: " + this.pY);
        }
        ctx.stroke();
    };
}


/////////////HELPER FUNCTIONS/////////////

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

//random color helper function
function randColor(){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random();

    var col= "rgba(" + r + "," + g + "," + b + "," + a + ")";
    return col;
}

//random  blue color creator
function randBlue(){
    let r = Math.floor(Math.random() * 10);
    let g = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 30);
    let a = .2;

    var col= "rgba(" + r + "," + g + "," + b + "," + a + ")";
    return col;
}

//finds a random position inside a given value
function randNum(d){
    let p = Math.random() * d;

    return p;
}

//find random number between two values
//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randBetween(max, min){
    var n = Math.floor(Math.random() * (max - min + 1)) + min;

    return n;
}

//get mouse position
//https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
//https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
//https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
function getMousePos(event){
    var mousePos = {};
    mousePos.x = event.clientX - (canvas.offsetLeft - window.pageXOffset);
    mousePos.y = event.clientY - (canvas.offsetTop - window.pageYOffset);
    return mousePos;
}