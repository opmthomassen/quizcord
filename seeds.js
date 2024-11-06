const mongoose = require("mongoose");
const User = require("./models/user");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quizcord");
  console.log("Mongo connection open");
}

/* const p = new Product({
  name: "Ruby ",
  price: 1,
  category: "fruit",
});

p.save()
  .then((p) => {
    console.log(p);
  })
  .catch((e) => {
    console.log(`There was an error: ${e}`);
  });

  */

// CLEAR DATABASE

//

const users = [
  {
    name: "Fredrik",
  },
  {
    name: "Ole Petter",
  },
  {
    name: "Jonathan",
  },
  {
    name: "ElisabetH",
  },
  {
    name: "Nhatalie",
  },
];

User.insertMany(users);
