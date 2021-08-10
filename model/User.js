const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
  hash: String,
  salt: String,
  token: String,
});
module.exports = User;
