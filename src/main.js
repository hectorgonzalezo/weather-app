import "./style.css";
import PubSub from "pubsub-js";
import { capitalize } from "lodash";

import { view, model } from "./model";

const controller = (function () {
  const form = document.querySelector("form");
  const inputCity = document.querySelector("#input-city");
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

    view.renderWeather(weather);
    view.renderForecast(forecast);
    view.changeGIF(newGIF);
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

  // validates city input
  function validateInput() {
    view.removeNoCityMessage();
    view.removeInvalidMessage();
    inputCity.setCustomValidity("");
    inputCity.classList.remove("invalid");
    inputCity.checkValidity();
  }

  // If city input is invalid, show message
  inputCity.addEventListener("invalid", () => {
    inputCity.classList.add("invalid");
    inputCity.setCustomValidity("Please write a valid city name");
    view.showInvalidMessage();
  });


  toggleCF.addEventListener("click", changeUnitType);

  // Check on input wether the city is valid
  inputCity.addEventListener("input", validateInput);

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


document.querySelector('#clear').addEventListener('click', (e) => console.log('si'))