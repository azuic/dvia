var fs = require('fs');
// var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/wardata.json');
// var wardata = JSON.parse(rawData);
// var wars = Object.keys(wardata);
// var warInvolve = {'warnames':wars,'wars':wardata};
// fs.writeFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/warinvolve.json', JSON.stringify(warInvolve));

var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/wardataconvert.json');
var wardata = JSON.parse(rawData);
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
      console.log(N);
      // noStroke();
      // fill('#62592C');
      // // start of the war
      // ellipse(250+(start-1945)*colWidth, 500-rowHeight*N, 5, 5);
      // // end of the war
      // ellipse(250+(end-1945)*colWidth, 500-rowHeight*N, 5, 5);
      // // length of the war
      // strokeWeight(1);
      // stroke('#62592C');
      // line(250+(start-1945)*colWidth, 500-rowHeight*N, 250+(end-1945)*colWidth, 500-rowHeight*N);
    }

  }
}
