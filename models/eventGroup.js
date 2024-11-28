const mongoose = require("mongoose");

const eventGroupSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  subtitle: String,
  description: String,
  edited: String,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const EventGroup = mongoose.model("EventGroup", eventGroupSchema);
module.exports = EventGroup;
