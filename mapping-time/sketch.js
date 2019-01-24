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
  createCanvas(400, 400);

  rad = height/4; // compute radius for central circle
  // background('#f7f7f7'); // clear the screen
  var now = clock();
  if (now.am) background('rgb(232, 48,21)'); // red if am
  if (now.pm) background('rgb(17,50,133)'); // blue if pm
  fill('rgba(247,247,247, 0.5)');
  switch (now.season) {
    case 1:
      arc(width/2, height/2, rad*2, rad*2, HALF_PI*3, 0);
      break;
    case 2:
      arc(width/2, height/2, rad*2, rad*2, 0, HALF_PI);
      break;
    case 3:
      arc(width/2, height/2, rad*2, rad*2, HALF_PI, PI);
      break;
    case 4:
      arc(width/2, height/2, rad*2, rad*2, PI, HALF_PI*3);
      break;
    default:
      break;
  }
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
      noFill();
      break;
  }
  noFill();
}

function draw() {

  var now = clock();

  // background(204); // keep traces
  stroke('rgba(247,247,247,0.1)');




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
        noFill();
        break;
    }

  }

  pop(); // pop down final transformation

}
