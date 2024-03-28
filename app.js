const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json());

// Endpoint to get weather information based on latitude and longitude
app.get("/weather", (req, res) => {
  const body = req.body;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).send({ message: "Content cannot be empty" });
  } else if (!body.lat || !body.lon) {
    return res.status(400).json({
      error: "Latitude(lat) and longitude(lon) are required parameters.",
    });
  }

  res.send(body);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
