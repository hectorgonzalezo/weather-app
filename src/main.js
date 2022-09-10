import model from "./model";
import "./style.css";
import { capitalize } from 'lodash';
import { fahrenheitToCelsius, celsiusToFahrenheit } from './conversion';


const view = (function () {
  const title = document.querySelector("h1");
  const content = document.querySelectorAll("#current *");
  const forecastDivs = document.querySelectorAll(".another-day");

  function renderWeather(name, dataObj, fields = content, unit ='fahrenheit') {
    title.innerText = name;
    // get data values
    fields.forEach((field) => {
        const fieldType = field.classList.value;
        field.innerText = dataObj[fieldType];
        field.classList.add('active');
    });
  }

  function renderForecast(name, weatherList) {
    // Add a diferent forecast on each div at the bottom of page
    forecastDivs.forEach((div, i) => {
      const divContent = div.children;
      renderWeather(name, weatherList[i], [...divContent]);
    });
  }

  // Changes the temperature display from F to C, or viceversa
  function changeUnitTo(unit='fahrenheit'){
    const temperatures = document.querySelectorAll('.temp');
    if(unit === 'celsius'){
        temperatures.forEach((temperature) => {
            const previousValue = temperature.innerText;
            temperature.innerText = fahrenheitToCelsius(previousValue);
            temperature.classList.add('celsius');
            
        })
    } else {
        temperatures.forEach((temperature) => {
            const previousValue = temperature.innerText;
            temperature.innerText = celsiusToFahrenheit(previousValue)
            temperature.classList.remove('celsius');
        })
    }
  }
  return { renderWeather, renderForecast, changeUnitTo };
})();



const controller = (function () {
  const form = document.querySelector("form");
  const inputCity = document.querySelector("#input-city");
  const buttonSubmit = document.querySelector("form input[type=submit]");
  const toggleCF = document.querySelector("header input[type=checkbox");
  let unitType = 'fahrenheit';

  // After pressing submit, look weather and forecast of new city
  async function lookupNewCity(e) {
    if (form.checkValidity()) {
      e.preventDefault();
      const cityName = capitalize(inputCity.value);
      const weather = await model.getWeather(cityName).then((result) => result);
      const forecast = await model
        .getForecast(cityName)
        .then((result) => result);
      view.renderWeather(cityName, weather);
      view.renderForecast(cityName, forecast);
    }
  }

  function changeUnitType(){
    // Switches between celsius and fahrenheit
    if(unitType === 'celsius'){
        unitType = 'fahrenheit';
    } else {
        unitType = 'celsius'
    }
    view.changeUnitTo(unitType)
  }

  buttonSubmit.addEventListener("click", lookupNewCity);

  toggleCF.addEventListener('click', changeUnitType)

  // look for city when pressing enter/return
  inputCity.onkeydown = (e) => {
    if (e.keyCode === 13) {
      lookupNewCity(e);
    }
  };
})();
