// Getting and setting empty arrays for local storage items
if (!localStorage.getItem("savedFoodsList")){
	localStorage.setItem("savedFoodsList", JSON.stringify([]));
}
if (!localStorage.getItem("savedMoviesList")){
	localStorage.setItem("savedMoviesList", JSON.stringify([]));
}
// Setting global variables for parsed localStorage items
var savedMoviesParse = JSON.parse(localStorage.getItem('savedMoviesList'));
var savedFoodsParse = JSON.parse(localStorage.getItem('savedFoodsList'));
// Function allowing only one cuisine checkbox to be selected
$('input[type="checkbox"]').on('change', function() {
    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});
// Variables of movie genres containing titles
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
// Div to hold pushed movie titles into
var movies = [];
// Divs to push searched movie and recipe titles
var savedMovies = [];
var savedFoods = [];

function clear(){
	// Changes the submit button to a try again button
	$('.button-div').empty()
	var refreshButton = $('<button class="btn waves-effect waves-light red darken-4 refresh" >' + 'Try Again' + '</button>')
	$('.button-div').append(refreshButton);
	// Adds functionality to reload the page onclick of refresh button
	$(document).on("click", ".refresh", function(event){
		location.reload();
    })
	// Removes the section headings
	$(".sectionheading").remove();
}

// Submit on click function
$('#submit').on("click", function runScript(){
	// Keeps the user from hitting submit without selecting a either genre or cuisine
	if(!$('.genreCheck').is(':checked') && !$('.foodcheck').is(':checked')){
		alert('Please select a movie genre or cuisine type')
		return;
	} else {

	clear();
	
	// genreCheck Function
	$(".genreCheck:checked").each(function runMovies() {
		if (!$('input[class=".genreCheck"]:checked').length > 0 ){
			console.log('cant be null')
		}
		// Check for genre choice then adds those movies into movies array
		var genre = $(this).val();
		movies = movies.concat(eval(genre));
	});
	// randomly picks one out of the movies array
	var random = Math.floor(Math.random() * movies.length);
	var moviePick = movies[random];
	movieDetails(moviePick);

	
	// foodcheck function runs food() based off foodType
	$(".foodcheck:checked").each(function(){
		var foodType = $(this).val()
		food(foodType);
	})
	// Empty searchhistorylist and render new list
	$('.searchmovielist').empty();
	$('.searchrecipelist').empty();
	renderMovieList();
	renderRecipeList();
}
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
		if (response.Title === "Undefined"){
			return;
		} else {
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
		// Pushes movie title into local storage and saves
	  var savedMoviesList = localStorage.getItem("savedMoviesList")
	  savedMoviesList = JSON.parse(savedMoviesList);
	  savedMoviesList.push(moviePick);
	  localStorage.setItem("savedMoviesList", JSON.stringify(savedMoviesList));
		}
	  
	});
	  
 
$("#refresh").on("click", function () {
  window.location.reload();
});	  


}
// pulls data for a random recipe based on cuisine type selected
function food(foodType) {

	var apiKey = "cc184da5eab54e0cab6a17a989d5fa0c"

	var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&sort=random&cuisine=" + foodType +"&type=main course&addRecipeInformation=true" 

	$.ajax({
		url: queryURL,
		method: "GET"
	}) .then (function(response){
		console.log('this is the reponse', response)
		// Collects information and appends accordingly
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
		// Pushes recipe title into local storage and saves
		var foodTitle = response.results[0].title
		var savedFoodsList = localStorage.getItem("savedFoodsList")
	  	savedFoodsList = JSON.parse(savedFoodsList);
	  	savedFoodsList.push(foodTitle);
	  	localStorage.setItem("savedFoodsList", JSON.stringify(savedFoodsList));
	})

$("#refresh").on("click", function () {
  window.location.reload();
});

};
// On click function to run recently searched movies and recipes
$(document).on("click", ".list-group-item", function(event){
	if (event.target.matches('.list-group-item')){
		clear();
		var movieToRun = $(this).attr("movie")
		var foodToRun = $(this).attr("food")
		movieListClick(movieToRun);
		foodListClick(foodToRun);
		console.log($(this).attr("movie"))
		console.log($(this).attr("food"))
	}
})
// On click function to clear recent searches
$(document).on("click", "#clearmoviesearch", function(event){
	if (event.target.matches("#clearmoviesearch")){
		$('.searchmovielist').html("")
		savedMoviesParse.length = 0;
		localStorage.setItem('savedMoviesList', JSON.stringify(savedMoviesParse))
	}
})
$(document).on("click", "#clearfoodsearch", function(event){
	if (event.target.matches("#clearfoodsearch")){
		$('.searchrecipelist').html("")
		savedFoodsParse.length = 0;
		localStorage.setItem('savedFoodsList', JSON.stringify(savedFoodsParse))
	}
})
// Function to run recently searched recipe
function foodListClick (foodToRun){
	var apiKey = "cc184da5eab54e0cab6a17a989d5fa0c"

	var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&titleMatch=" + foodToRun +"&addRecipeInformation=true" 

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
};
// Function to run recently searched recipe
function movieListClick (movieToRun){
	
	var queryURL = "https://www.omdbapi.com/?t=" + movieToRun + "&apikey=trilogy";

	// AJAX call
	$.ajax({
	  url: queryURL,
	  method: "GET",
	}).then(function (response) {
		console.log('this is the movie response', response);
		if (response.Title === "Undefined"){
			return;
		} else {
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
		}
	});

}
// Function to loop through saved movies and foods and append to page
function renderMovieList(){
	
	var searchCounter = 1;
	for (i = 0; i < savedMoviesParse.length; i++){

		var singleSearchLi = $('<li>' + '<button class="btn-small waves-effect waves-light red darken-4" style="margin-top: 5px">' + 'Previous Search ' + searchCounter++ + '</button>' + '</li>')
		singleSearchLi.children().addClass('list-group-item')
		singleSearchLi.children().attr("movie", savedMoviesParse[i])
		console.log(singleSearchLi);
		$('.searchmovielist').append(singleSearchLi);
		// Feature that only allows the top three recent searches to be stored
		if (savedMoviesParse.length > 3){
			savedMoviesParse.splice(0, 1)
			localStorage.setItem('savedMoviesList', JSON.stringify(savedMoviesParse))
		}

	}
}

function renderRecipeList(){
	
	var searchCounter = 1;
	for (i = 0; i < savedFoodsParse.length; i++){

		var singleSearchLi = $('<li>' + '<button class="btn-small waves-effect waves-light red darken-4" style="margin-top: 5px">' + 'Previous Search ' + searchCounter++ + '</button>' + '</li>')
		singleSearchLi.children().addClass('list-group-item')
		singleSearchLi.children().attr("food", savedFoodsParse[i])
		console.log(singleSearchLi);
		$('.searchrecipelist').append(singleSearchLi);
		// Feature that only allows the top three recent searches to be stored
		if (savedFoodsParse.length > 3){
			savedFoodsParse.splice(0, 1)
			localStorage.setItem('savedFoodsList', JSON.stringify(savedFoodsParse))
		}

	}
}

// parallax JS
$(document).ready(function () {
    $(".parallax").parallax();
});
// refresh buttons
$('#home').on("click", function () {
	window.location.reload();
});
// RenderList upon opening of page
renderMovieList();
renderRecipeList();
