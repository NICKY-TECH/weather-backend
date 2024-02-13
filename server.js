const { join } = require("path");
const { weatherRouter } = require(join(
  __dirname,
  ".",
  "Routes",
  "weather.routes"
));

const Db = require(join(__dirname, ".", "Config", "Db"));

Db();

const cors = require("cors");

const { userRouter } = require(join(__dirname, "Routes", "user.routes"));

const express = require("express");

const app = express();

app.use(cors({
  origin:['http://localhost:5173',
  "https://weather-frontend-beige.vercel.app/",
  "https://lucent-axolotl-005c7f.netlify.app"
]
}));

app.use(express.json());

app.use("/", weatherRouter);

console.log(720000000000000000+80)

app.use("/", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening at PORT: ${PORT}`);
});
