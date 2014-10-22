var width= 800;
var height= 1750;

var svg = d3.select("svg");

// find min and max of index dynamically
var max= d3.max(cities,function(d,i){return d.index})
var min= d3.min(cities,function(d,i){return d.index})

console.log(max);
console.log(min);

// sorting data if it´s not
// x and y are the two values I want to compare

var sortedData = cities.sort(function(x,y){
	return d3.ascending(x.index,y.index) 
})



// Scales will be added in later
var colorScale = d3.scale.linear().domain([min,max]).range(["#153d53","#7175f4"])

var widthScale = d3.scale.linear().domain([0,300]).range([0,width]) 


svg.selectAll("rect")
	.data(cities)
	.enter()
	.append("rect") //Append those rectangles to the svg element one after each other according to the data
	.attr("x",0)  // set x-axis to 0
	.attr("y",function(d,i){
		return i* 25
	})
	.attr("height",24)
	.attr("width",0)
	.attr("fill",function(d,i){
		return colorScale(d.index)
	})
	.transition()   // default 
	.delay(function(d,i){return i*250 })
	.duration(1000)
	.attr("width", function(d,i){
	return widthScale(d.index)	
	})


	// Adding the city names
	svg.selectAll("text.label")
		.data(cities)
		.enter()
		.append("text")
		.attr("x",10)
		.attr("y",function(d,i){ return i*25 + 13})
		.text(function(d,i){ return d.city})
		.attr("class","label")

	// Add percentage numbers to page
	svg.selectAll("text.percentage")
		.data(cities)
		.enter()
		.append("text")
		.attr("x",function(d,i){return widthScale(d.index)+5})
		.attr("y",function(d,i){ return i*25 + 13})
		.text(function(d,i){ return d.index})
		.attr("class","percentage")
		.text(function(d,i){
			var percent = "";
			if(d.index>100){
				percent += "+"
			}
			percent += d.index - 100 + "%"
			return percent;

		})
		.style("fill",function(d,i){ return colorScale(d.index)})
		.style("opacity",0)
		.transition()
		.delay(function(d,i){return i*20})
		.duration(500)
		.style("opacity",1)

		
		





