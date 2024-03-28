// API Docs: https://openweathermap.org/api/one-call-3

// Dependencies
const axios = require("axios");
const dotenv = require("dotenv").config({
  path: __dirname + "/../.env",
});

// OpenWeatherMap API key
const API_KEY = process.env.API_KEY;

// Define thresholds for hot and cold temperatures
const HOT_THRESHOLD = process.env.HOT_THRESHOLD || 86; // 86 Fahrenheit
const COLD_THRESHOLD = process.env.COLD_THRESHOLD || 50; // 50 Fahrenheit

// Constants
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

/**
 * @name determineTemperatureCategory
 * @param {integer} temp
 * @return {string}
 */
determineTemperatureCategory = (temp) => {
  if (temp > HOT_THRESHOLD) {
    return "Hot";
  } else if (temp < COLD_THRESHOLD) {
    return "Cold";
  } else {
    return "Moderate";
  }
};

/**
 * @name checkWeatherAlerts
 * @param {object} data
 * @return {object, string}
 */
checkWeatherAlerts = (data) => {
  const alerts = data.alerts;
  if (alerts) {
    return alerts.map((alert) => ({
      event: alert.event,
      description: alert.description,
    }));
  } else {
    return "No active weather alerts.";
  }
};

/**
 * @name getWeather
 * @param {integer} lat
 * @param {integer} lon
 * @param {string} units - standard, metric and imperial units are available
 * @return {object}
 */
getWeather = async (lat, lon, units = "imperial") => {
  const url = new URL(BASE_URL);

  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lon);
  url.searchParams.set("units", units);
  url.searchParams.set("appid", API_KEY);

  const response = await axios.get(url);
  const data = response.data;

  const weatherCondition = data.current.weather[0].description;
  const currentTemp = data.current.temp;
  const temperatureCategory = determineTemperatureCategory(currentTemp);
  const alerts = checkWeatherAlerts(data);

  const responseData = {
    weatherCondition,
    temperatureCategory,
    alerts,
  };

  return responseData;
};

module.exports = { getWeather };
