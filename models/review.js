const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  text: String,
  review: Number,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
