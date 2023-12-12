const { join } = require("path");

require("dotenv").config({ path: join(__dirname, "..", ".env") });

const jwt = require("jsonwebtoken");

const jwtToken = async (info) => {
  const token = await jwt.sign({ user: info }, process.env.SECRET, {
    expiresIn: "2d",
  });
  return token;
};


const verifyToken = async (info) => {
  const token = await jwt.verify(info, process.env.PASS, (err, decode)=>{
    if(err && err.name==="TokenExpiredError"){
return false
    }
    return decode;
  });
return token
};


module.exports = {
  jwtToken,
  verifyToken,
};
