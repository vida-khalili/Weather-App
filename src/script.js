function showResult(response) {
  let currentCity = document.querySelector(".currentCity");
  currentCity.innerHTML = `${response.data.name}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  let defaultTemp = document.querySelector("#current-temp");
  defaultTemp.innerHTML = celsiusTemperature;
  let feels = document.querySelector("#feels");
  let feelsLike = Math.round(response.data.main.feels_like);
  feels.innerHTML = `Feels Like ${feelsLike}°`;
  let humid = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humid.innerHTML = `Humidity ${humidity}%`;
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind ${windSpeed} km/h`;
  let description = document.querySelector("#description");
  let mainDescription = response.data.weather[0].description;
  description.innerHTML = `${mainDescription}`;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `imgs/icons/icon_${response.data.weather[0].icon}.svg`
  );
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = Math.round(celsiusTemperature * 1.8 + 32);
  let defaultTemp = document.querySelector("#current-temp");
  defaultTemp.innerHTML = fahrenheit;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function displayCelsius(event) {
  event.preventDefault();
  let defaultTemp = document.querySelector("#current-temp");
  defaultTemp.innerHTML = celsiusTemperature;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function searchDefault(city) {
  let apiKey = "6c60fabe649d33c314498b8aba31de6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResult);
}

function searchPosition(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-text");
  let city = searchBox.value;
  searchDefault(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "6c60fabe649d33c314498b8aba31de6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResult);
}

function navigate() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentDate = document.querySelector("#current-date");
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchPosition);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchPosition);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", navigate);

let fahrenheitLink = document.querySelector("#unit-f");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#unit-c");
celsiusLink.addEventListener("click", displayCelsius);

searchDefault("Tehran");
