var APPID = "079f7d8d2fc7378eb62f2d80e33d665b";


$(document).ready(() => {

	//Run Methods
	hideTables();

	// Get Value From Input
	$("#searchForm").on("submit", (e) => {
		startSearch();
		e.preventDefault();
	});

});

// Hide All Tables
function hideTables(){
	$("#weather").hide();
	$("#forecast").hide();


	$("#tableDiv").hide();
	$("#fc1").hide();
	$("#fc2").hide();
	$("#fc3").hide();
	$("#fc4").hide();
	$("#fc5").hide();
}

// Show All Tables
function showTables(){
	$("#weather").show();
	$("#forecast").show();

	$("#tableDiv").show();
	$("#fc1").show();
	$("#fc2").show();
	$("#fc3").show();
	$("#fc4").show();
	$("#fc5").show();
}

// Search For Weather Based On Value Input
function startSearch(){
	let searchQuery = ($("#searchText").val());

	showTables();
	getWeatherByCity(searchQuery);
	getForecastByCity(searchQuery);
}

/*-----------------------------------------------------------------------------------------------------*/

// Get Weather Based On City
function getWeatherByCity(query){
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

// Get Forecast Based On City
function getForecastByCity(query){
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + query + "&appid=" + APPID + "&units=metric&cnt=6";
	
	axios.get(url)
		.then((response) => {
			console.log(response);
			setForecast(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
}

// Get Location Through IP
function getLocation(){
	$.getJSON("http://ip-api.com/json", (data) =>{
		console.log(data);

		showTables();
		getWeatherByCity(data.city);
		getForecastByCity(data.city);
	});
}

/*-----------------------------------------------------------------------------------------------------*/

// Set all text according to data retrieved
function setText(data){
	$("#city").text(data.name + ", " + data.sys.country);
	$("#temp").html((data.main.temp).toFixed(1) + "&deg;C");
	$("#humidity").text(data.main.humidity + "%");
	$("#wind").text(data.wind.speed + " m/s");
	$("#desc").text(data.weather[0].description);
	$('#desc').css('textTransform', 'capitalize');

	convertToDirection(data);
	setImage(data, "#weathericon");
}

// Set all text according to data retrieved
function setForecast(data){

	var dateId = "#fc_date";
	var tempId = "#fc_temp";
	var imgId = "#fc_img";

	for (var i = 1; i < data.list.length; i++) {
		var count = i;
		var forecast = data.list[i];
		var date = new Date(forecast.dt*1000);

		$(dateId+count).text(date.toString("dd MMM"));
		$(tempId+count).html((forecast.temp.day).toFixed(1) + "&deg;C");
		setImage(forecast, imgId+count);
	}
}

/*-----------------------------------------------------------------------------------------------------*/

// Convert Degrees To Direction (N,E,S,W)
function convertToDirection(data){
	var degree = data.wind.deg;
	
	DirTable = ["N","NNE","NE","ENE","E","ESE", "SE","SSE","S","SSW","SW","WSW", "W","WNW","NW","NNW"]; 
	wind_direction= DirTable[Math.floor((degree+11.25)/22.5)];

	$("#direction").text(wind_direction);
}

/*-----------------------------------------------------------------------------------------------------*/

// Set Image based on forecast
function setImage(data, id){
	var code = data.weather[0].icon;

	switch(code){
		case "01d":
			$(id).attr("src", "img/sunny.png");
			break;
		case "01n":
			$(id).attr("src", "img/sunny_night.png");
			break;
		case "02d":
			$(id).attr("src", "img/cloudy2.png");
			break;
		case "02n":
			$(id).attr("src", "img/cloudy2_night.png");
			break;
		case "03d":
			$(id).attr("src", "img/cloudy5.png");
			break;
		case "03n":
			$(id).attr("src", "img/cloudy5.png");
			break;
		case "04d":
			$(id).attr("src", "img/overcast.png");
			break;
		case "04n":
			$(id).attr("src", "img/overcast.png");
			break;
		case "09d":
			$(id).attr("src", "img/shower3.png");
			break;
		case "09n":
			$(id).attr("src", "img/shower3.png");
			break;
		case "10d":
			$(id).attr("src", "img/shower2.png");
			break;
		case "10n":
			$(id).attr("src", "img/shower2_night.png");
			break;
		case "11d":
			$(id).attr("src", "img/tstorm2.png");
			break;
		case "11n":
			$(id).attr("src", "img/tstorm2_night.png");
			break;
		case "13d":
			$(id).attr("src", "img/snow5.png");
			break;
		case "13n":
			$(id).attr("src", "img/snow5.png");
			break;
		case "50d":
			$(id).attr("src", "img/fog.png");
			break;
		case "50n":
			$(id).attr("src", "img/fog_night.png");
			break;
		default:
			$(id).attr("src", "img/sunny.png");
			break;
	}
}

/*-----------------------------------------------------------------------------------------------------*/

