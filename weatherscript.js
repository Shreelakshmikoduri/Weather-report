
document.getElementById('getWeatherButton').addEventListener('click', function() {
  const city = document.getElementById('city').value;
  const loadingMessage = document.getElementById('loading');
  const weatherDetails = document.getElementById('weatherDetails');

  // Clear previous weather details
  weatherDetails.innerHTML = '';

  // Show the loading message
  loadingMessage.style.display = 'block';
  
  // Hide the weather details while loading
  weatherDetails.style.display = 'none';

  // Fetch the weather data
  getWeather(city)
      .then(data => {
          loadingMessage.style.display = 'none'; // Hide loading message after getting data
          weatherDetails.style.display = 'flex'; // Use flex for side-by-side layout
          displayWeather(data);
      })
      .catch(error => {
          loadingMessage.style.display = 'none'; // Hide loading message in case of error
          weatherDetails.style.display = 'none'; // Hide weather details
          alert('Error fetching weather data: ' + error);
      });
});

function getWeather(city) {
  const apiKey = "3c9ac1642b26520b064b86f24bc5171a"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  return fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.cod !== 200) {
              throw new Error('City not found');
          }
          return data;
      });
}

function displayWeather(data) {
  const weatherDetails = document.getElementById('weatherDetails');
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure;
  const visibility = data.visibility;
  const country = data.sys.country;

  // Display weather image and climate info side by side with small icons
  weatherDetails.innerHTML = `
      <div class="weather-image">
          <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather Icon">
      </div>
      <div class="weather-info">
          <h3>${data.name}, ${country}</h3>
          <p><img src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png" class="info-icon" alt="Temperature"> <strong>Temperature:</strong> ${temp}°C</p>
          <p><img src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png" class="info-icon" alt="Condition"> <strong>Condition:</strong> ${description}</p>
          <p><img src="https://cdn-icons-png.flaticon.com/512/414/414927.png" class="info-icon" alt="Humidity"> <strong>Humidity:</strong> ${humidity}%</p>
          <p><img src="wind.png" class="info-icon" alt="Wind Speed"> <strong>Wind Speed:</strong> ${windSpeed} m/s</p>
          <p><img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" class="info-icon" alt="Pressure"> <strong>Pressure:</strong> ${pressure} hPa</p>
          <p><img src="https://cdn-icons-png.flaticon.com/512/826/826964.png" class="info-icon" alt="Visibility"> <strong>Visibility:</strong> ${visibility} meters</p>
      </div>
  `;
}
