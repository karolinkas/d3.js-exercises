var svg = d3.select("svg")

//Create a variable and assign it to a variable
var force = d3.layout.force()
	.nodes(startups)
	.links(related)
	.linkDistance(75)
	.friction(0.95)
	.charge(-50)
	.size([720,720])
	.start()

var nodes  = svg.selectAll("circle")
	.data(startups)
	.enter()
	.append("circle")
	.attr("r",5)
	.attr("stroke","black")
	.call(force.drag)
	.on("click",function(d,i){
		nodes.attr("class","")
		d3.select(this).attr("class","highlight")
		d3.select("h2").html(d.name)
	})

	var links = svg.selectAll("line")
	.data(related)
	// it´s finding the matching objects
	.enter()
	.append("line")
	// Why is function not using return? Because it´s not actually returning stuff. It´s just recombining stuff.

force.on("tick",function(){
	nodes.attr("cx",function(d,i){ return d.x })
	nodes.attr("cy",function(d,i){ return d.y })

	links.attr("x1", function(d,i){ return d.source.x })
	links.attr("y1", function(d,i){ return d.source.y })
	links.attr("x2", function(d,i){ return d.target.x })
	links.attr("y2", function(d,i){ return d.target.y })
})

console.log(startups,related)






