<<<<<<< HEAD
function setup() {
  // set the width & height of the sketch
  createCanvas(400, 130)

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())
=======
var cx, cy;
var monthDiameter;


function setup() {
  // set the width & height of the sketch
  createCanvas(800, 800);
  background(204);
  cx = width / 2;
  cy = height / 2;
  var radius = min(width, height) / 2;
  monthDiameter = radius * 0.8;
>>>>>>> 07e3d27472d8c3adbca08059e02a9e179e3f2022

}

function draw() {
<<<<<<< HEAD
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

  //background(204);
  stroke(0, 255);
  //noFill(); // don't fill

  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()
  var month = now.month;
  var hour = now.hours;

  var monthAngle = [];
  var monthList = [];
  for (var i=0; i<12; i++){
    monthAngle.push((-HALF_PI+PI/6) + i*PI/6);
    monthList.push(i+1);
  }

  var hourAngle = [];
  var hourList = [];
  for (var i=0; i<24; i++){
    hourAngle.push((-HALF_PI+PI/12) + i*PI/12);
    hourList.push(i);
  }

  // month circles
  for (var m = 1; m < 13; m++){
    var x = cx + cos(monthAngle[m-1]) * monthDiameter;
    var y = cy + sin(monthAngle[m-1]) * monthDiameter;
    if (m != month) {
      noFill();
      ellipse(x,y,100,100);
    } else {
      for (var h = 0; h < 24; h++){
        var sx = x + cos(hourAngle[h]) * 50;
        var sy = y + sin(hourAngle[h]) * 50;
        if ((h) != hour) {
          noFill();
        } else {
          fill(0);
        };
        strokeWeight(0.2)
        ellipse(sx,sy,8,8);
      };

    };

  };
  // strokeWeight(2);
  // beginShape(POINTS);
  // for (var a = 0; a < 2*PI; a+=PI/6) {
  //   var angle = radians(a);
  //   var x = cx + cos(angle) * clockDiameter;
  //   var y = cy + sin(angle) * clockDiameter;
  //   vertex(x, y);
  // }
  // endShape();

}
>>>>>>> 07e3d27472d8c3adbca08059e02a9e179e3f2022
