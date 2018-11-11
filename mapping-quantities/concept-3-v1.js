var atmospheric;
var underground;
var warinvolve;

function preload(){
  atmospheric = loadJSON('data/atmospheric.json');
  underground = loadJSON('data/underground.json');
  wardata = loadJSON('data/wardataconvert.json');
}

function setup(){
  createCanvas(6200, 700);
  background('#e0e0d9');

  // pick one of the three data files to work with and call it 'data'
  var data = atmospheric;

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
  var rowHeight = 60;
  var colWidth = 80;
  var radius = 50;
  // draw country name labels on the left edge of the table
  textStyle(BOLD);
  textAlign(RIGHT);
  for (var country in data.tests){
    text(country, x-colWidth, y);
    y -= rowHeight;
  }

  // draw each year's totals, one column at a time
  textStyle(NORMAL);
  textAlign(CENTER);
  for (var i=0; i<data.years.length; i++){
    y = 500;



    // step through all the countries' totals for the year, row by row
    for (var country in data.tests){
      // draw the atmospheric tests as an upper semicircle using the palette to set the color by value
      var value = atmospheric.tests[country][i];

      var color = palette.colorForValue(value);
      fill(color);
      arc(x, y, radius, radius, -PI, 0);

      // draw the underground tests as a lower semicircle using its *negative* value to pick the color
      value = underground.tests[country][i];
      color = palette.colorForValue(value);
      fill(color);
      arc(x, y, radius, radius, 0, PI);

      // shift downward before drawing the next country
      y -= rowHeight;
    }

    // at the bottom, draw a full circle with the total number of tests that year
    var totalTests = 0;
    for (var country in data.tests){
      totalTests += atmospheric.tests[country][i] + underground.tests[country][i];
    }
    value = totalTests;
    color = palette.colorForValue(value);
    fill(color);
    ellipse(x, 592, radius);


    // draw the year label in the header row
    var year = data.years[i];
    fill('#e0e0d9');
    text(year, x, 600);

    // shift leftward before drawing the next year
    x += colWidth;
  }

  fill('#62592C');
  textSize(10);
  textAlign(LEFT);
  textStyle(ITALIC);
  text('Reference: Zeev Maoz, Paul L. Johnson, Jasper Kaplan, Fiona Ogunkoya, and Aaron Shreve 2019. The Dyadic Militarized Interstate Disputes (MIDs) Dataset Version 3.0: Logic, Characteristics, and Comparisons to Alternative Datasets, Journal of Conflict Resolution (forthcoming). ',200,30);

  stroke('#62592C');
  strokeWeight(3);
  line(200,550,6100,550);
  strokeWeight(1.5);
  line(4330,35,4330,550);

  noStroke();
  textStyle(NORMAL);
  textSize(16);
  text('The Comprehensive Test Ban Treaty',4330,30);
  triangle(4330,55, 4330,35, 4355, 45);


  for (var war in wardata){
    for (var i=0; i<wardata[war].length; i++){
      var N;
      var state = wardata[war][i].StateName;
      var start = wardata[war][i].StartYear;
      var end = wardata[war][i].EndYear;
      // row position for each state
      switch (state) {
        case "United States":
          N=0;
          break;
        case "Russia":
          N=1;
          break;
        case "United Kingdom":
          N=2;
          break;
        case "France":
          N=3;
          break;
        case "China":
          N=4;
          break;
        case "India":
          N=5;
          break;
        case "Pakistan":
          N=6;
          break;
        case "North Korea":
          N=7;
          break;
        default: N=10;
      }


      if (N<8){

        // length of the war
        strokeWeight(wardata[war].length);
        stroke('#62592C');
        // line(250+(start-1945)*colWidth, 500-rowHeight*N, 250+(end-1945)*colWidth, 500-rowHeight*N);
        var centerX = ((250+(start-1945)*colWidth)+(250+(end-1945)*colWidth))/2;
        var centerY = 500-rowHeight*N;
        noFill();
        arc(centerX,centerY,(end-start)*colWidth,radius,PI,0);

        // strokeWeight(1.5);
        // fill(palette.colorForValue(0));
        // // start of the war
        // ellipse(250+(start-1945)*colWidth, 500-rowHeight*N, 5, 5);
        // // end of the war
        // ellipse(250+(end-1945)*colWidth, 500-rowHeight*N, 5, 5);

      }
    }
  }


  // for (var i=0; i<16; i++){
  //   strokeWeight(i+1);
  //   point(200+i*20,660);
  // }
}
