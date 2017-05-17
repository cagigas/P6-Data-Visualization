var margin = 100,
	width = 600,
	height = 400 - margin;
	
/********************************************************************
 * Use D3 to write a title and a smal introduction to the data set
 ********************************************************************/
function draw(data) {
	"use strict"; // We must declare all variables
	d3.select("body")
	  .append("h2")
	  .text("Titanic DataSet")
	  .append("h6")
	  .text("Conslusions: We can see the most important data from Titanic Disaster."
			+ "This data set contains basic information of 891 passengers of "
			+ "the Titanic. Information such as, Spouses, Children, whether "
			+ "they survived or not, class, their name, age, ticket number and so on. "
			+ "We will try to display all this information in a easy way, so "
			+ "you can understand easily what happened there. ");

	plotChart(data);	
	d3.select("body")
	  .append("h6")
	  .text("In this first plot, you can compare among class/sex/Number of Siblings/"
			+ "Number of Parents/Children/Embarked port and the porcentage of deceased/"
			+ "survived people. It seems clear that high class people and females were more "
			+ "likely to survive. It is curious that beeing a big family, didn't mean you were going "
			+ "to survive. Actually, bigs families were more likely to death. ");

	plotBubble(data);
	d3.select("body")
	  .append("h6")
	  .text("In this second plot, you can see one of the most interesting comparations."
			+ "survived/deceased male against female.");
	
};

/********************************************************************
 * plotBubble - Receiving the data set, this function will create  the second
 * bubble plot. It shows the most interesting from my point of view
 * difference between men and women in survived or not.
 ********************************************************************/
function plotBubble(data){
	var xvalues = ["Pclass", "Sex", "SibSp", "Parch", "Embarked", "AgeI"]
	var xvaluesnames = ["Class", "Sex", "Number of Siblings/Spouse", "Number of Parents/Children", "Embarked Port", "Age"]

	//Define buttons
	var buttons2 = d3.select("body")
					.append("div")
					.attr("class", "xvalues_buttons2")
					.selectAll("div")
					.data(xvaluesnames)
					.enter()
					.append("button")
					.attr("class", "btn btn-danger")
					.text(function(d) {
					  return d;
					});
	//I will activate first button to facilitate user visualization
	d3.select(".xvalues_buttons2").selectAll("button")[0][0].className += " active";

	//Define button click behavior and chart update sequence by first removing the previous plot and then updating with the new plot
	buttons2.on("click", function(d) {
		d3.select(".xvalues_buttons2")
		  .selectAll("div")
		  .transition()
		  .duration(500)
		  
		d3.select(".xvalues_buttons2")
		  .selectAll("button")
		  .each(function(e,i) { 
				if(e==d){
					d3.select(".xvalues_buttons2").selectAll("button")[0][i].className += " active";//Activate button
				}else{
					d3.select(".xvalues_buttons2").selectAll("button")[0][i].className = "btn btn-danger";//Desactivate button
				}
			})
		d3.select(this)
		  .transition()
		  .duration(500)
		
		svg.selectAll("*").remove();
		chartUpdate2(d); 
	})

	var svg = d3.select("body")
				.append("svg")
				.attr("width", width + margin)
				.attr("height", height + margin)
				.append('g')
				.attr('class','chart');
	var xvalue = "Class";
			
	/******************************************
	* This function help to update the plot information, besides we onyl use it once
	* it might be useful for the future.
	*******************************************/
	function chartUpdate2(xvalue) {
		var myChart = new dimple.chart(svg, data);
		
		var x = myChart.addCategoryAxis("x", xvalues[xvaluesnames.indexOf(xvalue)]);

		if(xvalues[xvaluesnames.indexOf(xvalue)] == "Embarked"){
			x.addOrderRule(['C', 'Q', 'S']);
		}else{
			x.addOrderRule(xvalues[xvaluesnames.indexOf(xvalue)]);
		}
		
		x.title = xvalue;
		
		var y = myChart.addMeasureAxis("y", "count");//If only count: addMeasureAxis
		y.title = "% Deceased/Survived";
		myChart.addMeasureAxis("z", "count");//Size of the bubble depending on number of passenger

		//Define stacked bar chart split using survival status
		var s = myChart.addSeries("PassengerStatus", dimple.plot.bar);

		//Use aggregate function to calculate sum and percentage
		s.aggregate = dimple.aggregateMethod.count;
		
		s.getTooltipText = function (e) {
			return [
				e.aggField[0],
				xvalue + ": " + e.x,
				e.aggField[0] + " People: " +e.y
			]
		};

		//Define legend position and color scheme for bars
		myChart.addLegend(10, 10, 500, 30, "left");
		myChart.assignColor("Deceased", "rgb(230,85,13)");
		myChart.assignColor("Survived", "rgb(43,140,190)");
		myChart.draw(1000);

	}
	chartUpdate2(xvalue);
};

