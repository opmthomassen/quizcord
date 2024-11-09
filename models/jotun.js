const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jotunSchema = new Schema({
  name: String,
  hex: String,
  used: {
    type: Boolean,
    default: false,
  },
});

const Jotun = mongoose.model("Jotun", jotunSchema);
module.exports = Jotun;
