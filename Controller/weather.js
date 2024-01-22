const { join } = require("path");

const axios = require("axios");

require("dotenv").config({ path: join(__dirname, "..", ".env") });

const { latitudeSchema, weatherInfoSchema } = require(join(
  __dirname,
  "..",
  "Utils",
  "validate"
));

const getWeather = async (req, res) => {
  const { city, lat = "", long = "" } = req.body;
  console.log(req.body);
  try {
    if (lat || long) {
      const { error } = latitudeSchema(req.body);
      if (error)
        return res.status(422).json({
          success: false,
          message: "Validation failed",
          data: error,
        });
      axios
        .get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
        )
        .then((response) => {
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${response.data.countryName}&appid=${process.env.API}&units=metric`
            )
            .then((outcome) => {
              return res.status(200).json({
                success: true,
                message: "Data was successfully retrieved",
                data: outcome.data,
              });
            });
        }).catch((e)=>{
          return res.status(404).json({
            success: false,
            message: "Invalid country entry",
            data: {},
          });
        })
    } else if (city) {
      const { error } = weatherInfoSchema(req.body);
      if (error)
        return res.status(422).json({
          success: false,
          message: "Validation failed",
          data: error,
        });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API}&units=metric`
        )
        .then((outcome) => {
          console.log(outcome.data);
          return res.status(200).json({
            success: true,
            message: "Data was successfully retrieved",
            data: outcome.data,
          });
        }).catch((e)=>{
          return res.status(404).json({
            success: false,
            message: "Invalid country entry",
            data: {},
          })
        })
    } else if (Object.entries(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Data not provided, provided either latitude and longitude or city name",
        data: {},
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
      data: {},
    });
  }
};

module.exports = {
  getWeather,
};
