var totals;
var atmospheric;
var underground;
var all;


function preload(){
  all = loadJSON('data/all.json');
  totals = loadJSON('data/totals.json');
  atmospheric = loadJSON('data/atmospheric.json');
  underground = loadJSON('data/underground.json');
}

function setup(){
  createCanvas(3200, 700);
  background(0);


  // pick one of the three data files to work with and call it 'data'
  var data = atmospheric;

  // create a divergent palette where we'll use negative values for underground tests
  // and positive values for atmospheric (the -60 .. 80 range came from eyeballing the data)
  var palette = Brewer.divergent('RdBu', Infinity, -60, 0, 80);


  var x = 200;
  var y = 140;
  var rowHeight = 60;
  var colWidth = 40;

  // a overlay green rectangle after the 96' treaty
  var n = all.countries.length;
  var m = 1996-all.first+2; // the m-th column
  var overlayCols = all.last-1996+1;
  fill('rgba(123,162,63,0.2)');
  rect(x+(m-3/2)*colWidth, y-rowHeight*1.5, overlayCols*colWidth, (n+2)*rowHeight);

  // set up typography
  textFont("Chakra Petch");
  textSize(16);
  fill(230);
  noStroke();


  // draw country name labels on the left edge of the table
  textStyle(BOLD);
  textAlign(RIGHT);
  for (var country in data.tests){
    text(country, x-colWidth, y);
    y += rowHeight;
  }

  // draw each year's totals, one column at a time
  textStyle(NORMAL);
  textAlign(CENTER);
  for (var i=0; i<data.years.length; i++){
    y = 140;

    // draw the year label in the header row
    var year = data.years[i];
    fill(230);
    text(year, x, y-rowHeight);

    y -= 4; // move the 0-axis to the middle of each row

    // step through all the countries' totals for the year, row by row
    for (var country in data.tests){

      var w = 10; // width of the rectangle

      // draw the atmospheric tests as the rectangle above
      var value = atmospheric.tests[country][i];

      var h = value/100*50;
      var color = palette.colorForValue(value);
      fill(color);
      rect(x-(1/2*w), y-h, w, h);

      // draw the underground tests as the rectangle below using its *negative* value to pick the color
      value = underground.tests[country][i];
      h = value/100*50;
      color = palette.colorForValue(-value);
      fill(color);
      rect(x-(1/2*w), y, w, h);

      // shift downward before drawing the next country
      y += rowHeight;
    }

    // at the bottom, draw a square with the total number of tests that year
    var totalTests = 0;
    for (var country in data.tests){
      totalTests += atmospheric.tests[country][i] + underground.tests[country][i];
    }
    var s = Math.sqrt(totalTests);
    fill(255, 80);
    rect(x-1/2*s, y+s, s,s);

    // shift leftward before drawing the next year
    x += colWidth;
  }



}
