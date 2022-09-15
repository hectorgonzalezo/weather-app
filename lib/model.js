"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.model = void 0;
Object.defineProperty(exports, "view", {
  enumerable: true,
  get: function get() {
    return _view["default"];
  }
});

require("./userLocation");

var _dateFns = require("date-fns");

var _lodash = require("lodash");

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WeatherData = /*#__PURE__*/function () {
  function WeatherData() {
    _classCallCheck(this, WeatherData);
  }

  _createClass(WeatherData, null, [{
    key: "formatWeather",
    value: // Gets JSON from API and gives it a format suitable to be used by view
    function formatWeather(originalJSON) {
      var target = {}; // Selection of values

      target.day = (0, _dateFns.format)(this.unixToDate(originalJSON.dt), "E, d MMMM");
      target.temp = (0, _lodash.round)(originalJSON.main.temp);
      target.description = originalJSON.weather[0].description;
      target.feelsLike = (0, _lodash.round)(originalJSON.main.feels_like);
      target.humidity = originalJSON.main.humidity;
      target.windSpeed = originalJSON.wind.speed;
      target.cloudiness = originalJSON.clouds.all;
      target.name = originalJSON.name;
      target.icon = originalJSON.weather[0].icon;
      return target;
    }
  }, {
    key: "formatForecast",
    value: function formatForecast(originalJSONList) {
      var _this = this;

      // Make a set of days, so that they wont be repeated
      var fiveDaysList = originalJSONList.filter(function (data) {
        var dataDay = _this.unixToDate(data.dt); // Filter if it's another instance of today's weather
        // and get only the midday forecast for each day at 3 PM.


        return dataDay.getDay() !== _this.today.getDay() && dataDay.getHours() === 20;
      });
      var result = fiveDaysList.map(function (dayData) {
        return _this.formatWeather(dayData);
      });
      return result;
    } // Convert from unix Time to Date

  }, {
    key: "unixToDate",
    value: function unixToDate(unixTime) {
      return new Date(unixTime * 1000);
    }
  }]);

  return WeatherData;
}();

_defineProperty(WeatherData, "today", new Date());

var OpenWeatherWrapper = /*#__PURE__*/function () {
  function OpenWeatherWrapper(cityName, type) {
    _classCallCheck(this, OpenWeatherWrapper);

    this.cityName = cityName;
    this.type = type;
  } // This is the factory method.
  // Selects a class depending on wether there were coordinates in the original call


  _createClass(OpenWeatherWrapper, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var request;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("https://api.openweathermap.org/data/2.5/".concat(this.type, "?q=").concat(this.cityName, "&units=imperial&appid=e2802a8fb9f851e53d09fe4eb9b16d38"), {
                  mode: "cors"
                });

              case 2:
                request = _context.sent;
                return _context.abrupt("return", request);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }], [{
    key: "getData",
    value: function getData(cityName, type) {
      var coords = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (coords.length !== 2) {
        var _data = new OpenWeatherWrapper(cityName, type).getData();

        return _data;
      }

      var data = new OpenWeatherWrapperCoord(cityName, type, coords).getData();
      return data;
    }
  }]);

  return OpenWeatherWrapper;
}(); // This class uses coordinates instead of cityName


var OpenWeatherWrapperCoord = /*#__PURE__*/function (_OpenWeatherWrapper) {
  _inherits(OpenWeatherWrapperCoord, _OpenWeatherWrapper);

  var _super = _createSuper(OpenWeatherWrapperCoord);

  function OpenWeatherWrapperCoord(cityName, type, coords) {
    var _this2;

    _classCallCheck(this, OpenWeatherWrapperCoord);

    _this2 = _super.call(this, cityName, type);

    var _coords = _slicedToArray(coords, 2);

    _this2.latitude = _coords[0];
    _this2.longitude = _coords[1];
    return _this2;
  }

  _createClass(OpenWeatherWrapperCoord, [{
    key: "getData",
    value: function () {
      var _getData2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var request;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch("https://api.openweathermap.org/data/2.5/".concat(this.type, "?lat=").concat(this.latitude, "&lon=").concat(this.longitude, "&units=imperial&appid=e2802a8fb9f851e53d09fe4eb9b16d38"), {
                  mode: "cors"
                });

              case 2:
                request = _context2.sent;
                return _context2.abrupt("return", request);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getData() {
        return _getData2.apply(this, arguments);
      }

      return getData;
    }()
  }]);

  return OpenWeatherWrapperCoord;
}(OpenWeatherWrapper);

