const app = require("./app");
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv").config({
  path: __dirname + "/.env",
});

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server is running on http://localhost:${PORT}`);
});
