var cityForm = document.querySelector("#city-form");

var cityVal = document.querySelector("#city");

var weatherContainer = document.querySelector("#current-weather");

var pastSearchButtonEl = document.querySelector("#past-search-buttons");

var cityLog = [];


var formSumbitHandler = function(event){
    event.preventDefault();

    var city = cityVal.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cityLog.unshift({city});
        cityVal.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}


var getCityWeather = function(city){
    var apiKey = "b13e7d82b3403d3d74e4fe8d2eaeb986"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
        displayWeather(data, city);
        });
    });
    
};

var citySearch = document.querySelector("#search-city");

var displayWeather = function(weather, searchCity){
   
   weatherContainer.textContent= "";  
   citySearch.textContent=searchCity;   
  

//    Elements for the card title
   var currentDate = document.createElement("span");
   var weatherIcon = document.createElement("img");


        currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        
    citySearch.appendChild(currentDate);    
    citySearch.appendChild(weatherIcon);

// Elements for the list

    var temp = document.createElement("span");
    var humidity = document.createElement("span");
    var wind = document.createElement("span");

   
        temp.textContent = "Temperature: " + weather.main.temp + " °F";
        temp.classList = "list-group-item"
        temp.style = "padding: 5px;"
   
        humidity.textContent = "Humidity: " + weather.main.humidity + " %";
        humidity.classList = "list-group-item"
        humidity.style = "padding: 5px;"
   
        wind.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
        wind.classList = "list-group-item"
        wind.style = "padding: 5px;"

   weatherContainer.appendChild(temp);
   weatherContainer.appendChild(humidity);
   weatherContainer.appendChild(wind);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon);
};

var getUvIndex = function(lat,lon){
    var apiKey = "b13e7d82b3403d3d74e4fe8d2eaeb986"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
        });
    });

}
 
var displayUvIndex = function(index){
    var Index = document.createElement("div");
    
    Index.textContent = "UV Index: "
    Index.classList = "list-group-item"
    Index.style = "padding: 10px; margin 5px;"

    var uvIndexVal = document.createElement("span")

    uvIndexVal.textContent = index.value

    Index.appendChild(uvIndexVal);
    weatherContainer.appendChild(Index);
}

var saveSearch = function(){
    localStorage.setItem("cityLog", JSON.stringify(cityLog));
};

var get5Day = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            setTimeout(() => {
                display5Day(data);
            }, 1000);
           
        });
    });
};

var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");


var display5Day = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
       
       var forecastEl = document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.style = "padding: 2px;"
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

var pastSearch = function(pastSearch){
 
    // console.log(pastSearch)

    var pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}


var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}



cityForm.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);


