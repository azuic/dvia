<<<<<<< HEAD
function setup() {
  // set the width & height of the sketch
  createCanvas(400, 130)

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background('white')

  // set up typography & drawing-color
  textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  textSize(42) // make it big
  fill(100, 50, 50)

  // draw the time string to the canvas
  text(now.text.date, 30, 50)
  text(now.text.time, 30, 100)

}
=======


var NUMSINES = 6; // how many of these things can we do at once?
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i; // a counter variable

// play with these to get a sense of what's going on:
var fund = 0.005; // the speed of the central sine
var ratio = 1; // what multiplier for speed is each additional sine?
var alpha = 50; // how opaque is the tracing system

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

  background(204); // clear screen if showing geometry
  if (now.am) stroke(232, 48,21); // red if am
  if (now.pm) stroke(17,50,133); // blue if pm

  noFill(); // don't fill


  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen

  for (var i = 0; i<sines.length; i++) {

    var radius = rad/(i*i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle

    ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge

    ellipse(0, 0, 0, 0); // draw a little circle

    pop(); // go down one level
    translate(0, radius); // move into position for next sine

 // update angle based on
    if (i==4) sines[i] = (TWO_PI * now.progress.sec)-HALF_PI;
    if (i==4) sines[i] = (TWO_PI * now.progress.min)-HALF_PI;
    if (i==3) sines[i] = (TWO_PI * now.progress.hour )-HALF_PI;
    if (i==2) sines[i] = (TWO_PI * now.progress.day)-HALF_PI;
    if (i==1) sines[i] = (TWO_PI * now.progress.month)-HALF_PI;
    if (i==0) sines[i] = (TWO_PI * now.progress.year)-HALF_PI;

  }

  pop(); // pop down final transformation

}
>>>>>>> 07e3d27472d8c3adbca08059e02a9e179e3f2022
