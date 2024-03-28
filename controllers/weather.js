// API Docs: https://openweathermap.org/api/one-call-3

// Dependencies
const axios = require("axios");
const dotenv = require("dotenv").config({
  path: __dirname + "/../.env",
});

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
 * @param {string} key - API KEY from Open Weather
 * @param {string} units - standard, metric and imperial units are available
 * @return {object}
 */
getWeather = async (lat, lon, key, units = "imperial") => {
  let responseData = {
    status: 200,
  };
  // Check for errors
  if (!key) {
    responseData.error =
      "API key is missing. Please provide your OpenWeatherMap API key.";
  } else if (!lat || !lon) {
    responseData.error =
      "Latitude(lat) and longitude(lon) are required parameters.";
  } else if (typeof lat !== "number" || lat < -90 || lat > 90) {
    responseData.error =
      "Invalid latitude. Must be a number between -90 and 90.";
  } else if (typeof lon !== "number" || lon < -180 || lon > 180) {
    responseData.error =
      "Invalid longitude. Must be a number between -180 and 180.";
  }

  if (responseData.error) {
    responseData.status = 400;
    return responseData;
  }

  const url = new URL(BASE_URL);

  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lon);
  url.searchParams.set("units", units);
  url.searchParams.set("appid", key);

  try {
    const response = await axios.get(url);
    const data = response.data;

    responseData.weatherCondition = data.current.weather[0].description;
    const currentTemp = data.current.temp;
    responseData.temperatureCategory =
      determineTemperatureCategory(currentTemp);
    responseData.alerts = checkWeatherAlerts(data);
  } catch (e) {
    if (e.response) {
      const error = e.response;
      responseData.status = error.status;
      responseData.error = error.data.message;
    }
  }

  return responseData;
};

module.exports = { getWeather };
