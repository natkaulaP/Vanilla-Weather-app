function fetchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;

  let apiKey = "766e2bcb1a1d3e69f0f11aa9aa945ce4";
  let currentCity = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(fetchWeather);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", fetchCity);

function fetchWeather(response) {
  console.log(response.data.main.pressure);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}°C`;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${response.data.main.pressure} mb`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind speed ${wind} km/h`;
}
function locateUser(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "766e2bcb1a1d3e69f0f11aa9aa945ce4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(fetchWeather);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(locateUser);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
