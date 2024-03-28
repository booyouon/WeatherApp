const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({
  path: __dirname + "/.env",
});

const app = express();
const PORT = process.env.PORT || 3000;
const weather = require("./controllers/weather");

// parse application/json
app.use(bodyParser.json());

// Endpoint to get weather information based on latitude and longitude
app.get("/weather", async (req, res) => {
  const body = req.body;
  let error;

  try {
    // Check for errors
    if (!body || Object.keys(body).length === 0) {
      error = "Content cannot be empty";
    } else if (!process.env.API_KEY) {
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

    const result = await weather.getWeather(body.lat, body.lon);

    res.json(result);
  } catch (e) {
    res.status(400).json({
      error,
    });
  }
});

const server = app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;
