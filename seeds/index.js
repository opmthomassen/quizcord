const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Mongo connection open");
}

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const camp = new Campground({
      title: `${generateName(descriptors)} ${generateName(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      location: `${cities[random1000].city} ${cities[random1000].state}`,
      price: Math.floor(Math.random() * 30) + 10,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio deleniti neque quis soluta doloremque, blanditiis, eius laudantium quas nam voluptatum animi debitis porro adipisci excepturi ex eum dolore est nostrum.",
    });
    await camp.save();
  }
};

function generateName(array) {
  const random = Math.floor(Math.random() * array.length);
  return `${array[random]}`;
}

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Mongo connection closed");
});
