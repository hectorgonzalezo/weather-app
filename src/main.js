import model from "./model";
import "./style.css";

// model.getWeather().then((result) => console.log(result));
// model.getForecast().then((result) => console.log(result));

const view = (function () {
  const title = document.querySelector("h1");
  const content = document.querySelectorAll("#current p");
  const forecastDivs = document.querySelectorAll(".another-day");

  function renderWeather(name, dataObj, fields = content) {
    title.innerText = name;
    // get data values
    const dataList = Object.values(dataObj);

    fields.forEach((field, i) => {
      field.innerText = dataList[i];
    });
  }

  function renderForecast(name, weatherList) {
    // Add a diferent forecast on each div at the bottom of page
    forecastDivs.forEach((div, i) => {
      const divContent = div.children;
      renderWeather(name, weatherList[i], [...divContent]);
    });
  }
  return { renderWeather, renderForecast };
})();

const controller = (function () {
  const form = document.querySelector("form");
  const inputCity = document.querySelector("#input-city");
  const buttonSubmit = document.querySelector("form input[type=submit]");

  // After pressing submit, look weather and forecast of new city
  async function lookupNewCity(e) {
    if (form.checkValidity()) {
      e.preventDefault();
      const cityName = inputCity.value;
      const weather = await model.getWeather(cityName).then((result) => result);
      const forecast = await model
        .getForecast(cityName)
        .then((result) => result);
      //
      view.renderWeather(cityName, weather);
      view.renderForecast(cityName, forecast);
    }
  }

  buttonSubmit.addEventListener("click", lookupNewCity);

  // look for city when pressing enter/return
  inputCity.onkeydown = (e) => {
    if (e.keyCode === 13) {
      lookupNewCity(e);
    }
  };
})();
