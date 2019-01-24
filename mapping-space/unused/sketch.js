// an array for the magnitude
var magnitudes;
// an array for depth
var depths;
// an array for lat & long
var latitudes, longitudes;
// an array for time and days
var times, days;

// for the sigificant data
var sigmagnitudes;
// an array for depth
var sigdepths;
// an array for lat & long
var siglatitudes, siglongitudes;
// an array for time and days
var sigtimes, sigdays;
var sighorizontal;

// for the sigificant data
var wkmagnitudes;
// an array for depth
var wkdepths;
// an array for lat & long
var wklatitudes, wklongitudes;
// an array for time and days
var wktimes, wkdays;

// minimum and maximum values for magnitude and depth
var magnitudeMin, magnitudeMax;
var depthMin, depthMax;

// the dots we'll be adding to the map
var circles = [];

// table as the data set
var table;
var sig;
var week;

// my leaflet.js map
var mymap;
var canvas;
var graphics;

// day slide control
var slider;
var sliderName;
var checkbox;



function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/all_month.csv", "csv", "header");
    sig = loadTable("data/significant_month.csv", "csv", "header");
    week = loadTable("data/all_week.csv", "csv", "header");
}

function setup() {
    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    canvas = createCanvas(windowWidth,200);
    canvas.parent('diagram-canvas');
    background(0,80);
    // next, draw our p5 diagram that complements it
    graphics = createGraphics(windowWidth,200,canvas);
    graphics.background(0,30);

    setupMap();

    sliderName = createElement('h1','whole month   |   selet day');
    sliderName.position(windowWidth-355,0);
    slider = createSlider(1,31,day(),1);
    slider.style('color','#999');
    slider.position(windowWidth-200,10);
    slider.changed(filterDataPoints);
    checkbox = createCheckbox();
    checkbox.position(windowWidth-380,10);
    checkbox.changed(drawDataPoints);
}

function setupMap(){
    /*
    LEAFLET CODE

    In this case "L" is leaflet. So whenever you want to interact with the leaflet library
    you have to refer to L first.
    so for example L.map('mapid') or L.circle([lat, long])
    */

    // create your own map
    mymap = L.map('quake-map',{
      center: [51.505, -0.09],
      zoom: 2,
      minZoom: 2,
      maxBounds: [[85, -180],[-85.05115, 180]],
      boxZoom: true
    });

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        // minZoom:1.5,
        // maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);

    depths = table.getColumn("depth");
    magnitudes = table.getColumn("mag");
    latitudes = table.getColumn("latitude");
    longitudes = table.getColumn("longitude");
    times = table.getColumn("time");
    days = times.map(i => parseInt(i.slice(8, 10)));

    sigdepths = sig.getColumn("depth");
    sigmagnitudes = sig.getColumn("mag");
    siglatitudes = sig.getColumn("latitude");
    siglongitudes = sig.getColumn("longitude");
    sigtimes = sig.getColumn("time");
    sigdays = sigtimes.map(i => parseInt(i.slice(8, 10)));
    sighorizontal = sig.getColumn("horizontalError");

    // get minimum and maximum values for both
    magnitudeMin = 0.0;
    magnitudeMax = getColumnMax("mag",table);
    // console.log('magnitude range:', [magnitudeMin, magnitudeMax])

    depthMin = 0.0;
    depthMax = getColumnMax("depth",table);


    // call our function (defined below) that populates the maps with markers based on the table contents
    drawDataPoints();


}

