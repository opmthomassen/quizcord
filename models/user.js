const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  gender: String,
  gender: [
    {
      type: String,
      enum: ["♂ Male", "♀ Female"],
    },
  ],
  age: [
    {
      type: Number,
      min: 0,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
