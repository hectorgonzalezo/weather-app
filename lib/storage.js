"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// this function checks if there's storage available to implement persistence of todos.
var storage = function () {
  function storageAvailable(type) {
    var currentStorage;

    try {
      currentStorage = window[type];
      var x = "__currentStorage_test__";
      currentStorage.setItem(x, x);
      currentStorage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && ( // everything except Firefox
      e.code === 22 || // Firefox
      e.code === 1014 || // test name field too, because code might not be present
      // everything except Firefox
      e.name === "QuotaExceededError" || // Firefox
      e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
      currentStorage && currentStorage.length !== 0;
    }
  }

  var getAll = function getAll() {
    return JSON.parse(localStorage.getItem('preferences'));
  };

  function startStorage() {
    if (storageAvailable("localStorage")) {
      // if there's previous data on storage, display it
      if (localStorage.length > 0) {
        var storedData = getAll()[0];

        _pubsubJs["default"].publish("location-data-acquired", storedData);
      } else {
        // if there's no data, look for user location
        _pubsubJs["default"].publish("no-data-found");
      }
    }
  }

  function add() {
    for (var _len = arguments.length, location = new Array(_len), _key = 0; _key < _len; _key++) {
      location[_key] = arguments[_key];
    }

    var object = location; // convert object to string and save it in local storage

    localStorage.setItem('preferences', JSON.stringify(object));
  }

  function remove() {
    localStorage.removeItem('preferences');
  }

  function update(location) {
    add(location);
  }

  return {
    getAll: getAll,
    add: add,
    remove: remove,
    update: update,
    startStorage: startStorage
  };
}();

var _default = storage;
exports["default"] = _default;