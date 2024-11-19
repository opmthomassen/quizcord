const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamDescriptionSchema = new Schema({
  name: String,
  hex: String,
  used: {
    type: Boolean,
    default: false,
  },
});

const TeamDescription = mongoose.model(
  "TeamDescription",
  teamDescriptionSchema
);
module.exports = TeamDescription;