var model = function model() {
  // Add memoization
  // prevents API calls if data is stored in memory
  var cache = {}; // You can use cityName or an array of coordinates [latitude, longitude] to search

  function callWeatherAPI() {
    return _callWeatherAPI.apply(this, arguments);
  } // Extracts data from getWeather() for every argument


  function _callWeatherAPI() {
    _callWeatherAPI = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var cityName,
          type,
          coords,
          request,
          data,
          _args3 = arguments;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cityName = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : "London";
              type = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : "weather";
              coords = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : [];
              _context3.next = 5;
              return OpenWeatherWrapper.getData(cityName, type, coords);

            case 5:
              request = _context3.sent;

              if (!request.ok) {
                _context3.next = 11;
                break;
              }

              _context3.next = 9;
              return request.json();

            case 9:
              data = _context3.sent;
              return _context3.abrupt("return", data);

            case 11:
              // If it didn't find such city
              _view["default"].showNoCityMessage();

              throw new Error("City not found");

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _callWeatherAPI.apply(this, arguments);
  }

  function getWeather(_x, _x2) {
    return _getWeather.apply(this, arguments);
  } // Gets forecast for the next numDays days


  function _getWeather() {
    _getWeather = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(cityName, coords) {
      var dataObject;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!cache["".concat((0, _lodash.capitalize)(cityName), "Weather")]) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", cache["".concat((0, _lodash.capitalize)(cityName), "Weather")]);

            case 2:
              _context4.next = 4;
              return callWeatherAPI(cityName, "weather", coords).then(function (data) {
                return WeatherData.formatWeather(data);
              });

            case 4:
              dataObject = _context4.sent;
              // Add it to cache
              cache["".concat((0, _lodash.capitalize)(cityName), "Weather")] = dataObject;
              return _context4.abrupt("return", dataObject);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _getWeather.apply(this, arguments);
  }

  function getForecast(_x3, _x4) {
    return _getForecast.apply(this, arguments);
  }

  function _getForecast() {
    _getForecast = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(cityName, coords) {
      var rawDataList, dataList;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!cache["".concat(cityName, "Forecast")]) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", cache["".concat(cityName, "Forecast")]);

            case 2:
              _context5.next = 4;
              return callWeatherAPI(cityName, "forecast", coords).then(function (data) {
                return data.list;
              });

            case 4:
              rawDataList = _context5.sent;
              // Extract selected data
              dataList = WeatherData.formatForecast(rawDataList);
              cache["".concat(cityName, "Forecast")] = dataList;
              return _context5.abrupt("return", dataList);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _getForecast.apply(this, arguments);
  }

  function getGIF(_x5) {
    return _getGIF.apply(this, arguments);
  }

  function _getGIF() {
    _getGIF = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(query) {
      var imageURL;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return fetch("https://api.giphy.com/v1/gifs/translate?api_key=aup9fsKJyXywzXoxQ071oFLBJW7ol2ld&s=".concat(query, "&weirdness=1"), {
                mode: "cors"
              }).then(function (response) {
                return response.json();
              }).then(function (response) {
                return response.data.images.original.url;
              }) // if no image is found
              ["catch"](function () {
                return getGIF("error");
              });

            case 2:
              imageURL = _context6.sent;
              return _context6.abrupt("return", imageURL);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _getGIF.apply(this, arguments);
  }

  return {
    getWeather: getWeather,
    getForecast: getForecast,
    getGIF: getGIF
  };
}();

exports.model = model;