function changeColor(temp, brightness, summary) {
		temp = Math.floor(temp);
		brightness = Math.floor(brightness);
		if (temp > 155){  // safety check
			temp = 155;
		} else if (temp < -100) {
			temp = -100
		}
    	 $("body").css("background-color", "rgba("+(temp + 100)+",0,"+(155-temp)+","+(1-brightness)+")");
    	 $('.screen').append('<h3 class="summary">The weather is ' + summary + '</h3>');							
    	 $('.screen').append('<h3 class="summary"> The temperature is ' + temp + ' degrees F');
}

$('.weatherButton').on('click', function(e) {
		var lat       = $('#latitude').val(),
			long      = $('#longitude').val(),
			city_name = $('#city-search').val()
	if(lat && long !== '') {
		e.preventDefault();
		$('.form').fadeOut(100, function() {
			weatherReport(lat, long);
			
			$('.screen').append('<div id="back" class="button">New Forecast</div><h3 class="city">'+ city_name + '</h3><ul class="list-reset fadein-stagger" id="forecast"></ul>');
		});
	}

});

$('body').on('click', '#back', function() {
	window.location.reload(true);
})

function weatherReport(Latitude, Longitude) {
	var apiKey       = '4ed1cd6e63416eb34c056b5c84212ae9',
			url          = 'https://api.darksky.net/forecast/',
			lati         = Latitude,
			longi        = Longitude,
			api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";


	$.getJSON(api_call, function(forecast) {
		conditions = forecast.currently.summary;

		changeColor(forecast.currently.apparentTemperature, forecast.currently.cloudCover, conditions);
	});
}


function insertGoogleScript() {
	var google_api = document.createElement('script'),
			api_key    = 'AIzaSyCgI05NIz--BT48h2rRuG2cfsMQwGXw_uE';
	google_api.src = 'https://maps.googleapis.com/maps/api/js?key='+ api_key +'&callback=initGoogleAPI&libraries=places,geometry';
	document.body.appendChild(google_api);
}


// SearchBox Method
function initGoogleAPI() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));

	autocomplete.addListener('places_changed', function() {
		var place = autocomplete.getPlaces()[0];
		document.querySelector("#latitude").value = place.geometry.location.lat();
		document.querySelector("#longitude").value = place.geometry.location.lng();
	});
}

insertGoogleScript();
