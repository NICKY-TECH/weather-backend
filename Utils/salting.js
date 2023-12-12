const bcrypt = require("bcrypt");

const salting = async (password) => {
  const newPassword = await bcrypt.hash(password, 12);
  return newPassword;
};

const verifyPassword = async (password, userPassword) => {
  const verified = await bcrypt.compare(password, userPassword);
  return verified;
};

module.exports = {
  salting,
  verifyPassword,
};
