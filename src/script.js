function showResult(response) {
  let currentCity = document.querySelector(".currentCity");
  currentCity.innerHTML = `${response.data.name}`;
  let currentTemp = response.data.main.temp;
  currentTemp = Math.round(currentTemp);
  let defaultTemp = document.querySelector("#current-temp");
  defaultTemp.innerHTML = `${currentTemp}°`;
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

// Task
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchPosition);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchPosition);

// //Bonus Feature
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", navigate);

searchDefault("Tehran");
