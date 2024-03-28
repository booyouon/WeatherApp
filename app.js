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
  let status = 200;

  try {
    // Check for errors
    if (!body || Object.keys(body).length === 0) {
      error = "Content cannot be empty";
      status = 400;
      throw new Error(error);
    }

    const result = await weather.getWeather(body.lat, body.lon, token);

    res.status(result.status).json(result);
  } catch (e) {
    res.status(status).json({
      error,
    });
  }
});

module.exports = app;
