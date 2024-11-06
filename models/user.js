const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
