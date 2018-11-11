var fs = require('fs');

var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/statewardata.json');
var statewar = JSON.parse(rawData);
var states = Object.keys(statewar);
var statedata = {'statenames':states,'states':statewar};

fs.writeFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/statewar.json', JSON.stringify(statedata));

// var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/wardata.json');
// var wardata = JSON.parse(rawData);
// var wars = Object.keys(wardata);
// var warInvolve = {'warnames':wars,'wars':wardata};
// fs.writeFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/warinvolve.json', JSON.stringify(warInvolve));
