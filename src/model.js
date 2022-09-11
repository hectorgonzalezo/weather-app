import "./userLocation";
import { format } from "date-fns";
import { round } from "lodash";
import view from "./view";

class WeatherData {
  static today = new Date();

  // Gets JSON from API and gives it a format suitable to be used by view
  static formatWeather(originalJSON) {
    const target = {};
    // Selection of values
    target.day = format(this.unixToDate(originalJSON.dt), "E, d MMMM");
    target.temp = round(originalJSON.main.temp);
    target.description = originalJSON.weather[0].description;
    target.feelsLike = round(originalJSON.main.feels_like);
    target.humidity = originalJSON.main.humidity;
    target.windSpeed = originalJSON.wind.speed;
    target.cloudiness = originalJSON.clouds.all;
    target.name = originalJSON.name;

    return target;
  }

  static formatForecast(originalJSONList) {
    // Make a set of days, so that they wont be repeated
    const fiveDaysList = originalJSONList.filter((data) => {
      const dataDay = this.unixToDate(data.dt);
      // Filter if it's another instance of today's weather
      // and get only the midday forecast for each day at 3 PM.
      return (
        dataDay.getDay() !== this.today.getDay() && dataDay.getHours() === 20
      );
    });
    const result = fiveDaysList.map((dayData) => this.formatWeather(dayData));
    return result;
  }

  // Convert from unix Time to Date
  static unixToDate(unixTime) {
    return new Date(unixTime * 1000);
  }
}

const model = (function model() {
  // You can use cityName or an array of coordinates [latitude, longitude] to search
  async function callWeatherAPI(
    cityName = "London",
    type = "weather",
    coords = []
  ) {
    let request;
    if (coords.length !== 2) {
      // If there are no coordinates, look for cityName
      request = await fetch(
        `https://api.openweathermap.org/data/2.5/${type}?q=${cityName}&units=imperial&appid=e2802a8fb9f851e53d09fe4eb9b16d38`,
        { mode: "cors" }
      );
    } else {
      // Otherwise, look for coordinates
      const latitude = coords[0];
      const longitude = coords[1];
      request = await fetch(
        `https://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&units=imperial&appid=e2802a8fb9f851e53d09fe4eb9b16d38`,
        { mode: "cors" }
      );
    }
    // if the request was successfull, return the data
    // otherwise display error message
    if (request.ok) {
      const data = await request.json();
      console.log(data);
      return data;
    }

    // If it didn't find such city
    view.showNoCityMessage();
    throw new Error("City not found");
  }

  // Extracts data from getWeather() for every argument
  async function getWeather(cityName, coords) {
    // get all a selection of values and store them in dataObject
    const dataObject = await callWeatherAPI(cityName, "weather", coords).then(
      (data) => WeatherData.formatWeather(data)
    );

    return dataObject;
  }

  // Gets forecast for the next numDays days
  async function getForecast(cityName, coords) {
    const rawDataList = await callWeatherAPI(cityName, "forecast", coords).then(
      (data) => data.list
    );
    // Extract selected data
    const dataList = WeatherData.formatForecast(rawDataList);

    return dataList;
  }

  async function getGIF(query) {
    const imageURL = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=aup9fsKJyXywzXoxQ071oFLBJW7ol2ld&s=${query}&weirdness=1`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => response.data.images.original.url)
      // if no image is found
      .catch(() => getGIF("error"));
    return imageURL;
  }

  return { getWeather, getForecast, getGIF };
})();

export { view, model };
