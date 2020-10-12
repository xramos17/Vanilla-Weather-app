let now = new Date();
console.log(now);

//DATE WITH DAY MONTH AND DAY OF THE WEEK
function formatDate(date) {
  let daynum = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let currentDate = document.querySelector("#date-city");

  currentDate.innerHTML = `${day} ${daynum},  ${month}`;
  return currentDate;
}
console.log(formatDate(now));

//🕵️‍♀️TIME

function formatHour(time) {
  let hours = time.getHours();
  if (hours > 10) {
    hours = ` ${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes} `;
  }
  let currentHour = document.querySelector("#date-hours");

  currentHour.innerHTML = `${hours}:${minutes}`;

  return currentHour;
}
console.log(formatHour(now));

//FORCASTIME🌤

function formatNextHour(timestamp){
  let hours = time.getHours();
  if (hours > 10) {
    hours = ` ${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes} `;
  }
  return `${hours}:${minutes}`;

}

function displayCurrentTemp(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#w-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#w-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#w-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#w-country").innerHTML = response.data.sys.country;

  document
    .querySelector("#w-icon")
    .setAttribute("alt", response.data.weather[0].description);
  document
    .querySelector("#w-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemp = Math.round(response.data.main.temp);
}


function displayForecast(response){
let forecastElement = document.querySelector("#forecast")
forecastElement.innerHTML = null; 
let forecast= null; 

for(let index = 0; index > 6 ; index++ ){
  let forecast = response.data.list[index];
  forecastElement.innerHTML += `
<div class ="col-2">
              <h3>${formatNextHour(forecast.dt * 1000)}</h3>
              <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(forecast.main.temp_max)}º</strong>${Math.round(forecast.main.temp_min)}º
              </div>
            </div> `
}};

//API'S AND KEYS 💈

function search(city) {
  let apiKey = "1adcec3e50018a8b64c974c018ae3653";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentTemp);

 apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast);
}

//FORM INPUT💈

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#text-city-input");
  search(cityInput.value);
}


//FAHRENHEIT & CELSIUS 💈

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureFahrenheit = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#current-temp").innerHTML = Math.round(
    temperatureFahrenheit
  );
}

function convertCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = celsiusTemp;
}

let celsiusTemp = null;

//FORM AND SEARCH ENGINE 💈

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);


//DEFAULT CITY🇮🇸
search("Reykjavik");


