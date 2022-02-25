const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  mobilenumber: {
    type: String,
  },
  designation: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
