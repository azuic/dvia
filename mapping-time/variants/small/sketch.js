var cx;
var cy;
var monthDiameter;
var minDiameter;
var radius;
function setup() {
  // set the width & height of the sketch
  createCanvas(500, 500);
  background(0,0);
  cx = width / 2;
  cy = height / 2;
  radius = min(width, height) / 2;
  monthDiameter = radius * 0.6;
  minDiameter = monthDiameter/3;
}

function draw() {
  // check the clock for the current time and unpack some of its fields generate a time-string
  background(0,0);
  var now = clock()
  var month = now.month;
  var hour = now.hours;
  // var minute = now.minutes;
  noStroke();
  for (var i=1; i <13; i++){
      fill('rgba(247,247,247,0.05)');
      ellipse(cx + cos(i*HALF_PI/3-HALF_PI) * monthDiameter, cy + sin(i*HALF_PI/3-HALF_PI) * monthDiameter, monthDiameter/3, monthDiameter/3);
  }
  // stroke('#f7f7f7');
  fill('#002c');
  ellipse(cx + cos(month*HALF_PI/3-HALF_PI) * monthDiameter, cy + sin(month*HALF_PI/3-HALF_PI) * monthDiameter, monthDiameter/3, monthDiameter/3);
  var mx = cx + cos(month*HALF_PI/3-HALF_PI) * monthDiameter;
  var my = cy + sin(month*HALF_PI/3-HALF_PI) * monthDiameter;

  for (var j=0; j <24; j++){
    // stroke('rgba(247,247,247,0.25)')

      // let angle = j*HALF_PI/12-HALF_PI,
      //     x0 = cx + cos(angle) * tickRadius,
      //     x1 = cx + cos(angle) * dotRadius,
      //     y0 = cy + sin(angle) * tickRadius,
      //     y1 = cy + sin(angle) * dotRadius
      // line(x0, y0, x1, y1)

      fill('rgba(247,247,247,0.25)');
      ellipse(mx + cos(j*HALF_PI/6-HALF_PI) *minDiameter/1.9, my + sin(j*HALF_PI/6-HALF_PI) * minDiameter/1.9, minDiameter/10,minDiameter/10);
  }
  fill('#002c');
  ellipse(mx + cos(hour*HALF_PI/6-HALF_PI) *minDiameter/1.9, my + sin(hour*HALF_PI/6-HALF_PI) * minDiameter/1.9, minDiameter/10,minDiameter/10);
  // fill('rgba(247,247,247)');
  // stroke('rgba(247,247,247)');
  // ellipse(cx + cos(HALF_PI/3) * monthDiameter, cy + sin(i*HALF_PI/3) * monthDiameter, 0.1*radius, 0.1*radius);
  // for (var i=1; i <13; i++){
  //   if (month != i){
  //     fill('rgba(247,247,247)');
  //     ellipse(cx + cos(i*HALF_PI/3-HALF_PI) * monthDiameter, cy + sin(i*HALF_PI/3-HALF_PI) * monthDiameter, 0.2*radius, 0.2*radius);
  //   } else {
  //     noFill();
  //     ellipse(cx + cos(i*HALF_PI/3-HALF_PI) * monthDiameter, cy + sin(i*HALF_PI/3-HALF_PI) * monthDiameter, 0.2*radius, 0.2*radius);
  //     var mx = cx + cos(month*HALF_PI/3-HALF_PI) * monthDiameter;
  //     var my = cy + sin(month*HALF_PI/3-HALF_PI) * monthDiameter;
  //     for (var j=0; j <24; j++){
  //       if (hour != j){
  //         fill('rgba(247,247,247)');
  //         ellipse(mx + cos(j*HALF_PI/3-HALF_PI) * 0.2*radius, my + sin(j*HALF_PI/3-HALF_PI) * 0.2*radius, 0.05*radius, 0.05*radius);
  //       } else {
  //         noFill();
  //         ellipse(cx + cos(j*HALF_PI/3-HALF_PI) * 0.2*radius, cy + sin(j*HALF_PI/3-HALF_PI) * 0.2*radius, 0.05*radius, 0.05*radius);
  //       }
  //       // stroke('rgba(247,247,247,0.1)');
  //     }
  //   }
  //   // stroke('rgba(247,247,247,0.1)');
  // }


  // var monthAngle = [];
  // var monthList = [];
  // for (var i=0; i<12; i++){
  //   monthAngle.push((-HALF_PI+PI/6) + i*PI/6);
  //   monthList.push(i+1);
  // }
  //
  // var hourAngle = [];
  // var hourList = [];
  // for (var i=0; i<24; i++){
  //   hourAngle.push((-HALF_PI+PI/12) + i*PI/12);
  //   hourList.push(i);
  // }
  //
  // // month circles
  // for (var m = 1; m < 13; m++){
  //   var x = cx + cos(monthAngle[m-1]) * monthDiameter;
  //   var y = cy + sin(monthAngle[m-1]) * monthDiameter;
  //   if (m != month) {
  //     noFill();
  //     ellipse(x,y,100,100);
  //   } else {
  //     for (var h = 0; h < 24; h++){
  //       var sx = x + cos(hourAngle[h]) * 50;
  //       var sy = y + sin(hourAngle[h]) * 50;
  //       if ((h) != hour) {
  //         noFill();
  //       } else {
  //         fill(0);
  //       };
  //       strokeWeight(0.2)
  //       ellipse(sx,sy,8,8);
  //     };
  //
  //   };
  //
  // };
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
