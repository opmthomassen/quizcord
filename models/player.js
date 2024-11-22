const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
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
  active: [
    {
      type: Boolean,
      default: true,
    },
  ],
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
