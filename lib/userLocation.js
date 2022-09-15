"use strict";

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

var _storage = _interopRequireDefault(require("./storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getUserLocation() {
  if (navigator.geolocation) {
    _pubsubJs["default"].publish("lookup-started");

    navigator.geolocation.getCurrentPosition( // if you get it successfully,
    function (locationData) {
      var coordinates = [locationData.coords.latitude, locationData.coords.longitude];

      _storage["default"].add(coordinates);

      _pubsubJs["default"].publish("location-data-acquired", coordinates);
    });
  }
} // On window load, get user location


_pubsubJs["default"].subscribe('no-data-found', getUserLocation);

window.addEventListener("load", _storage["default"].startStorage);