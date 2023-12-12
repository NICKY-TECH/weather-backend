const { join } = require("path");


const { User } = require(join(__dirname, "..", "Model", "user.model"));

const { regInfoSchema, loginInfoSchema } = require(join(
  __dirname,
  "..",
  "Utils",
  "validate"
));

const { salting, verifyPassword } = require(join(
  __dirname,
  "..",
  "Utils",
  "salting"
));

const { jwtToken } = require(join(__dirname, "..", "Utils", "jwt"));

const Registration = async (req, res) => {
  try {
    const { error } = regInfoSchema(req.body);
    console.log(error)
    if (!error){
      const { name, email, password } = req.body;
      const found = await User.findOne({ email:email });
      if (found)
        return res.status(400).json({
          success: false,
          message: "User already exist",
          data: {},
        });
      const newPassword = await salting(password);
      User.create({
        name:name,
        email:email,
        password: newPassword,
      });
      return res.status(201).json({
        success: true,
        message: "User successfully created",
        data: {},
      });

    }
    return res.status(200).json({
      success: false,
      message: "Validation failed",
      data: error,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "server error",
      data: e
    })
  }
};

const login = async (req, res) => {
  const { error } = loginInfoSchema(req.body);
  console.log(error)
  if (!error){
  const { password, email } = req.body;
  const found = await User.findOne({ email:email });
  if (!found)
    return res.status(404).json({
      success: false,
      message: "user does not exist",
      data: {},
    });
  const pass = await verifyPassword(password, found.password);
  if (!pass)
    return res.status(404).json({
      success: false,
      message: "user does not exist",
      data: {},
    });
  const token = await jwtToken(found._id);
  return res.status(200).json({
    success: true,
    message: "User successfully logged in",
    data: {
    token: token
    },
  });

}
return res.status(422).json({
  success: false,
  message: "Validation failed",
  data: error,
});
};

module.exports={
  login,
  Registration
}