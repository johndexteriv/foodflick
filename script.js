$('input[type="checkbox"]').on('change', function() {
    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});


$('#submit').on("click", function(){
	

	console.log('this is the button', $(".foodcheck:checked"));

	$(".foodcheck:checked").each(function(){
		
		var foodType = $(this).val()
		food(foodType);

	})

})

function food(foodType) {

	var apiKey = "cc184da5eab54e0cab6a17a989d5fa0c"

	var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey + "&sort=random&cuisine=" + foodType +"&type=main course&addRecipeInformation=true" 

	$.ajax({
		url: queryURL,
		method: "GET"
	}) .then (function(response){
		console.log('this is the reponse', response)
		$('#foodform').empty();
		var imageDiv = $('<div>')
		imageDiv.css('margin-top', '15px');
		var image = $('<img>')
		image.attr('src', response.results[0].image);
		imageDiv.append(image)
		var linkDiv = $('<div>')
		var link = $("<a href='" + response.results[0].sourceUrl + "'>" + response.results[0].title + "</a>")
		linkDiv.append(link)
		var summaryDiv = $('<div>');
		var summaryP = $('<p>').html(response.results[0].summary)
		summaryDiv.append(summaryP)
		$('.ingredients').append(imageDiv, linkDiv, summaryDiv)

	})

};