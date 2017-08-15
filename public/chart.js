console.log(document);

var c = document.getElementById('chart1');
var chart1 = c.getContext("2d");
c = document.getElementById('chart2');
var chart2 = c.getContext("2d");
c = document.getElementById('chart3');
var chart3 = c.getContext("2d");

chart1.beginPath();
chart1.arc(Math.floor(c.width / 2), Math.floor(c.height / 2), 50, 0 , 3, true);
chart1.stroke();



chart2.beginPath();
chart2.arc(Math.floor(c.width / 2), Math.floor(c.height / 2), 50, 0 , 3, true);
chart2.stroke();



chart3.beginPath();
chart3.arc(Math.floor(c.width / 2), Math.floor(c.height / 2), 50, 0 , 3, true);
chart3.stroke();

function drawChart(){
  var startingangle;
  var endangle;
  
}

function convertPercentToRadians(percent){
  return (percent * 360 * Math.PI) / 180;
}