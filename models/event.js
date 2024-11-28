const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  subtitle: String,
  venue: String,
  hall: String,
  eventGroupId: String,
  eventGroup: String,
  promoter: String,
  sold: Number,
  capacity: Number,
  categories: [
    {
      type: String,
    },
  ],
  startDate: Date,
  startDateUTCUnix: Number,
  endDate: Date,
  endDateUTCUnix: Number,
  cleanDate: Date,
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
