var width = 960;
var height = 800;

// We will use this inside the function in a bit
//var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key=392012d9eb03723b11f810e4a5022347&format=json&artist=" + query;

//Create our svg element
var svg = d3.select("div#artists")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

function search(query) {
    var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key=392012d9eb03723b11f810e4a5022347&format=json&artist=" + query;

    d3.json(url, function(error, data) {
        //console.log(error, data)
        // We don´t want 100 artist and limit it to 25
        var artists = data.similarartists.artist.slice(0, 25)
        console.log(artists)

        // Loop through each artist object and set 2 new properties
        for (var i = 0; i < artists.length; i++) {
            console.log(artists[i])
            // Giving each object a new property being calculated by the svg´s width/height!!!
            artists[i].x = Math.random() * width
            artists[i].y = Math.random() * height
        } // End of for-loop


        svg.selectAll("circle").remove();
        svg.selectAll("text").remove();

        //Prepopulate the input with the name of the initial artist we search for
        d3.select("input").property("value", query)

        var colorScale = d3.scale.linear().domain([0.4,1]).range(["#FFCC55","#fc3729"])
        // using the sqrt scale makes the radiuses range less linear
        var radiusScale = d3.scale.sqrt().domain([0,1]).range([0,75])
        var fontScale = d3.scale.linear().domain([0,1]).range([8,20])

        var circles = svg.selectAll("circle")
        var texts = svg.selectAll("text")

        var force = d3.layout.force()
            // nodes are the individual objects and need to have x and y coordinates for the force laybout to work
            .nodes(artists)
            //Gravity and charge are options that controle physics of the force layout
            .gravity(0.35)
            .charge(-2500)
            .size([width, height])
            .start()

        // Create our circles and add them to the page, at this point they are not attached to the force layout   
        circles.data(artists)
            .enter()
            .append("circle")
            .attr("r", function(d,i){return radiusScale(d.match)})
            .call(force.drag)
            .style("fill",function(d,i){return colorScale(d.match)})

        texts.data(artists)
            .enter()
            .append("text")
            .text(function(d, i) {
                if(d.name.length > 16){
                    return d.name.substring(0,16) + "..."
                } else{

                   return d.name 
                } 
                // cut off bandname if it´s too long


            })
            .attr("font-size",function(d,i){return fontScale(d.match)})



        // The force layout sends and event called tick that is updating the x coords of every node/artist
        // object we can then apply those x and y coords to anything we want
        force.on("tick", function() {
            svg.selectAll("circle")
                .attr("cx", function(d, i) {
                    return d.x
                })
                .attr("cy", function(d, i) {
                    return d.y
                })

            svg.selectAll("text")
                .attr("x", function(d, i) {
                    return d.x
                })
                .attr("y", function(d, i) {
                    return d.y
                })
        })

    }) //end of search function
}
search("Deerhoof")

// perform search on form submit
// the variable definition is rather in there to get the value only then to define the variable
d3.select("form").on("submit",function(){
    var input = d3.select("input").property("value")
    search(input) 
    d3.event.preventDefault()
})