/********************************************************************
 * plotChart - Receiving the data set, this function will create  the first
 * chart plot. It shows the differents parameters against the age.
 ********************************************************************/
function plotChart(data){
	var xvalues = ["Pclass", "Sex", "SibSp", "Parch", "Embarked", "AgeI"]
	var xvaluesnames = ["Class", "Sex", "Number of Siblings/Spouse", "Number of Parents/Children", "Embarked Port", "Age"]

	//Define buttons
	var buttons = d3.select("body")
					.append("div")
					.attr("class", "xvalues_buttons")
					.selectAll("div")
					.data(xvaluesnames)
					.enter()
					.append("button")
					.attr("class", "btn btn-success")
					.text(function(d) {
					  return d;
					});
	//I will activate first button to facilitate user visualization
	d3.select(".xvalues_buttons").selectAll("button")[0][0].className += " active";

	//Define button click behavior and chart update sequence by first removing the previous plot and then updating with the new plot
	buttons.on("click", function(d) {
		d3.select(".xvalues_buttons")
		  .selectAll("div")
		  .transition()
		  .duration(500)
		  
		d3.select(".xvalues_buttons")
		  .selectAll("button")
		  .each(function(e,i) { 
				if(e==d){
					d3.select(".xvalues_buttons").selectAll("button")[0][i].className += " active";//Activate button
				}else{
					d3.select(".xvalues_buttons").selectAll("button")[0][i].className = "btn btn-success";//Desactivate button
				}
			})
		d3.select(this)
		  .transition()
		  .duration(500)
		
		svg.selectAll("*").remove();
		chartUpdate(d); 
	})
	
	var svg = d3.select("body")
				.append("svg")
				.attr("width", width + margin)
				.attr("height", height + margin)
				.append('g')
				.attr('class','chart');
				
	var xvalue = "Class";
	
	/******************************************
	* This function help to update the plot information
	* everytime you change the y axis.
	*******************************************/
	function chartUpdate(xvalue) {
		var myChart = new dimple.chart(svg, data);
		
		var x = myChart.addCategoryAxis("x", xvalues[xvaluesnames.indexOf(xvalue)]);

		if(xvalues[xvaluesnames.indexOf(xvalue)] == "Embarked"){
			x.addOrderRule(['C', 'Q', 'S']);
		}else{
			x.addOrderRule(xvalues[xvaluesnames.indexOf(xvalue)]);
		}
		
		x.title = xvalue;
		
		var y = myChart.addPctAxis("y", "count");//If only count: addMeasureAxis
		y.title = "% Deceased/Survived";

		//Define stacked bar chart split using survival status
		var s = myChart.addSeries("PassengerStatus", dimple.plot.bar);
			s.addOrderRule(['Survived','Deceased']);
		
		//Use aggregate function to calculate sum and percentage
		s.aggregate = dimple.aggregateMethod.count;

		s.getTooltipText = function (e) {
			return [
				e.aggField[0],
				xvalue + ": " + e.x
			]
		};

		//Define legend position and color scheme for bars
		myChart.addLegend(10, 10, 500, 30, "left");
		myChart.assignColor("Deceased", "rgb(230,85,13)");
		myChart.assignColor("Survived", "rgb(43,140,190)");
		myChart.draw(1000);
		d3.selectAll('.dimple-bar.dimple-deceased').attr('visibility','hidden');

	}
	chartUpdate(xvalue);

};
/*******************************
 * Use D3 to load the csv file
 *******************************/
d3.csv("data/titanic.csv", function(d) {
	d['count']=1;
	if(d['Survived'] == 0){
		d['PassengerStatus'] = 'Deceased';
	}else{
		d['PassengerStatus'] = 'Survived';
	}
	if(d['Embarked'] == 'C' || d['Embarked'] == 'Q' || d['Embarked'] == 'S'){
	} else d['Embarked'] = 'C'//Only 2 exceptions
	if(+d['Age'] < 10){
		d['AgeI'] = 5;
	}else if(+d['Age'] >= 10 && +d['Age'] < 20){
		d['AgeI'] = 15;
	}else if(+d['Age'] >= 20 && +d['Age'] < 30){
		d['AgeI'] = 25;
	}else if(+d['Age'] >= 30 && +d['Age'] < 40){
		d['AgeI'] = 35;
	}else if(+d['Age'] >= 40 && +d['Age'] < 50){
		d['AgeI'] = 45;
	}else if(+d['Age'] >= 50 && +d['Age'] < 60){
		d['AgeI'] = 55;
	}else if(+d['Age'] >= 60 && +d['Age'] < 70){
		d['AgeI'] = 65;
	}else if(+d['Age'] >= 70 && +d['Age'] < 80){
		d['AgeI'] = 75;
	}else if(+d['Age'] >= 80 && +d['Age'] < 90){
		d['AgeI'] = 85;
	}
	return d;

}, draw);
