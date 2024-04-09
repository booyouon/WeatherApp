const axios = require("axios");
const { getWeather } = require("../controllers/weather");

jest.mock("axios");

describe("getWeather function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return weather data when API call is successful", async () => {
    const mockResponseData = {
      status: 200,
      current: {
        weather: [{ description: "Clear" }],
        temp: 75,
      },
      alerts: null,
    };

    axios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getWeather(40.7128, -74.006, "00000");

    expect(result).toEqual({
      status: 200,
      weatherCondition: "Clear",
      temperatureCategory: "Moderate",
      alerts: "No active weather alerts.",
    });
  });

  test("should return weather data with alerts when alerts are present", async () => {
    const mockResponseData = {
      status: 200,
      current: {
        weather: [{ description: "Rain" }],
        temp: 55,
      },
      alerts: [
        {
          event: "Flood Warning",
          description: "A flood warning is in effect",
        },
      ],
    };

    axios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getWeather(40.7128, -74.006, "00000");

    expect(result).toEqual({
      status: 200,
      weatherCondition: "Rain",
      temperatureCategory: "Moderate",
      alerts: [
        {
          event: "Flood Warning",
          description: "A flood warning is in effect",
        },
      ],
    });
  });

  test("should return temperatureCategory as Hot if weather is greater than 86", async () => {
    const mockResponseData = {
      status: 200,
      current: {
        weather: [{ description: "Sunny" }],
        temp: 100,
      },
      alerts: null,
    };

    axios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getWeather(40.7128, -74.006, "00000");
    expect(result.temperatureCategory).toEqual("Hot");
  });

  test("should return temperatureCategory as Cold if weather is less than 50", async () => {
    const mockResponseData = {
      status: 200,
      current: {
        weather: [{ description: "Sunny" }],
        temp: 10,
      },
      alerts: null,
    };

    axios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getWeather(40.7128, -74.006, "00000");
    expect(result.temperatureCategory).toEqual("Cold");
  });

  test("should return temperatureCategory as Moderate if weather is between 86 and 50", async () => {
    const mockResponseData = {
      status: 200,
      current: {
        weather: [{ description: "Sunny" }],
        temp: 70,
      },
      alerts: null,
    };

    axios.get.mockResolvedValue({ data: mockResponseData });

    const result = await getWeather(40.7128, -74.006, "00000");
    expect(result.temperatureCategory).toEqual("Moderate");
  });
});
