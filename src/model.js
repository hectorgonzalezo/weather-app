const model = (function model() {
  // Gets data from openWeather JSON and adds it to target empty object
  function extractWeatherData(original) {
    const target = {};
    // Selection of values
    target.day = new Date(original.dt * 1000);
    target.temp = original.main.temp;
    target.description = original.weather[0].description;
    target.feels_like = original.main.feels_like;
    target.humidity = original.main.humidity;
    target.coord = original.coord;
    target.wind_speed = original.wind.speed;
    target.cloudiness = original.clouds.all;

    return target;
  }
  async function callAPI(cityName = 'London', type = 'weather') {
    // call the openWeather api
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/${type}?q=${cityName}&appid=e2802a8fb9f851e53d09fe4eb9b16d38`,
      { mode: 'cors' },
    );
    // if the request was successfull, return the data
    // otherwise display error message
    if (request.ok) {
      const data = await request.json();
      return data;
    }
    throw new Error('City not found');
  }

  // Extracts data from getWeather() for every argument
  async function getWeather(cityName) {
    // get all a selection of values and store them in dataObject
    const dataObject = await callAPI(cityName, 'weather')
      .then((data) => extractWeatherData(data));

    return dataObject;
  }

  // Gets forecast for the next numDays days
  async function getForecast(cityName, numDays = 5) {
    const rawDataList = await callAPI(cityName, 'forecast')
      .then((data) => {
        // get the first five days
        const fiveDays = data.list.slice(0, numDays);
        return fiveDays;
      });
    // Extract selected data
    const dataList = rawDataList.map((data) => extractWeatherData(data));

    return dataList;
  }

  return { getWeather, getForecast };
}());

export default model;
