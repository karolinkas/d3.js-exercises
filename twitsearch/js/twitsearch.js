function search(query){
	// use the titcher url and key
	var url = "http://twitcher.steer.me/search?q="+query+"&key=x7jjywqf"

	var fontScale = d3.scale.linear().domain([0,2000]).range([14,40]).clamp(true)

	var colorScale = d3.scale.linear().domain([0,2000]).range(["#cccccc","#fc3729"])

	//Because we are expecting json back from the server we can use a d3 shortcut 
	d3.json(url,function(error,data){
		console.log(error,data)

		var list = d3.select("ul")

// Find all the li´s if threre are any there and delete them
		list.selectAll("li").remove()

		list.selectAll("li")
			.data(data)
			.enter()
			.append("li")
			.html(function(d,i){ 
				var tweet = "<span>"+d.text+"</span>" + "<strong>"+ d.user.name +"</strong>"
				return tweet
			})
			.style("font-size",function(d,i){return fontScale(d.user.followers_count)+"px"})
			.style("color",function(d,i){return colorScale(d.user.followers_count) })


	}) //End of json function

} //End of search function 

//search("Islington")

//Find the form on the page and listen for its submit event (in this case press enter) and then fire the code
d3.select("form").on("submit",function(d,i){
	//Find the input and grab it`s value
	var input = d3.select("input").property("value")
	console.log(input)
	search(input)
	d3.event.preventDefault()
})

