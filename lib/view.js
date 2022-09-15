"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

var _conversion = require("./conversion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var view = function () {
  var title = document.querySelector("h1");
  var content = document.querySelectorAll("#current *");
  var forecastDivs = document.querySelectorAll(".another-day");
  var gif = document.querySelector("#gif");
  var invalidDisplay = document.querySelector("span");
  var displayers = document.querySelectorAll("#current, .another-day");
  var forecastTitle = document.querySelector("#forecast-title");

  function renderWeather(dataObj) {
    var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : content;

    if (dataObj.name) {
      // Add name is there is one
      title.innerText = dataObj.name;
    } // get data values


    fields.forEach(function (field) {
      field.classList.remove("active");

      if (field.classList.contains("celsius")) {
        // convert to celsius if selected
        field.innerText = (0, _conversion.fahrenheitToCelsius)(dataObj.temp);
      } else if (field.tagName === 'IMG') {
        field.src = "https://openweathermap.org/img/wn/".concat(dataObj.icon, "@2x.png");
      } else {
        var fieldType = field.classList.value;
        field.innerText = dataObj[fieldType];
      }

      field.classList.add("active");
    });
  }

  function renderForecast(weatherList) {
    // Add a diferent forecast on each div at the bottom of page
    forecastDivs.forEach(function (div, i) {
      var divContent = div.children;
      renderWeather(weatherList[i], _toConsumableArray(divContent));
    });
  }

  function changeUnits(temperatures, callback) {
    temperatures.forEach(function (temperature) {
      var previousValue = temperature.innerText;

      if (temperature.innerText !== "") {
        temperature.innerText = callback(previousValue);
      }

      temperature.classList.toggle("celsius");
    });
  } // Changes the temperature display from F to C, or viceversa


  function changeUnitTo() {
    var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "fahrenheit";
    var temperatures = document.querySelectorAll(".temp, .feelsLike"); // It only works if the fields are empty

    if (unit === "celsius") {
      changeUnits(temperatures, _conversion.fahrenheitToCelsius);
    } else {
      changeUnits(temperatures, _conversion.celsiusToFahrenheit);
    }
  }

  function changeGIF(gifUrl) {
    if (gif.firstChild) {
      gif.firstChild.remove();
    }

    var newIMG = document.createElement("img");
    newIMG.src = gifUrl;
    gif.append(newIMG);
  }

  function showForecastTitle() {
    if (forecastTitle.classList.contains("invisible")) {
      forecastTitle.classList.remove("invisible");
    }
  } // A displayers is one of (#current || .another-day)


  function showDisplayersLoading() {
    // show or hide toggle animation
    displayers.forEach(function (displayer) {
      // remove everything from field inside displayer
      _toConsumableArray(displayer.children).forEach(function (field) {
        field.innerText = "";
        field.src = '';
        field.classList.remove("active");
      });

      displayer.classList.add("loading");
      displayer.classList.add("active");
    });
    showForecastTitle();
  }

  function hideDisplayersLoading() {
    // show or hide toggle animation
    displayers.forEach(function (displayer) {
      displayer.classList.remove("loading");
    });
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

  _pubsubJs["default"].subscribe("lookup-started", showDisplayersLoading);

  _pubsubJs["default"].subscribe("lookup-finished", hideDisplayersLoading);

  return {
    renderWeather: renderWeather,
    renderForecast: renderForecast,
    changeUnitTo: changeUnitTo,
    changeGIF: changeGIF,
    showInvalidMessage: showInvalidMessage,
    removeInvalidMessage: removeInvalidMessage,
    showNoCityMessage: showNoCityMessage,
    removeNoCityMessage: removeNoCityMessage
  };
}();

var _default = view;
exports["default"] = _default;