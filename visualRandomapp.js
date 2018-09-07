//Visual Random script
//by Zoe Kniskern
//IGME 790

//Project: Falling Stars That Became Rain
//
//Initially I was building a star field and was interested in simulating parallax movement but ended up liking the consistency of mainly vertical movement.
//I built the individual class for Star and then created functions to handle batch operations of their movement and drawing
//
//MAPPING RANDOM
//Used in both Lightning and Star as their positions and movement directions are based on randomly generated numbers.
//INTERROGATE RANDOM
//Used to decide if the raindrop is squiggly or straight falling
//RANDOM SELECTION
//Used when selecting the color of the raindrops
//WEIGHTED RANDOM
//Used when generating blues in the randBlue() function
//RANDOM WALK
//Used to create the lightning strikes

'use strict'

//globals
var canvas;
var ctx;
var w;
var h;
var color = 'gray';
var starsArray = [];
var numStars;
var testLight;

window.onload = init();

function init(){
    canvas = document.getElementById('maincan');
    ctx = canvas.getContext('2d');

    //make canvas resizable
    window.addEventListener('resize', resizeWin, false);

    //draw initial background
    resizeWin();

    //set number of stars elements
    numStars = 150;
    //make the stars
    starsArray = makeStars(numStars, starsArray);

    //create lightning object
    testLight = new Lighting(randBetween(0,w),randBetween(-30,0));

    //start animation loop
    update();
}//end of init

function update(){
    //recursive updating
    requestAnimationFrame(update);

    //move stars on update
    moveStars(starsArray);
   
    //draw background
    ctx.fillStyle = randBlue();
    ctx.fillRect(0,0, w, h);

    //draw stars
    drawStars(starsArray);

    //set interval of strike
    setInterval(testLight.strike(10), 30000);

}


/////////////STAR ARRAY BATCH OPERATIONS/////////////

//allStars()
//create all stars
function makeStars(numStars, array){

    let colors = ['173,216,230', '0,191,255', '70,130,180', '0,0,128' ];

    for(var i=0; i<numStars; i++){
        let x = randNum(w);
        let y = randNum(h);
        let d = randBetween(.5,6);
        let color = colors[Math.floor(Math.random()*colors.length)]; //RANDOM SELECTION
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

//////////////////Object Classes/////////////////

//create star object and related functions
function Star (x,y,d, col)  {
    this.posx = x;
    this.posy = y;
    this.drop = d;
    this.a = Math.random();
    this.slant;
    this.radius = randNum(Math.floor(randNum(7)));
    this.drawStar = function(){ //MAPPING RANDOM
        ctx.fillStyle = 'rgba(' + col + ',' + this.a + ')';
        ctx.beginPath();
        ctx.arc(this.posx, this.posy, this.radius, 0, 2*Math.PI, false);
        ctx.closePath;
        ctx.fill();
    };
    this.moveStar = function(){
        this.posy += this.drop;
        if(this.drop > 3){ //INTERROGATE RANDOM
            this.slant = randBetween(-5,5);
            this.posx += this.slant;
        }
        if(this.posy > canvas.height){
            //console.log("left the screen");
            this.posx = randNum(w);
            this.posy = 0;
        }
    };
};

function Lighting(x,y) {
    //this.startX = x;
    //this.startY = y;
    this.moveX;
    this.moveY;
    this.pX;
    this.pY;
    this.strike = function(l){
        //console.log("strike ran");
        this.pX = randBetween(0,w); //this.startX;
        this.pY = randBetween(-30,0); //this.startY; 
        ctx.beginPath(); 
        for(var i=0; i<l; i++){
            this.moveX = randBetween(-45,45);
            this.moveY = randBetween(90,7);
            ctx.lineWidth = randBetween(1,7);
            ctx.strokeStyle = 'rgba(255,255,255,.1)';
           
            ctx.moveTo(this.pX,this.pY);
            ctx.lineTo(this.pX + this.moveX, this.pY + this.moveY); //RANDOM WALK
            
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
}

//random color helper function
function randColor(){ //WEIGHTED RANDOM
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random();

    var col= "rgba(" + r + "," + g + "," + b + "," + a + ")";
    return col;
}

//random blue color creator
function randBlue(){
    let r = Math.floor(Math.random() * 10);
    let g = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 30);
    let a = .2;

    var col= "rgba(" + r + "," + g + "," + b + "," + a + ")";
    return col;
}

//finds a random num below a given value
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