
var c = document.getElementById('chart1');
var chart1 = c.getContext("2d");

c = document.getElementById('chart2');
var chart2 = c.getContext("2d");
c = document.getElementById('chart3');
var chart3 = c.getContext("2d");

var total = document.getElementById('amount').innerHTML;
drawChart(chart1, document.getElementById('q1').innerHTML);
drawChart(chart2, document.getElementById('q2').innerHTML);
drawChart(chart3, document.getElementById('q3').innerHTML);


function drawChart(chart, amount){
	
	//draw the first arc 
	chart.beginPath();
	//move to the center
	chart.moveTo(Math.floor(c.width / 2), Math.floor(c.height / 2));
	//convert the amount of people into a percentage and then into radians
  var currAngle = convertPercentToRadians(amount / total);
	//set the ending of the arc
  
	//choose the color
	chart.fillStyle = "#3370d4";
	//draw in the arc
  chart.arc(Math.floor(c.width / 2), Math.floor(c.height / 2), 50, 0, currAngle, true);	
	chart.fill();
	chart.closePath();
	
	//draw the second arc
	chart.beginPath();
	chart.moveTo(Math.floor(c.width / 2), Math.floor(c.height / 2));
	
	chart.fillStyle = "#ef581c";
	chart.arc(Math.floor(c.width / 2), Math.floor(c.height / 2), 50, currAngle, Math.PI * 2, true);
	chart.fill();
	chart.closePath();
	
	chart.fillText((amount / total).toFixed(2) + "%", c.width / 2 - 20, 50);
}

function convertPercentToRadians(percent){
  return (percent * 360 * Math.PI) / 180;
}
