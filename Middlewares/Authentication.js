const {join} = require("path");
 require("dotenv").config({path:join(__dirname,"..",".env")});
const jwt = require("jsonwebtoken");

const AuthRoutes = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
      data: {},
    });
  await jwt.verify(token, process.env.SECRET, (err, decode) => {
    if (err) {
      return res.status(400).json({
        success:false,
        message: "An error occurred",
        data: {},
      });
    }
    req.user = decode;
    next();
  });
};

module.exports = {
  AuthRoutes,
};
