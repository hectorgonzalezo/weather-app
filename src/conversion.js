import { round } from 'lodash'

function celsiusToFahrenheit(temp){
	return round(((temp * (9 / 5)) + 32))
}

function fahrenheitToCelsius(temp){
	return round((temp - 32) * (5 / 9))
}

export { celsiusToFahrenheit, fahrenheitToCelsius }
