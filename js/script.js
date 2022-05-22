var searchCityButtonEl = document.querySelector("#searchCityButton");

var todayDate = moment().format("MM/DD/YYYY");



var getCity = function(searchCity) {
    
    var searchCity = document.getElementById("searchCity").value;

    var searchCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "&appid=19a341d83d0899dcf97ab5d37d304335";
    
    fetch(searchCityUrl)
    .then(function (response) {
        return response.json();
    })
    .then (function(data) {
        console.log(data);
        console.log(
            
            "Location: " + data[0].name + "\n",
            "Lat: " + data[0].lat + "\n",
            "Lon: " + data[0].lon + "\n",
            "State: " + data[0].state + "\n",
            
            );

            var loc = data[0].name;
            var lat = data[0].lat;
            var lon = data[0].lon;
            
    getWeather(loc, lat, lon);
    });
    
}



var getWeather = function(loc, lat, lon) {

    var searchCity = document.getElementById("searchCity").value;
    var todayEl = document.querySelector("#today");
    var todayWeatherEl = document.createElement("span");
    var dailyHeadingEl = document.createElement("span");
    var dailyWeatherEl = document.createElement("span");
    
    var cityNameEl = document.createElement("h1");
    
    var location = loc;

    var i = 0;

    todayEl.textContent = "";

    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=19a341d83d0899dcf97ab5d37d304335&units=imperial";

    // var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=19a341d83d0899dcf97ab5d37d304335&units=imperial";

    // var weatherUrl = "https://api.openweathermap.org/data/3.0/onecall?q=" + searchCity + "&appid=19a341d83d0899dcf97ab5d37d304335&units=imperial";

    // var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?=" + searchCity + "&exclude=minutely&appid=19a341d83d0899dcf97ab5d37d304335&units=imperial";

    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then (function(data) {
        console.log(data);

            cityNameEl.innerHTML = location + " (" + todayDate + ") " + "<img src='http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' />";
            
            todayWeatherEl.innerHTML = "Temp: " + data.current.temp + "°" + 
            "<br />" + "Wind: " + data.current.wind_speed + "mph" + 
            "<br />" + "Humidity: " + data.current.humidity + "%" + 
            "<br />" + "UV Index: " + data.current.uvi + 
            "<br />" + "Conditions: " + data.current.weather[0].description;

            //todayWeatherEl.className = "today";
            
            todayEl.appendChild(cityNameEl);
            todayEl.appendChild(todayWeatherEl);
            

            // get data for 5-Day Forecast
            //moment(todayDate, "MM/DD/YYYY").add(1, "days");

            for (i=0; i < 5; i++) {
                //alert("i: " + i);
                forecastDate = moment(todayDate,"MM/DD/YYYY").add((i+1), "days");
                forecastDate = moment(forecastDate).format("MM/DD/YYYY");
                //alert("i: " + i + "\n" + forecastDate);

                dailyHeadingEl.innerHTML = forecastDate + "<br />";
                //alert("dailyHeadingEl: " + dailyHeadingEl.textContent);
                
                dailyWeatherEl.innerHTML = "Temp: " + data.daily[i].temp.day + "°" + 
                "<br />" + "Wind: " + data.daily[i].wind_speed + "mph" + 
                "<br />" + "Humidity: " + data.daily[i].humidity + "%" + 
                "<br />" + "UV Index: " + data.daily[i].uvi + 
                "<br />" + "Conditions: " + data.daily[i].weather[0].description;
                //alert("dailyWeatherEl: " + dailyWeatherEl.textContent);

                var weatherDay = (i+1);
                displayData(weatherDay,dailyHeadingEl,dailyWeatherEl);

            }
    });

}


var displayData = function(weatherDay, dailyHeadingEl, dailyWeatherEl) {
    var dayOneEl = document.querySelector("#dayOne");
    var dayTwoEl = document.querySelector("#dayTwo");
    var dayThreeEl = document.querySelector("#dayThree");
    var dayFourEl = document.querySelector("#dayFour");
    var dayFiveEl = document.querySelector("#dayFive");

    alert("day: " + weatherDay);
    alert("heading: " + dailyHeadingEl.textContent);
    alert("weather: " + dailyWeatherEl.textContent);

    switch(weatherDay) {

        case 1:
            dayOneEl.appendChild(dailyHeadingEl);
            dayOneEl.appendChild(dailyWeatherEl);
            break;
        
        case 2:
            dayTwoEl.appendChild(dailyHeadingEl);
            dayTwoEl.appendChild(dailyWeatherEl);
            break;

        case 3:
            dayThreeEl.appendChild(dailyHeadingEl);
            dayThreeEl.appendChild(dailyWeatherEl);
            break;

        case 4:
            dayFourEl.appendChild(dailyHeadingEl);
            dayFourEl.appendChild(dailyWeatherEl);
            break;

        case 5:
            dayFiveEl.appendChild(dailyHeadingEl);
            dayFiveEl.appendChild(dailyWeatherEl);
            break;
    }
}


searchCityButtonEl.addEventListener("click", getCity);