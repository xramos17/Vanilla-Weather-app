function formatDate(timeStamp) {
  let date = new Date(timeStamp);
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
  return `${day},${daynum} ${month} `;
}

function formatHour(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getminutes();
  if (minutes < 10) {
    minutes = `0${minutes} `;
  }

  return `${hours}:${minutes} `;
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
  document.querySelector("#date-hours").innerHTML = formatHour(
    response.data.dt * 1000
  );
  document.querySelector("#date-city").innerHTML = formatDate(
    response.data.dt * 1000
  );
}
let city = "Lisbon";
let apiKey = "1adcec3e50018a8b64c974c018ae3653";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentTemp);
