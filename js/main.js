var APPID = "079f7d8d2fc7378eb62f2d80e33d665b";


$(document).ready(() => {

	// Get Value From Input
	$("#searchForm").on("submit", (e) => {
		let searchQuery = ($("#searchText").val());
		getCity(searchQuery);

		e.preventDefault();
	});

});

// Get City Based On Search Query
function getCity(query){
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + APPID + "&units=metric";
	
	axios.get(url)
		.then((response) => {
			console.log(response);
			setText(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
}

// Set all text according to data retrieved
function setText(data){
	$("#city").text(data.name + ", " + data.sys.country);
	$("#temp").html((data.main.temp).toFixed(1) + "&deg;C");
	$("#humidity").text(data.main.humidity + "%");
	$("#wind").text(data.wind.speed + " m/s");
	$("#desc").text(data.weather[0].description);

	$('#desc').css('textTransform', 'capitalize');

	setImage(data);
	convertToDirection(data);
}

// Set Image based on forecast
function setImage(data){
	var code = data.weather[0].icon;

	switch(code){
		case "01d":
			$("#weathericon").attr("src", "img/sunny.png");
			break;
		case "01n":
			$("#weathericon").attr("src", "img/sunny_night.png");
			break;
		case "02d":
			$("#weathericon").attr("src", "img/cloudy2.png");
			break;
		case "02n":
			$("#weathericon").attr("src", "img/cloudy2_night.png");
			break;
		case "03d":
			$("#weathericon").attr("src", "img/cloudy5.png");
			break;
		case "03n":
			$("#weathericon").attr("src", "img/cloudy5.png");
			break;
		case "04d":
			$("#weathericon").attr("src", "img/overcast.png");
			break;
		case "04n":
			$("#weathericon").attr("src", "img/overcast.png");
			break;
		case "09d":
			$("#weathericon").attr("src", "img/shower3.png");
			break;
		case "09n":
			$("#weathericon").attr("src", "img/shower3.png");
			break;
		case "10d":
			$("#weathericon").attr("src", "img/shower2.png");
			break;
		case "10n":
			$("#weathericon").attr("src", "img/shower2_night.png");
			break;
		case "11d":
			$("#weathericon").attr("src", "img/tstorm2.png");
			break;
		case "11n":
			$("#weathericon").attr("src", "img/tstorm2_night.png");
			break;
		case "13d":
			$("#weathericon").attr("src", "img/snow5.png");
			break;
		case "13n":
			$("#weathericon").attr("src", "img/snow5.png");
			break;
		case "50d":
			$("#weathericon").attr("src", "img/fog.png");
			break;
		case "50n":
			$("#weathericon").attr("src", "img/fog_night.png");
			break;
		default:
			$("#weathericon").attr("src", "img/sunny.png");
			break;
	}
}

// Convert Degrees To Direction (N,E,S,W)
function convertToDirection(data){
	var degree = data.wind.deg;
	var range = 360 / 16;
	var low = 360 - (range/2);
	var high = (low + range) % 360;

	var angles = ["N", "NE", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW" ];

	for (i in angles) {
		if (degree >= low && degree < high) {
			$("#direction").text(angles[i]);
		}

		low = (low + range) % 360;
		high = (high + range) % 360;
	}
}