var searchCityButtonEl = document.querySelector("#searchCityButton");

var todayDate = moment().format("MM/DD/YYYY");





var getWeather = function(searchCity) {

    var searchCity = document.getElementById("searchCity").value;
    var todayEl = document.querySelector("#today");
    var todayWeatherEl = document.createElement("p");
    var cityNameEl = document.createElement("h1");

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=19a341d83d0899dcf97ab5d37d304335&units=imperial";

    // var weatherUrl = "https://api.openweathermap.org/data/3.0/onecall?q=" + searchCity + "&appid=19a341d83d0899dcf97ab5d37d304335&units=imperial";

    // var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?=" + searchCity + "&exclude=minutely&appid=19a341d83d0899dcf97ab5d37d304335&units=imperial";

    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then (function(data) {
        console.log(data);
        console.log(
            
            "Location: " + data.name + "\n",
            "Temp: " + data.main.temp + "\n",
            "Wind Speed: " + data.wind.speed + "\n",
            "Humidity: " + data.main.humidity + "\n",
            "Icon: " + data.weather[0].icon + "\n",
            
            // "Pressure: " + data.main.pressure + "\n",
            // "Feels Like: " + data.main.feels_like + "\n",
            // "Desc: " + data.weather[0].description + "\n",
            // "Icon: " + data.weather[0].icon + "\n",
            // "Main: " + data.weather[0].main + "\n",
            // "Wind Dir: " + data.wind.deg + "\n",            
            
            );

            cityNameEl.innerHTML = searchCity + " (" + todayDate + ") " + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' />";
            
            todayWeatherEl.innerHTML = "Temp: " + data.main.temp + "°" + "<br />" + "Wind: " + data.wind.speed + "mph" + "<br />" + "Humidity: " + data.main.humidity + "%" + "<br />" + "UV Index: ";
            todayWeatherEl.className = "today";
            
            todayEl.appendChild(cityNameEl);
            todayEl.appendChild(todayWeatherEl);
            

            // get data for 5-Day Forecast


    });

}


searchCityButtonEl.addEventListener("click", getWeather);