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
  createCanvas(4200, 700);
  background('#808F7C');
  var us = '#113285';
  var ru = '#734338';
  var uk = '#897D55';
  var fr = '#70649A';
  var cn = '#B54434';
  var id = '#563F2E';
  var pk = '#E9CD4C';
  var nk = '#516E41';
  var colors = [us,ru,uk,fr,cn,id,pk,nk];
  // var colors = ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"];
  var x0 = 100;
  var y0 = 65;
  for (var i=0; i<colors.length; i++) {
    fill(colors[i]);
    noStroke();
    rect(x0,y0,40,5);
    y0 +=15;
  }


  // pick one of the three data files to work with and call it 'data'
  var data = atmospheric;

  // create a divergent palette where we'll use negative values for underground tests
  // and positive values for atmospheric (the -60 .. 80 range came from eyeballing the data)
  // var palette = Brewer.divergent('RdBu', Infinity, -60, 0, 80);


  var x = 150;
  var y = 70;
  var rowHeight = 60;
  var colWidth = 5;

  textFont("Chakra Petch");
  textSize(10);
  fill(230);
  noStroke();
  var n = all.countries.length;
  for (var country in data.tests){
    text(country, x, y);
    y += 15;
  }


  // draw each year's totals, one column at a time
  fill(230);
  noStroke();


  textSize(16);
  textAlign(CENTER);

  textStyle(BOLD);
  text('THE GROUND', 150, 415);
  triangle(208,413,208,407,220,410);

  textStyle(NORMAL);

  x = 290;
  var y1 = 400;
  var y2 = 419;
  for (var i=0; i<data.years.length; i++){

    // draw the year label in the header row
    var year = data.years[i];
    fill(230);
    text(year, x, 415);

    // // at each year, draw a full circle with the total number of tests that year
    var totalTests = 0;
    for (var country in data.tests){
      totalTests += atmospheric.tests[country][i] + underground.tests[country][i];
    }
    var r = Math.sqrt(totalTests)*5;

    fill(100, 80);
    ellipse(x, 410, r,r);


    var c = 0;
    // step through all the countries' totals for the year, row by row
    for (var country in data.tests){

      var w = 5; // width of the rectangle

      // draw the atmospheric tests as the rectangle above
      var value = atmospheric.tests[country][i];

      var h = value*2;
      //var color = palette.colorForValue(value);
      fill(colors[c]);
      rect(x-20, y1-h, 2, h);

      // draw the underground tests as the rectangle below using its *negative* value to pick the color
      value = underground.tests[country][i];
      h = value*2;

      fill(colors[c]);
      rect(x-20, y2, 2, h);

      // shift left to the next year
      x += colWidth;
      c++;
    }

    // // at the bottom, draw a full square with the total number of tests that year
    // var totalTests = 0;
    // for (var country in data.tests){
    //   totalTests += atmospheric.tests[country][i] + underground.tests[country][i];
    // }
    // var s = Math.sqrt(totalTests)*5;
    //
    // fill(100, 80);
    // ellipse(x-colWidth, 410, s,s);
    // x += colWidth;
  }

  var diff = 1996 - all.last;
  stroke(230);
  var xLine = x+colWidth*diff*8.5;
  line(xLine,y1-50,xLine,y1-10);
  noStroke();
  fill(230);
  text("The Comprehensive Test Ban Treaty", xLine-5, y1-55);
  triangle(xLine,y1-9,xLine-5,y1-14,xLine+5,y1-14);


}
