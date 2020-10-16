var action = [
  "the other guys",
  "a knight's tale",
  "extraction",
  "ocean's eleven",
  "spenser confidential",
];

var romantic = [
  "sleepless in seattle",
  "set it up",
  "when we first met",
  "the notebook",
  "the wedding planner",
];

var horror = ["hereditary", "halloween", "sleepy hollow", "hush", "the boy"];

var scifi = [
  "underworld",
  "bird box",
  "time trap",
  "snowpiercer",
  "what happened to monday",
];

var thriller = [
  "dangerous lies",
  "nightcrawler",
  "murder mystery",
  "uncut gems",
  "drive",
];

var family = [
  "spider-man: into the spider-verse",
  "enola holmes",
  "a series of unfortunate events",
  "back to the future",
  "bee movie",
];

var comedy = [
  "hubie halloween",
  "mr deeds",
  "big daddy",
  "you don't mess with the zohan",
  "the do-over",
];

var movies = [];

// submit button
$("#submit").on("click", function () {
  $(".genreCheck:checked").each(function () {
    // check for genre choice then adds those movies into movies array
    var genre = $(this).val();
    movies = movies.concat(eval(genre));
  });

  // randomly picks one out of the movies array
  var random = Math.floor(Math.random() * movies.length);
  var moviePick = movies[random];
  movieDetails(moviePick);
});

// pulls data for the movie then dynamically adds it to html
function movieDetails(moviePick) {
  var queryURL = "https://www.omdbapi.com/?t=" + moviePick + "&apikey=trilogy";

  // AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    // div to hold movie info
    var movieDiv = $(".movieDiv");

    // title
    var title = response.Title;
    var titleDiv = $("<h1>").text("Title: " + title);
    movieDiv.append(titleDiv);

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
  });
}
