var apiKey = "&appid=686bd4df5b28f74a8ccbdd4feea3d8e3"

var cityEl = document.querySelector("#city")

var cityContainer = document.querySelector("#weather-form")

var localStorage = document.querySelector("#local-storage")

var currentWeather = document.querySelector("#current-weather")

var forecast = document.querySelector("#forecast")


var submitCity = function(event) {
    event.preventDefault ();

    var searchBar = cityEl.value.trim ();

    if (searchBar) {
        
    }

}

fetch('http://api.openweathermap.org/data/2.5/forecast?q=cleveland&appid=686bd4df5b28f74a8ccbdd4feea3d8e3')
.then(response => {
    return response.json();
})
.then(weather => {
    console.log(weather.temp);

});
