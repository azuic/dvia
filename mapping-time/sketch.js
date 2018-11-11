

var NUMSINES = 6; // how many of these things can we do at once?
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i; // a counter variable

// play with these to get a sense of what's going on:
var fund = 0.005; // the speed of the central sine
var ratio = 1; // what multiplier for speed is each additional sine?
var alpha = 10; // how opaque is the tracing system

var trace = false; // are we tracing?

function setup() {
  createCanvas(710, 400);

  rad = height/4; // compute radius for central circle
  background(204); // clear the screen

  for (var i = 0; i<sines.length; i++) {
    sines[i] = PI; // start EVERYBODY facing NORTH
  }
}

function draw() {

  var now = clock();

  // background(204); // keep traces
  
  if (now.am) stroke(232, 48,21); // red if am
  if (now.pm) stroke(17,50,133); // blue if pm
  noFill(); // don't fill

  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen

  for (var i = 0; i<sines.length; i++) {

    var erad = 0; // radius for small "point" within circle... this is the 'pen' when tracing
    // setup for tracing


    // stroke(10, alpha); //
    // fill(10, alpha); //


    var radius = rad/(i*i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle

    ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge

    ellipse(0, 0, 0, 0); // draw a little circle

    pop(); // go down one level
    translate(0, radius); // move into position for next sine

 // update angle based on
    if (i==5) sines[i] = (TWO_PI * now.progress.sec)-HALF_PI;
    if (i==4) sines[i] = (TWO_PI * now.progress.min)-HALF_PI;
    if (i==3) sines[i] = (TWO_PI * now.progress.hour)-HALF_PI;
    if (i==2) sines[i] = (TWO_PI * now.progress.day)-HALF_PI;
    if (i==1) sines[i] = (TWO_PI * now.progress.month)-HALF_PI;
    if (i==0) sines[i] = (TWO_PI * now.progress.year)-HALF_PI;

  }

  pop(); // pop down final transformation

}
