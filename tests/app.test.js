const request = require("supertest");
const app = require("../app.js");

describe("GET /weather", () => {
  test("should return 400 if no content sent", async () => {
    const response = await request(app).get("/weather");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Content cannot be empty");
  });
  test("should return 400 if lon is missing", async () => {
    const response = await request(app).get("/weather").send({
      lat: 33.44,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Latitude(lat) and longitude(lon) are required parameters."
    );
  });
  test("should return 400 if lat is missing", async () => {
    const response = await request(app).get("/weather").send({
      lon: 133.44,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Latitude(lat) and longitude(lon) are required parameters."
    );
  });
  test("should return 400 if latitude is sent as string", async () => {
    const response = await request(app).get("/weather").send({
      lat: "33.44",
      lon: 133.44,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Invalid latitude. Must be a number between -90 and 90."
    );
  });
  test("should return 400 if longitude is sent as string", async () => {
    const response = await request(app).get("/weather").send({
      lat: 33.44,
      lon: "133.44",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Invalid longitude. Must be a number between -180 and 180."
    );
  });
  test("should return 400 if latitude > 90", async () => {
    const response = await request(app).get("/weather").send({
      lat: 95,
      lon: 180,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Invalid latitude. Must be a number between -90 and 90."
    );
  });
  test("should return 400 if latitude < -90", async () => {
    const response = await request(app).get("/weather").send({
      lat: -91,
      lon: -180,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Invalid latitude. Must be a number between -90 and 90."
    );
  });
  test("should return 400 if longitude > 180", async () => {
    const response = await request(app).get("/weather").send({
      lat: 33.44,
      lon: 181,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Invalid longitude. Must be a number between -180 and 180."
    );
  });
  test("should return 400 if longitude < -180", async () => {
    const response = await request(app).get("/weather").send({
      lat: 33.44,
      lon: -182,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Invalid longitude. Must be a number between -180 and 180."
    );
  });

  test("should return 200 with weather data if lat: 90 and lon: 180 are sent (whole numbers)", async () => {
    const response = await request(app)
      .get("/weather")
      .send({ lat: 90, lon: 180 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("weatherCondition");
    expect(response.body).toHaveProperty("temperatureCategory");
    expect(response.body).toHaveProperty("alerts");
  });
  test("should return 200 with weather data if lat: 51.5074 and lon: -0.1278 are sent (decimals)", async () => {
    const response = await request(app)
      .get("/weather")
      .send({ lat: 51.5074, lon: -0.1278 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("weatherCondition");
    expect(response.body).toHaveProperty("temperatureCategory");
    expect(response.body).toHaveProperty("alerts");
  });
  test("should return 200 with weather data even if additional params are provided as long as lat and lon are correct", async () => {
    const response = await request(app)
      .get("/weather")
      .send({ lat: -23, lon: -165, test: 342134 });
    expect(response.status).toBe(200);
  });
});
