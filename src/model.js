const model = (function model() {
  async function callAPI(cityName = 'London') {
    // call the openWeather api
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e2802a8fb9f851e53d09fe4eb9b16d38`,
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
    const dataObject = {};
    await callAPI(cityName)
      .then((json) => {
        // get all of these values and store them in dataObject
        dataObject.temp = json.main.temp;
        dataObject.description = json.weather[0].description;
        dataObject.feels_like = json.main.feels_like;
        dataObject.humidity = json.main.humidity;
        dataObject.coord = json.coord;
        dataObject.wind_speed = json.wind.speed;
        dataObject.cloudiness = json.clouds.all;
      });

    return dataObject;
  }

  return { getWeather };
}());

export default model;
