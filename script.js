var movies = [
   {
      action: ["the other guys", "a knight's tale", "extraction", "ocean's eleven", "spenser confidential" ]
   },
   {
      romantic: ["sleepless in seattle", "set it up", "when we first met", "the notebook", "the wedding planner"]
   },
   {
      horror: ["hereditary", "halloween", "sleepy hollow", "hush", "the boy"]
   },
   {
      scifi: ["star wars", "blade runner", "underworld", "bird box", "time trap"]
   },
   {
      thriller: ["dangerous lies", "nightcrawler", "murder mystery", "uncut gems", "drive"]
   },
   {
      family: ["spider-man: into the spider-verse", "enola holmes", "a series of unfortunate events", "back to the future", "bee movie"]
   },
   {
      comedy: ["hubie halloween", "mr. deeds", "big daddy", "you don't mess with the zohan", "the do-over"]
   }
]
 
function movieDetails() {
   var movie = $(".moviePick").text();
   var queryURL =
     "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
   console.log("movie", movie);
   console.log("queryURL:", queryURL);

   // AJAX call
   $.ajax({
     url: queryURL,
     method: "GET",
   }).then(function (response) {
     console.log("response", response);

     // div to hold movie info
     var movieDiv = $(".movieDiv");

     // title
     var title = response.Title
     var titleDiv = $("<h1>").text("Title: " + title)
     movieDiv.append(titleDiv)

     // plot
     var plot = response.Plot;
     var plotDiv = $("<p>").text("Plot: " + plot);
     movieDiv.append(plotDiv);

     // rating
     var rating = response.Rated;
     var ratingDiv = $("<p>").text("Rating: " + rating);
     movieDiv.append(ratingDiv);

     // release year
     var released = response.Released;
     var releaseDiv = $("<p>").text("Released: " + released);
     movieDiv.append(releaseDiv);

     // runtime
     var runtime = response.Runtime;
     var runtimeDiv = $("<p>").text("Runtime: " + runtime);
     movieDiv.append(runtimeDiv);

     // image
     var imgURL = response.Poster;
     var imageDiv = $("<img>").attr("src", imgURL);
     movieDiv.append(imageDiv);

      // log it
     console.log("movieDiv", movieDiv);

   });
}

movieDetails()