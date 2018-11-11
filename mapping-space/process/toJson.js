var fs = require('fs');
var table;

function preload(){
  table = loadTable('data/warcount.csv', 'csv', 'header');
}
var warcount ={};
var years = [];
var wars = {};
var countries = [];
var country;

function setup(){
  for (var c=1; c<table.getColumnCount(); c++){
    var country = table.getString(0,c);
    countries.push(country);
    var col =[];
    for (var r=0; r<table.getRowCount(); r++){
      var year = table.getString(r, 0);
      years.push(year);
      col.push(table.getNum(r,c));
    }
    wars.country = col;
  }
}


warcount.years = years;
warcount.wars = wars;

fs.writeFileSync('/Users/zuic/Documents/azuic/dvia/dvia-2018/2.mapping-quantities/students/am/zui/data/warcount.json', JSON.stringify(warcount));
