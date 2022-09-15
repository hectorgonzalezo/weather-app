"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.celsiusToFahrenheit = celsiusToFahrenheit;
exports.fahrenheitToCelsius = fahrenheitToCelsius;

var _lodash = require("lodash");

function celsiusToFahrenheit(temp) {
  return (0, _lodash.round)(temp * (9 / 5) + 32);
}

function fahrenheitToCelsius(temp) {
  return (0, _lodash.round)((temp - 32) * (5 / 9));
}