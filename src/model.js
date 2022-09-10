import { format } from "date-fns";

class WeatherData {
  static today = new Date(Date.now());

  // Gets JSON from API and gives it a format suitable to be used by view
  static formatWeather(originalJSON) {
    const target = {};
    // Selection of values
    target.day = format(this.unixToDate(originalJSON.dt), "E, d, MMMM, y");
    target.temp = originalJSON.main.temp;
    target.description = originalJSON.weather[0].description;
    target.feelsLike = originalJSON.main.feels_like;
    target.humidity = originalJSON.main.humidity;
    target.windSpeed = originalJSON.wind.speed;
    target.cloudiness = originalJSON.clouds.all;

    return target;
  }

  static formatForecast(originalJSONList) {
    // Make a set of days, so that they wont be repeated
    const fiveDaysList = originalJSONList.filter(
      (data) => {
        const dataDay =this.unixToDate(data.dt);
        // Filter if it's another instance of today's weather
        // and get only the midday forecast for each day at 11 AM
        return (dataDay.getDay() !== this.today.getDay()) &&
        (dataDay.getHours() === 11);
        }
    );
    const result = fiveDaysList.map((dayData) => this.formatWeather(dayData));
    return result
  }

  // Convert from unix Time to Date
  static unixToDate(unixTime) {
    return new Date(unixTime * 1000);
  }

}

const model = (function model() {
  async function callAPI(cityName = "London", type = "weather") {
    // call the openWeather api
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/${type}?q=${cityName}&appid=e2802a8fb9f851e53d09fe4eb9b16d38`,
      { mode: "cors" }
    );
    // if the request was successfull, return the data
    // otherwise display error message
    if (request.ok) {
      const data = await request.json();
      return data;
    }
    throw new Error("City not found");
  }

  // Extracts data from getWeather() for every argument
  async function getWeather(cityName) {
    // get all a selection of values and store them in dataObject
    const dataObject = await callAPI(cityName, "weather").then((data) =>
      WeatherData.formatWeather(data)
    );

    return dataObject;
  }

  // Gets forecast for the next numDays days
  async function getForecast(cityName) {
    const rawDataList = await callAPI(cityName, "forecast").then(
      (data) => data.list
    );
    // Extract selected data
    const dataList = WeatherData.formatForecast(rawDataList);

    return dataList;
  }

  return { getWeather, getForecast };
})();

export default model;
