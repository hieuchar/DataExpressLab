
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
	var remainder = total - amount;
	//draw the first bar 
	chart.beginPath(); 

  
	//choose the color
	chart.fillStyle = "#3370d4";
	//draw in the rectangle  
	chart.rect(Math.floor(c.width/8),Math.floor((c.height- 25 - (amount/total)) * (c.height - 25)), Math.floor(c.width/4), c.height)
	chart.fill();
	chart.fillStyle ="#000000";
	chart.fillText((amount/total).toFixed(2) + "%", Math.floor(c.width/8),Math.floor(c.height - (amount/total) * c.height) - 2)
	chart.closePath();
	
	//draw the second bar
	chart.beginPath();
	
	chart.fillStyle = "#ef581c";
	console.log((remainder/total) * c.height);	
	chart.rect(Math.floor(c.width/8 * 4), Math.floor(c.height - 25 - (remainder/total) * (c.height - 25), Math.floor(c.width/4) ,c.height)
	chart.rect(Math.floor(c.width/8 * 4),  300, 10, 10);
	chart.fill();
	chart.fillStyle ="#000000";
	chart.fillText(((total - amount)/total).toFixed(2) + "%", Math.floor(c.width/8 * 4),
								 Math.floor(c.height - ((total-amount)/total) * c.height) - 2)
	chart.closePath();
	chart.fillStyle ="#000000";
	chart.font = "15px Times New Roman";		
}
chart1.fillText("Illiterate(Blue) vs take everything literally", 0, 50);
chart2.fillText("Blonde jokes only(Blue) vs no sarcasm", 0, 50);
chart3.fillText("Too cold vs too warm(Blue)", 0, 50);

