function fetchTime() {
  let date = new Date();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Satday",
  ];
  let day = days[date.getDay()];
  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = `${day} ${hour}:${minutes}`;
  
  
}
fetchTime();

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
  let city = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let temp = document.querySelector("#temp");
  let pressure = document.querySelector("#pressure");
  let humidity = document.querySelector("#humidity");
   let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  let date = document.querySelector("#date-and-time");
 let icon =document.querySelector("#w-icon");

 let icons = response.data.weather[0].icon;
celsiusTemp =response.data.main.temp;
 temp.innerHTML = `${temperature}`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  pressure.innerHTML = `Pressure: ${response.data.main.pressure} mb`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
windSpeed.innerHTML = `Wind speed: ${wind} km/h`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icons}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  
}

function locateUser(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "766e2bcb1a1d3e69f0f11aa9aa945ce4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(fetchWeather);
}

function fetchFahrenheit(event){
  event.preventDefault();
let temp = document.querySelector("#temp");
let fahrenheitTemp = (celsiusTemp * 9)/5+32;
temp.innerHTML = Math.round(fahrenheitTemp);
celsius.classList.remove("active");
fahrenheit.classList.add("active");
}


function fetchCelsius(event){
  event.preventDefault();
let temp = document.querySelector("#temp");
celsius.classList.add("active");
fahrenheit.classList.remove("active");
temp.innerHTML = Math.round(celsiusTemp)
}




function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(locateUser);
}
let celsiusTemp=null;

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
  


let fahrenheitLink = document.querySelector("#fahrenheit")
fahrenheitLink.addEventListener("click", fetchFahrenheit)

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", fetchCelsius)