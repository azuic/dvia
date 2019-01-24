var NUMSINES = 6; // how many of these things can we do at once?
var sines = new Array(NUMSINES); // an array to hold all the current angles
var rad; // an initial radius value for the central sine
var i; // a counter variable

// play with these to get a sense of what's going on:
var fund = 0.005; // the speed of the central sine
var ratio = 1; // what multiplier for speed is each additional sine?
var alpha = 50; // how opaque is the tracing system

var trace = true; // are we tracing?


function setup() {
  createCanvas(400, 400);
  // background('#f7f7f7');
  rad = height/4; // compute radius for central circle
  // clear the screen
  noStroke();
  var now = clock();
  for (var i = 0; i<sines.length; i++) {
    // sines[i] = PI; // start EVERYBODY facing NORTH
    switch (i) {
      case 0:
        sines[i] = (TWO_PI * now.progress.month)-HALF_PI;
        break;
      case 1:
        sines[i] = (TWO_PI * now.progress.week)-HALF_PI;
        break;
      case 2:
        sines[i] = (TWO_PI * now.progress.day)-HALF_PI;
        break;
      case 3:
        sines[i] = (TWO_PI * now.progress.hour)-HALF_PI;
        break;
      case 4:
        sines[i] = (TWO_PI * now.progress.min)-HALF_PI;
        break;
      case 5:
        sines[i] = (TWO_PI * now.progress.sec)-HALF_PI;
        break;
      default:
        sines[i] = PI;
        break;
    }
  }
  switch (now.season) {
    case 1:
      background(233,164,170);
      break;
    case 2:
      background(116,154,67);
      break;
    case 3:
      background(238,156,43);
      break;
    case 4:
      background(181,226,229);
      break;
    default:
      background('#f7f7f7');
      break;
  }
  fill('white');
  if (now.am) arc(width/2, height/2, rad*2, rad*2, HALF_PI*3, HALF_PI); // red if am
  if (now.pm) arc(width/2, height/2, rad*2, rad*2, HALF_PI, HALF_PI*3);
  noFill();

}

function draw() {
// background('#f7f7f7');
  var now = clock();
  var sec

// blue if pm
  noFill();
  if (now.am) {
    arc(width/2, height/2, rad*2, rad*2, HALF_PI*3, HALF_PI);
    stroke('rgba(232,48,21,0.1)');
  } // red if am
  if (now.pm) {
    arc(width/2, height/2, rad*2, rad*2, HALF_PI, HALF_PI*3);
    stroke('rgba(17,50,133,0.1)');
  }
  // MAIN ACTION
  push(); // start a transformation matrix
  translate(width/2, height/2); // move to middle of screen
  // fill(0, 20);
  for (var i = 0; i<sines.length; i++) {

    var radius = rad/(i*i+1); // radius for circle itself
    rotate(sines[i]); // rotate circle

    ellipse(0, 0, radius*2, radius*2); // if we're simulating, draw the sine
    push(); // go up one level
    translate(0, radius); // move to sine edge
    pop(); // go down one level
    translate(0, radius); // move into position for next sine

 // update angle based on
    switch (i) {
      case 0:
        sines[i] = (TWO_PI * now.progress.month)-HALF_PI;
        break;
      case 1:
        sines[i] = (TWO_PI * now.progress.week)-HALF_PI;
        break;
      case 2:
        sines[i] = (TWO_PI * now.progress.day)-HALF_PI;
        break;
      case 3:
        sines[i] = (TWO_PI * now.progress.hour)-HALF_PI;
        break;
      case 4:
        sines[i] = (TWO_PI * now.progress.min)-HALF_PI;
        break;
      case 5:
        sines[i] = (TWO_PI * now.progress.sec)-HALF_PI;
        break;
      default:
        sines[i] = PI;
        break;
    }

  }

  pop(); // pop down final transformation

}
