const { join } = require("path");

const { getWeather } = require(join(__dirname, "..", "Controller", "weather"));

const { AuthRoutes } = require(join(
  __dirname,
  "..",
  "Middlewares",
  "Authentication"
));

const express = require("express");

const weatherRouter = express.Router();

weatherRouter.post("/weather", AuthRoutes, getWeather);

module.exports = {
  weatherRouter,
};
