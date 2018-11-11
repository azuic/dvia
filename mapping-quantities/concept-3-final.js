var total;
var wardata;
var statedata;

function preload(){
  total = loadJSON('data/totals.json');
  wardata = loadJSON('data/wardataconvert.json');
  statedata = loadJSON('data/statewardata.json');
}

function setup(){
  createCanvas(4750, 2250);
  background('#e0e0d9');

  // pick one of the three data files to work with and call it 'data'
  var data = total;

  // create a divergent palette where we'll use negative values for underground tests
  // and positive values for atmospheric (the -60 .. 80 range came from eyeballing the data)
  // var palette = Brewer.divergent('RdBu', Infinity, -60, 0, 80)
  var palette = Brewer.sequential('Oranges', Infinity, 0, 178);
  // set up typography
  textFont("Chakra Petch");
  textSize(16);
  fill('#62592C');
  noStroke();

  var x = 250;
  var y = 500;
  var rowHeight = 52;
  var colWidth = 60;
  var radius = 50;
  // draw country name labels on the left edge of the table
  textStyle(BOLD);
  textAlign(RIGHT);
  for (var country in data.tests){
    text(country, x-colWidth, y);
    y -= rowHeight;
  }

  // line of the treaty and year axis line
  stroke(palette.colorForValue(0));
  strokeWeight(2);
  line(200,560,250+(2018-1945)*colWidth,560); // year axis
  strokeWeight(1.5);
  line(250+(1996-1945)*colWidth,80,250+(1996-1945)*colWidth,560); // treaty
  // mark of the treaty
  noStroke();
  textStyle(NORMAL);
  textAlign(LEFT);
  textSize(16);
  text('The Comprehensive Test Ban Treaty',250+(1996-1945)*colWidth+15,90);
  fill(palette.colorForValue(0));
  triangle(250+(1996-1945)*colWidth-1,95, 250+(1996-1945)*colWidth-1,75, 250+(1996-1945)*colWidth+15-1, 85);

  // draw each year's totals, one column at a time
  textStyle(NORMAL);
  textAlign(CENTER);
  for (var i=0; i<data.years.length; i++){
    y = 500;

    // step through all the countries' totals for the year, row by row
    for (var country in data.tests){
      // draw the atmospheric tests as an upper semicircle using the palette to set the color by value
      var value = data.tests[country][i];
      var color = palette.colorForValue(value);
      if (value != 0){
        noStroke();
        fill(color);
        ellipse(x, y, radius, radius);
      } else {
        stroke(color);
        strokeWeight(1);
        noFill();
        ellipse(x, y, radius-1, radius-1);
      }
      // shift downward before drawing the next country
      y -= rowHeight;
    }

    // at the bottom, draw a full circle with the total number of tests that year
    var totalTests = 0;
    // draw the year label in the header row
    var year = data.years[i];
    // draw the year labels
    for (var country in data.tests){
      totalTests += data.tests[country][i];
    }
    value = totalTests;
    color = palette.colorForValue(value);
    if (value != 0){
      noStroke();
      fill(color);
      ellipse(x, 560, radius, radius);
      fill('#e0e0d9');
      text(year, x, 567);
    } else {
      stroke(color);
      strokeWeight(1);
      fill('#e0e0d9');
      ellipse(x, 560, radius-1, radius-1);
      noStroke();
      fill(color);
      text(year, x, 567);
    }




    // shift leftward before drawing the next year
    x += colWidth;
  }

  fill('#62592C');
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(30);
  text('-WARS-&-NUCLEAR-TESTS-',50,60);
  textStyle(ITALIC);
  textSize(10);
  text('* Reference: Zeev Maoz, Paul L. Johnson, Jasper Kaplan, Fiona Ogunkoya, and Aaron Shreve 2019. The Dyadic Militarized Interstate Disputes (MIDs) Dataset Version 3.0: Logic, Characteristics, and Comparisons to Alternative Datasets, Journal of Conflict Resolution (forthcoming). ',50,85);

  var k=0;
  for (var state in statedata){
    // for each state
    var N;
    var nuclear = false;
    // row position for each state
    switch (state) {
      case "United States":
        N=0;
        nuclear=true;
        break;
      case "Russia":
        N=1;
        nuclear=true;
        break;
      case "United Kingdom":
        N=2;
        nuclear=true;
        break;
      case "France":
        N=3;
        nuclear=true;
        break;
      case "China":
        N=4;
        nuclear=true;
        break;
      case "India":
        N=5;
        nuclear=true;
        break;
      case "Pakistan":
        N=6;
        nuclear=true;
        break;
      case "North Korea":
        N=7;
        nuclear=true;
        break;
      default:
        N=10;
        nuclear=false;
    }
    // // for the 8 nuclear power states
    // if (nuclear){
    //   // y-coord for the center
    //   var coordY = 500-rowHeight*N;
    // } else {
    //   var startX2 = 250+(start-1945)*colWidth;
    //   var endX2 = 250+(end-1945)*colWidth;
    //   var coordY2 = 620+k*20;
    //   fill('#62592C');
    //   // start of the war
    //   noStroke();
    //   ellipse(startX2, coordY2, 3, 3);
    //   textStyle(NORMAL);
    //   textSize(8);
    //   textAlign(RIGHT);
    //   text(state, startX2,coordY2-8);
    //   // end of the war
    //   noStroke();
    //   ellipse(endX2, coordY2, 3, 3);
    //   textAlign(LEFT);
    //   text(statedata[state].WarName, endX2,coordY2-8);
    //   // length of the war
    //   strokeWeight(1.5);
    //   stroke('#62592C');
    //   line(250+(start-1945)*colWidth, coordY2, 250+(end-1945)*colWidth, coordY2);
    //   k++;
    // }

    var nWars = statedata[state].length;
    var gap = 50/(nWars+1);

    for (var i=0; i<nWars; i++){
      // start and end year
      var start = statedata[state][i].StartYear;
      var end = statedata[state][i].EndYear;
      // start and end x-coord
      var startX = 250+(start-1945)*colWidth;
      var endX = 250+(end-1945)*colWidth;
      // for the 8 nuclear power states
      if (nuclear){
        // y-coord for the center
        var coordY = 500-rowHeight*N;
        var yPos = coordY-radius/2+(i+1)*gap;
        fill('#62592C');
        noStroke();
        // start of the war
        ellipse(startX, yPos, 2.5, 2.5);
        // end of the war
        ellipse(endX, yPos, 2.5, 2.5);
        textSize(8);
        textAlign(LEFT);
        textStyle(BOLD);
        text(statedata[state][i].WarName, endX+5,yPos+3);
        // length of the war
        strokeWeight(1.5);
        stroke('#62592C');
        line(250+(start-1945)*colWidth, yPos, 250+(end-1945)*colWidth, yPos);
      } else {
        var startX2 = 250+(start-1945)*colWidth;
        var endX2 = 250+(end-1945)*colWidth;
        var coordY2 = 620+k*20;
        fill('#62592C');
        // start of the war
        noStroke();
        ellipse(startX2, coordY2, 3, 3);
        textStyle(NORMAL);
        textSize(8);
        textAlign(RIGHT);
        text(state, startX2-5,coordY2+2);
        // end of the war
        noStroke();
        ellipse(endX2, coordY2, 3, 3);
        textAlign(LEFT);
        textStyle(BOLD);
        text(statedata[state][i].WarName, endX2+5,coordY2+2);
        // length of the war
        strokeWeight(1.5);
        stroke('#62592C');
        line(250+(start-1945)*colWidth, coordY2, 250+(end-1945)*colWidth, coordY2);
        k++;
      }
    }
  }

// end
}
