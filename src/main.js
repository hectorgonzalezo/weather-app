import model from './model';
import './style.css';

// model.getWeather().then((result) => console.log(result));
// model.getForecast().then((result) => console.log(result));

const view = (function () {
  function renderWeather(name, dataObj) {
    const title = document.querySelector('h1');
    const content = document.querySelector('p');
    title.innerText = name;
    content.innerText = dataObj.day;
  }
  return { renderWeather };
}()
);

const controller = (function () {
  const form = document.querySelector('form');
  const inputCity = document.querySelector('#input-city');
  const buttonSubmit = document.querySelector('form input[type=submit]');

  // After pressing submit, look weather and forecast of new city
  async function lookupNewCity(e) {
    if (form.checkValidity()) {
      e.preventDefault();
      const cityName = inputCity.value;
      const weather = await model.getWeather(cityName).then((result) => result);
      const forecast = await model.getForecast(cityName).then((result) => result);
      //
      view.renderWeather(cityName, weather);
    }
  }

  buttonSubmit.addEventListener('click', lookupNewCity);
}()
);
