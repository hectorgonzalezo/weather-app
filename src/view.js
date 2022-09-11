import { fahrenheitToCelsius, celsiusToFahrenheit } from "./conversion";

const view = (function () {
  const title = document.querySelector("h1");
  const content = document.querySelectorAll("#current *");
  const forecastDivs = document.querySelectorAll(".another-day");
  const gif = document.querySelector("#gif");
  const invalidDisplay = document.querySelector("span");

  function renderWeather(dataObj, fields = content) {
    if (dataObj.name) {
      // Add name is there is one
      title.innerText = dataObj.name;
    }
    // get data values
    fields.forEach((field) => {
      field.classList.remove("active");
      if (field.classList.contains("celsius")) {
        // convert to celsius if selected
        field.innerText = fahrenheitToCelsius(dataObj.temp);
      } else {
        const fieldType = field.classList.value;
        field.innerText = dataObj[fieldType];
      }
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
    // It only works if the fields are empty
    if (temperatures[0].innerText !== "") {
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
  }

  function changeGIF(gifUrl) {
    if (gif.firstChild) {
      gif.firstChild.remove();
    }
    const newIMG = document.createElement("img");
    newIMG.src = gifUrl;
    gif.append(newIMG);
  }

  function showInvalidMessage() {
    invalidDisplay.classList.add("invalid");
  }

  function removeInvalidMessage() {
    invalidDisplay.classList.remove("invalid");
  }

  function showNoCityMessage() {
    // toggle between writing the message and clearing it
    invalidDisplay.classList.add("no-city");
  }

  function removeNoCityMessage() {
    invalidDisplay.classList.remove("no-city");
  }
  return {
    renderWeather,
    renderForecast,
    changeUnitTo,
    changeGIF,
    showInvalidMessage,
    removeInvalidMessage,
    showNoCityMessage,
    removeNoCityMessage,
  };
})();

export default view;
