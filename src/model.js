import "./userLocation";
import { format } from "date-fns";
import { round, capitalize } from "lodash";
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
    target.icon = originalJSON.weather[0].icon;

    return target;
  }

  static async formatForecast(originalJSONList) {
    // Make a set of days, so that they wont be repeated
    const fiveDaysList = await originalJSONList.filter((data) => {
      const dataDay = this.unixToDate(data.dt);
      // Filter if it's another instance of today's weather
      // and get only the midday forecast for each day at 3 PM.
      return (
        dataDay.getDay() !== this.today.getDay() && dataDay.getHours() === 20
      );
    });
    const result = await fiveDaysList.map((dayData) => this.formatWeather(dayData));
    return result;
  }

  // Convert from unix Time to Date
  static unixToDate(unixTime) {
    return new Date(unixTime * 1000);
  }
}

class OpenWeatherWrapper {


    constructor(cityName, type){
        this.cityName = cityName;
        this.type = type;
    }

    // This is the factory method.
    // Selects a class depending on wether there were coordinates in the original call
    static getData(cityName, type, coords = ''){
        if (coords.length !== 2) {
          const data = new OpenWeatherWrapper(cityName, type).getData();
          return data;
        }

        const data = new OpenWeatherWrapperCoord(
          cityName,
          type,
          coords
        ).getData();
        return data;
    }

    async getData(){
        const request =await fetch(
            `https://api.openweathermap.org/data/2.5/${this.type}?q=${this.cityName}&units=imperial&appid=e2802a8fb9f851e53d09fe4eb9b16d38`,
            { mode: "cors" }
          );
        return request
    }
}

// This class uses coordinates instead of cityName
class OpenWeatherWrapperCoord extends OpenWeatherWrapper{
    constructor(cityName, type, coords){
        super(cityName, type);
        [this.latitude, this.longitude] = coords;
    }

    async getData(){
        const request =await fetch(
            `https://api.openweathermap.org/data/2.5/${this.type}?lat=${this.latitude}&lon=${this.longitude}&units=imperial&appid=e2802a8fb9f851e53d09fe4eb9b16d38`,
            { mode: "cors" }
          );
        return request
    }
}

const model = (function model() {

    // Add memoization
    // prevents API calls if data is stored in memory
    const cache = {}

  // You can use cityName or an array of coordinates [latitude, longitude] to search
  async function callWeatherAPI(
    cityName = "London",
    type = "weather",
    coords = []
  ) {
    const request = await OpenWeatherWrapper.getData(cityName, type, coords)
    // if the request was successfull, return the data
    // otherwise display error message
    if (request.ok) {
      const data = await request.json();
      return data;
    }

    // If it didn't find such city
    view.showNoCityMessage();
    throw new Error("City not found");
  }

  // Extracts data from getWeather() for every argument
  async function getWeather(cityName, coords) {
    if(cache[`${capitalize(cityName)}Weather`]){
        const dataObject = await cache[`${capitalize(cityName)}Weather`]
        return dataObject
    }

    // get all a selection of values and store them in dataObject
    const dataObject = await callWeatherAPI(cityName, "weather", coords).then(
      (data) => WeatherData.formatWeather(data)
    );
    // Add it to cache
    cache[`${capitalize(cityName)}Weather`] = dataObject
    return dataObject;
  }

  // Gets forecast for the next numDays days
  async function getForecast(cityName, coords) {
    if(cache[`${cityName}Forecast`]){
        return cache[`${cityName}Forecast`]
    }

    const rawDataList = await callWeatherAPI(cityName, "forecast", coords).then(
      (data) => { console.log(data) 
        return data.list
      },
      (error) => {
        console.log(error)
      }
    );
    // Extract selected data
    const dataList = await WeatherData.formatForecast(rawDataList);
    cache[`${cityName}Forecast`] = dataList;
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
