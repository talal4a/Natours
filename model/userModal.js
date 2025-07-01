const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell me your user mame!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide the password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please  confirm password"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
