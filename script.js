$('input[type="checkbox"]').on('change', function() {
    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});

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

  


  
$('#submit').on("click", function runScript(){

	$('.button-div').empty()
	var refreshButton = $('<button class="btn waves-effect waves-light red darken-4 refresh" >' + 'Try Again' + '</button>')
	$('.button-div').append(refreshButton);

	$(document).on("click", ".refresh", function(event){
		location.reload();
    })
	
	$(".genreCheck:checked").each(function runMovies() {
		// check for genre choice then adds those movies into movies array
		var genre = $(this).val();
		movies = movies.concat(eval(genre));
	});

	// randomly picks one out of the movies array
	var random = Math.floor(Math.random() * movies.length);
	var moviePick = movies[random];
	movieDetails(moviePick);

	console.log('this is the button', $(".foodcheck:checked"));

	$(".foodcheck:checked").each(function(){
		
		var foodType = $(this).val()
		food(foodType);
		// Refresh Button to be used in future development
		// $(document).on("click", ".refresh", function(event){
		// 	if(event.target.matches('.refresh')){
		// 	food(foodType);
		// 	}
		// })
	})
})

  // pulls data for the movie then dynamically adds it to html
  function movieDetails(moviePick) {

	var queryURL = "https://www.omdbapi.com/?t=" + moviePick + "&apikey=trilogy";

	// AJAX call
	$.ajax({
	  url: queryURL,
	  method: "GET",
	}).then(function (response) {
		console.log('this is the movie response', response);
	  // div to hold movie info
	  $('#movieform').empty();
	  var movieDiv = $(".movie-genre");
	  // title
	  var title = response.Title;
	  var titleDiv = $("<h3>").text(title);
	  movieDiv.append(titleDiv);
	  // image
	  var imgURL = response.Poster;
	  var imageDiv = $("<img>").attr("src", imgURL);
	  movieDiv.append(imageDiv);
	  // plot
	  var plot = response.Plot;
	  var plotDiv = $("<p>").text(plot);
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
	  
	});
	  
 
$("#refresh").on("click", function () {
  window.location.reload();
});	  
}

function food(foodType) {

	var apiKey = "cc184da5eab54e0cab6a17a989d5fa0c"

	var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&sort=random&cuisine=" + foodType +"&type=main course&addRecipeInformation=true" 

	$.ajax({
		url: queryURL,
		method: "GET"
	}) .then (function(response){
		console.log('this is the reponse', response)
		$('#foodform').empty();
		var titleDiv = $('<h3>').text(response.results[0].title)
		var imageDiv = $('<div>')
		imageDiv.css('margin-top', '15px');
		var image = $('<img>')
		image.attr('src', response.results[0].image);
		imageDiv.append(image)
		var linkDiv = $('<div>')
		var link = $("<a href='" + response.results[0].sourceUrl + "'>" + "Click Here To View The Full Recipe" + "</a>")
		linkDiv.append(link)
		var summaryDiv = $('<div>');
		var summaryP = $('<p>').html(response.results[0].summary)
		summaryDiv.append(summaryP)
		$('.ingredients').append(titleDiv, imageDiv, linkDiv, summaryDiv)

	})

$("#refresh").on("click", function () {
  window.location.reload();
});

};

// parallax JS
$(document).ready(function () {
    $(".parallax").parallax();
});
  


// refresh buttons
$('#home').on("click", function () {
	window.location.reload();
});

