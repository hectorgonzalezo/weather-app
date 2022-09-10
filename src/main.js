import "./style.css";
import PubSub from "pubsub-js";
import { capitalize } from "lodash";
import { fahrenheitToCelsius, celsiusToFahrenheit } from "./conversion";
import model from "./model";

const view = (function () {
  const title = document.querySelector("h1");
  const content = document.querySelectorAll("#current *");
  const forecastDivs = document.querySelectorAll(".another-day");
  const gif = document.querySelector('#gif')

  function renderWeather(dataObj, fields = content) {
    if (dataObj.name) {
      // Add name is there is one
      title.innerText = dataObj.name;
    }
    // get data values
    fields.forEach((field) => {
        field.classList.remove("active");
      const fieldType = field.classList.value;
      field.innerText = dataObj[fieldType];
      field.classList.add("active");
    });
  }

  function renderForecast(weatherList) {
    // Add a diferent forecast on each div at the bottom of page
    forecastDivs.forEach((div, i) => {
      const divContent = div.children;
      renderWeather(weatherList[i], [...divContent]);
    });
  }

  // Changes the temperature display from F to C, or viceversa
  function changeUnitTo(unit = "fahrenheit") {
    const temperatures = document.querySelectorAll(".temp, .feelsLike");
    if (unit === "celsius") {
      temperatures.forEach((temperature) => {
        const previousValue = temperature.innerText;
        temperature.innerText = fahrenheitToCelsius(previousValue);
        temperature.classList.add("celsius");
      });
    } else {
      temperatures.forEach((temperature) => {
        const previousValue = temperature.innerText;
        temperature.innerText = celsiusToFahrenheit(previousValue);
        temperature.classList.remove("celsius");
      });
    }
  }

  function changeGIF(gifUrl){
    gif.firstChild.remove()
    const newIMG = document.createElement('img')
    newIMG.src = gifUrl;
    gif.append(newIMG)
  }
  return { renderWeather, renderForecast, changeUnitTo, changeGIF};
})();

const controller = (function () {
  const form = document.querySelector("form");
  const inputCity = document.querySelector("#input-city");
  const buttonSubmit = document.querySelector("form input[type=submit]");
  const toggleCF = document.querySelector("header input[type=checkbox");
  let unitType = "fahrenheit";

  async function getDataFromModel(cityName, coordinates = []) {
    const weather = await model
      .getWeather(cityName, coordinates)
      .then((result) => result);
    const forecast = await model
      .getForecast(cityName, coordinates)
      .then((result) => result);
    const newGIF = await model.getGIF(weather.description);
    console.log(weather)

    view.renderWeather(weather);
    view.renderForecast(forecast);
    view.changeGIF(newGIF)
  }

  // After pressing submit, look weather and forecast of new city
  function lookupNewCity(e) {
    if (form.checkValidity()) {
      e.preventDefault();
      const cityName = capitalize(inputCity.value);
      getDataFromModel(cityName);
    }
  }

  function changeUnitType() {
    // Switches between celsius and fahrenheit
    if (unitType === "celsius") {
      unitType = "fahrenheit";
    } else {
      unitType = "celsius";
    }
    view.changeUnitTo(unitType);
  }

  buttonSubmit.addEventListener("click", lookupNewCity);

  toggleCF.addEventListener("click", changeUnitType);

  // look for city when pressing enter/return
  inputCity.onkeydown = (e) => {
    if (e.keyCode === 13) {
      lookupNewCity(e);
    }
  };

  PubSub.subscribe("location-data-acquired", (msg, coordinates) =>
    getDataFromModel("", coordinates)
  );
})();
