# WeatherApp

This is a simple HTTP server built with Node.js and Express that interacts with the OpenWeatherMap API to provide weather information based on latitude and longitude coordinates.

## Features

- Retrieves current weather conditions for a given latitude and longitude.
- Determines whether the weather is hot, cold, or moderate based on temperature thresholds.
- Checks for any active weather alerts in the specified area.

## Prerequisites

Before running this application, you need to have the following installed on your machine:

- Node.js (https://nodejs.org)
- npm (Node Package Manager, comes with Node.js installation)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:booyouon/WeatherApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd WeatherApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your OpenWeatherMap API key:

   - Obtain an API key from OpenWeatherMap (https://openweathermap.org/api).
   - Create a .env file (Skip if not being done locally)
   - Enter in the following into your .env file, replace "YOUR_API_KEY" with your API Key from OpenWeatherMap:

   ```javascript
   API_KEY = "YOUR_API_KEY";
   ```

## Usage

To start the server, run:

```bash
npm start
```

The server will start running on `http://localhost:3000` by default. Feel free to replace the port in env.

### API Endpoint(s)

#### GET /weather

- Body Parameters:
  - `lat`: Latitude of the location (required)
  - `lon`: Longitude of the location (required)

Example usage:

```bash
curl --location --request GET 'http://localhost:3000/weather' \
--header 'Content-Type: application/json' \
--data '{
    "lat": 33.44,
    "lon": -94.04
}'
```

## Testing

This project uses Jest and supertest for testing. To run the tests, execute:

```bash
npm test
```

## Folder Structure

```bash
├── controllers
│   ├── weather.js
├── node_modules
├── tests
│   ├── app.test.js
│   ├── weather.test.js
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

- `controllers/`: This directory contains helper files for `app.js`.
- `controllers/weather.js`: This file contains the logic for interacting with the OpenWeatherMap API.
- `node_modules/`: This directory contains all the dependencies installed by npm.
- `tests/`: Contains test files for the Express application. The main test file is `app.test.js`.
- `.env`: Contains the Environment Variables. File must be manually created or contents defined on cloud hosting service.
- `.gitignore`: Contains the files for git to ignore.
- `app.js`: The main application file where the Express server is defined.
- `package-lock.json`: Automatically generated file that locks dependency versions to ensure consistent installs across different environments.
- `package.json`: The npm configuration file, which includes metadata about the project and its dependencies.
- `README.md`: The main README file containing project information.

## Author

[Vince Abuyuan](https://github.com/booyouon)

## Technologies/Dependencies

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [Axios](https://axios-http.com/) This is a promise-based HTTP client for JavaScript.
- [body-parser](https://www.npmjs.com/package/body-parser) This is a Node.js middleware used to parse incoming request bodies.
- [dotenv](https://www.npmjs.com/package/dotenv) This is a Node.js module that loads environment variables from a .env file into process.env.
