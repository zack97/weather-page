const apiKey = "6f81c9766210b80a86fc741c7019d2e6";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const weatherIcone = document.querySelector(".weather-icon");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    let data = await response.json();

    let cite = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let humidity = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");

    cite.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcone.src = "./images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcone.src = "./images/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcone.src = "./images/drizzle.png";
    } else if (data.weather[0].main === "Humidity") {
      weatherIcone.src = "./images/hymidity.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcone.src = "./images/mist.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcone.src = "./images/rain.png";
    } else if (data.weather[0].main === "Search") {
      weatherIcone.src = "./images/search.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcone.src = "./images/snow.png";
    } else if (data.weather[0].main === "Wind") {
      weatherIcone.src = "./images/wind.png";
    }
    weather.style.display = "block";
    error.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const getImgData = async (city) => {
  // Fetch image URL using the Unsplash API
  const pictureUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=-xDbqbjONob5D_G8EjasuYzYks0IQxP-rvpQ9ubd6ko`;
  const response = await fetch(pictureUrl);
  if (!response.ok) {
    throw new Error("Could not fetch image URL");
  }
  const data = await response.json();
  console.log(data);
  const imageUrl = data.results[0].urls.regular;
  console.log(imageUrl);
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  return data;
};

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      await getImgData(city);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

// const apiKey = "6f81c9766210b80a86fc741c7019d2e6";
// const apiUrl =
//   "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const searchBox = document.querySelector(".search-input");
// const searchBtn = document.querySelector(".search-btn");
// const weather = document.querySelector(".weather");
// const weatherIcone = document.querySelector(".weather-icon");
// const error = document.querySelector(".error");

// async function checkWeather(city) {
//   const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

//   if (response.status == 404) {
//     error.style.display = "block";
//     weather.style.display = "none";
//   } else {
//     error.style.display = "none";
//     weather.style.display = "block";

//     const data = await response.json();
//     displayWeather(data);

//     // Fetch image from Unsplash API
//     try {
//       const imageData = await getImgData(city);
//       console.log(imageData);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// function displayWeather(data) {
//   const cityElement = document.querySelector(".city");
//   const tempElement = document.querySelector(".temp");
//   const humidityElement = document.querySelector(".humidity");
//   const windElement = document.querySelector(".wind");

//   cityElement.textContent = data.name;
//   tempElement.textContent = Math.round(data.main.temp) + "°c";
//   humidityElement.textContent = "Humidity: " + data.main.humidity + "%";
//   windElement.textContent = "Wind: " + data.wind.speed + "km/h";

//   // Set weather icon based on weather condition
//   const weatherCondition = data.weather[0].main.toLowerCase();
//   weatherIcone.src = `./images/${weatherCondition}.png`;

//   // Update temperature chart
//   updateTemperatureChart(data);
// }

// function updateTemperatureChart(data) {
//   const temperatureChartCanvas = document.getElementById("temperatureChart");
//   const temperatureData = {
//     labels: ["Now"],
//     datasets: [
//       {
//         label: "Temperature (°C)",
//         data: [data.main.temp],
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const temperatureChartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   new Chart(temperatureChartCanvas, {
//     type: "line",
//     data: temperatureData,
//     options: temperatureChartOptions,
//   });
// }

// async function getImgData(city) {
//   const unsplashApiKey = "GJ5n_jsHQ7bQwNcyCS2gZNqp2_jHPh6jFS1fQgb6028";
//   const pictureUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`;
//   const response = await fetch(pictureUrl);
//   if (!response.ok) {
//     throw new Error("Could not fetch image URL");
//   }
//   const data = await response.json();
//   if (data.results.length > 0) {
//     const imageUrl = data.results[0].urls.regular;
//     document.body.style.backgroundImage = `url(${imageUrl})`;
//     document.body.style.backgroundSize = "cover";
//     document.body.style.backgroundRepeat = "no-repeat";
//     document.body.style.backgroundPosition = "center";
//   }
//   return data;
// }

// searchBtn.addEventListener("click", () => {
//   const city = searchBox.value.trim();
//   if (city !== "") {
//     checkWeather(city);
//   }
// });

// // Optionally, you can also trigger the search on pressing Enter key
// searchBox.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     const city = searchBox.value.trim();
//     if (city !== "") {
//       checkWeather(city);
//     }
//   }
// });
