
var foodsSelected = [];
console.log(foodsSelected);

$('#submit').on("click", function(){
	

	console.log('this is the button', $(".foodcheck:checked"));

	$(".foodcheck:checked").each(function(){
		console.log($(this).val());
		(foodsSelected).push($(this).val())

	})

})

function food() {

	var apiKey = "cc184da5eab54e0cab6a17a989d5fa0c"

	var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&sort=random&includeIngredients=milk,eggs" 

	$.ajax({
		url: queryURL,
		method: "GET"
	}) .then (function(response){
		console.log('this is the reponse', response)
	})

};