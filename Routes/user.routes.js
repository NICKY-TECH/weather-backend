const { join } = require("path");

const { Registration, login } = require(join(
  __dirname,
  "..",
  "Controller",
  "Reg"
));

const express = require("express");

const userRouter = express.Router();

userRouter.post("/registration", Registration);

userRouter.post("/login", login);

module.exports = {
  userRouter,
};
