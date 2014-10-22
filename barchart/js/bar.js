
// to get number of wheels of do car.wheels in console


var jobs = [
  { name: "USA", income: 500 },
  { name: "UK", income: 450 },
  { name: "Germany", income: 300 },
  { name: "France", income: 450 },
  { name: "Spain", income: 250 }
];


var svg = d3.select("svg");

svg.selectAll("rect").data(jobs) //Find existing rectangles and or create empty selection and add data 
                      .enter() // Bind jobs objects to rectangles 
                      .append("rect") // Finally add them to the actual visible page 
                      .attr("x",20)
                      .attr("y", function(d,i){ return 50*i })
                      .attr("height",40)
                      .attr("width",0 )
                      .on("mouseover", function(){
                        d3.select(this).transition().duration(1000).style("fill","red");
                      })
                      .on("mouseout",function(){
                        d3.select(this).transition().duration(1000).style("fill","black");
                      })
                      .transition()
                      .ease("elastic")
                      .duration(1000)
                      .delay(function(d,i){return i*250})
                      .attr("width",function(d,i){ return d.income})


// Create our text elements

svg.selectAll("text")
  .data(jobs)
  .enter()
  .append("text")
  .attr("x",30)
  .attr("y",function(d,i){return 25+50*i})
  .text(function(d,i){return d.name})
 
