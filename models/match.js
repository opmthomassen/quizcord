const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new mongoose.Schema({
  date: Date,
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
