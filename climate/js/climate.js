var width = 960;
var height = 800;

// We will use this inside the function in a bit
//var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key=392012d9eb03723b11f810e4a5022347&format=json&artist=" + query;

//Create our svg element
var data; 
var svg = d3.select("div")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

function visual(query) {
    var url = "http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1980/1999/BRA"

    d3.json(url, function(error,data) {
      
      console.log(error,data)
        });
}

        
visual()
console.log(error,data)