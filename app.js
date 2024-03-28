const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const weather = require("./controllers/weather");

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  next();
});

// Endpoint to get weather information based on latitude and longitude
app.get("/weather", async (req, res) => {
  const body = req.body;
  const token = req.headers.authorization.split(" ")[1];
  let error;

  try {
    // Check for errors
    if (!body || Object.keys(body).length === 0) {
      error = "Content cannot be empty";
    } else if (!token) {
      error = "API key is missing. Please provide your OpenWeatherMap API key.";
    } else if (!body.lat || !body.lon) {
      error = "Latitude(lat) and longitude(lon) are required parameters.";
    } else if (
      typeof body.lat !== "number" ||
      body.lat < -90 ||
      body.lat > 90
    ) {
      error = "Invalid latitude. Must be a number between -90 and 90.";
    } else if (
      typeof body.lon !== "number" ||
      body.lon < -180 ||
      body.lon > 180
    ) {
      error = "Invalid longitude. Must be a number between -180 and 180.";
    }

    if (error) throw new Error(error);

    const result = await weather.getWeather(body.lat, body.lon, token);

    res.json(result);
  } catch (e) {
    res.status(400).json({
      error,
    });
  }
});

module.exports = app;