function draw(){
  // for(var i=0; i<depths.length; i++){
  //   fill('#FAFAFA');
  //   graphics.ellipse(100+depths[i],1500-magnitudes[i],5,5);
  // }
  // graphics.stroke('#FAFAFA');
  // graphics.text('yes',windowWidth/2,100);
  // console.log('yes');
  wkdepths = week.getColumn("depth");
  wkmagnitudes = week.getColumn("mag");
  var maxdep = getColumnMax("depths",week);
  var maxmag = getColumnMax("magnitudes",week);

  fill('#DDD23B');
  noStroke();
  for(var i=0; i<wkdepths.length; i++){
    ellipse(200+magnitudes[i]*200,50+depths[i]*5,2,2);
  }
  stroke('#DDD23B');
  strokeWeight(0.7);
  textAlign(RIGHT);
  textSize(10);
  text("depth",50,180);
  text("magnitude",windowWidth-40,30);

  textSize(14);
  text("0.0",200,45);
  textSize(20);
  text('this week',150,20);
  strokeWeight(1.5);
  line(155,25,60,25);
  // unit legend
  strokeWeight(1.2);
  line(200,50,windowWidth-90,50); // magnitude
  line(200,50,200,180); // depth
}

function drawDataPoints(){

    removeAllCircles();
    strokeWeight(0.1);

    // cycle through the parallel arrays and add a dot for each event
    for(var i=0; i<depths.length; i++){

          var circle = L.circle([latitudes[i],longitudes[i]], {
              color: '#3388ff',      // the dot stroke color
              opacity: depths[i]/100,  // use some transparency so we can see overlaps
              radius: 10
          });

        // place it on the map
        circle.addTo(mymap);

        // save a reference to the circle for later
        circles.push(circle)
    }

    for(var i=0; i<sigdepths.length; i++){
        // create a new dot
        var circle = L.circleMarker([siglatitudes[i],siglongitudes[i]], {
            color: '#8b0000',      // the dot stroke color
            opacity: sigdepths[i]/getColumnMax("depths",sig),  // use some transparency so we can see overlaps
            radius: 10
            // day: days[i]
        });
        // console.log(siglatitudes[i]);

        // // horizontal error
        // var horizontalerr = L.circle([siglatitudes[i],siglongitudes[i]], {
        //     color: '#8b0000',      // the dot stroke color
        //     opacity: 0.8,  // use some transparency so we can see overlaps
        //     radius: (5+sighorizontal[i])*10
        //     // day: days[i]
        // });

        // place circles on the map
        // horizontalerr.addTo(mymap);
        circle.addTo(mymap);
        circles.push(circle)
    }
}

function filterDataPoints(){
    removeAllCircles();

    strokeWeight(0.1);

    // cycle through the parallel arrays and add a dot for each event
    for(var i=0; i<depths.length; i++){
        if (days[i]==slider.value()){
          var circle = L.circle([latitudes[i],longitudes[i]], {
              color: '#3388ff',      // the dot stroke color
              opacity: magnitudes[i]/100,  // use some transparency so we can see overlaps
              radius: 10
              // day: days[i]
          });
          // console.log(days[i]);
          // place it on the map
          circle.addTo(mymap);
          // save a reference to the circle for later
          circles.push(circle);
        };

    }

    for(var i=0; i<sigdepths.length; i++){
        if (sigdays[i]==slider.value()){
          var circle = L.circleMarker([siglatitudes[i],siglongitudes[i]], {
              color: '#8b0000',      // the dot stroke color
              opacity: sigmagnitudes[i]/getColumnMax('magnitudes',sig),  // use some transparency so we can see overlaps
              radius: 10
          });
          // place it on the map
          circle.addTo(mymap);
          // save a reference to the circle for later
          circles.push(circle)
        };

    }
}

function removeAllCircles(){
    // remove each circle from the map and empty our array of references
    circles.forEach(function(circle, i){
        mymap.removeLayer(circle);
    })
    circles = [];
}

// get the maximum value within a column
function getColumnMax(columnName,tb){
    // get the array of strings in the specified column
    var colStrings = tb.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the max value by manually stepping through the list and replacing `m` each time we
    // encounter a value larger than the biggest we've seen so far
    var m = 0.0;
    for(var i=0; i<colValues.length; i++){
        if (colValues[i] > m){
            m = colValues[i];
        }
    }
    return m;

    // or do it the 'easy way' by using lodash:
    // return _.max(colValues);
}
