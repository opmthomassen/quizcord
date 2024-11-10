const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Team = require("./models/team");
const User = require("./models/user");

const { urlencoded } = require("express");
const morgan = require("morgan");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const { userSchema } = require("./schemas.js");
const jotunFunc = require("./utils/jotun");
const { Serializer } = require("v8");
const { categories } = require("./utils/categories");

const genders = ["♂ Male", "♀ Female"];

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quizcord");
  console.log("Mongo connection open");
}

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
  "/favicon-dark.png",
  express.static(path.join(__dirname, "resources/favicon-dark.png"))
);

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});

// Forside
app.get(
  "/",
  catchAsync(async (req, res) => {
    const users = await User.find({});
    const teams = await Team.find({});
    res.render("home", { users, teams });
  })
);

app.get(
  "/users",
  catchAsync(async (req, res) => {
    const activeUsers = await User.find({ active: true });
    const inactiveUsers = await User.find({ active: false });
    res.render("users/", { activeUsers, inactiveUsers });
  })
);

app.get(
  "/changeActiveStatus/:id",
  catchAsync(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const { active } = req.query;
    const user = await User.findById(id);
    user.active = active;
    user.save();
    //const inactiveUsers = await User.find({ active: false });
    res.redirect("/users/");
  })
);

// Add a new user
app.post(
  "/users",
  validateUser,
  catchAsync(async (req, res, next) => {
    const { name } = req.body.user;
    const age = Math.floor(Math.random() * 99) + 1;
    const gender =
      Math.floor(Math.random() * 2) + 1 == 1 ? "♂ Male" : "♀ Female";
    const user = new User({
      name: name,
      gender: gender,
      age: age,
      active: true,
    });
    await user.save();
    res.redirect("/users/");
  })
);

// Display user specific info with edits.
app.get(
  "/users/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new ExpressError("User not found", 404);
    }
    res.render("users/edit", { user, genders });
  })
);

// Save edit
app.put(
  "/users/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    //const { active } = req.body.user;
    const { name, age, gender } = req.body.user;
    const user = await User.findById(id);
    user.name = name;
    user.age = age;
    user.gender = gender;

    user.save();
    res.redirect("/users/");
  })
);

// Delete user
app.delete(
  "/users/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/users/");
  })
);

app.get("/statistics", async (req, res) => {
  try {
    const data = await Team.find({}); // Bytt ut 'MyModel' med din modell
    const scores = data.map((item) => item.score); // Hent de spesifikke feltene du vil bruke
    const labels = data.map((item) => item.name); // Hent labels (f.eks. navn eller kategorier)
    const colors = data.map((item) => item.color); // Hent labels (f.eks. navn eller kategorier)
    res.render("statistics", { scores, labels, colors });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

app.get(
  "/history/",
  catchAsync(async (req, res, next) => {
    res.render("history/");
  })
);

// ***********
// ***TEAMS***
// ***********

// Show all teams
app.get(
  "/teams/",
  catchAsync(async (req, res, next) => {
    const teams = await Team.find({});
    res.render("teams/", { teams });
  })
);

// Show all teams
app.get(
  "/teams/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const team = await Team.findById(id);
    res.render("teams/edit", { team });
  })
);

// Generate team
app.post(
  "/teams/",
  catchAsync(async (req, res, next) => {
    const { name, hex } = await jotunFunc();
    const randomScore = Math.floor(Math.random() * 99);
    const team = new Team({ name, color: hex, score: randomScore });
    team.save();

    res.redirect("/teams/");
  })
);

// Populate teams
app.get(
  "/populate/:teamCount",
  catchAsync(async (req, res, next) => {
    const { teamCount } = req.params;
    let allUsers = await User.find();

    const shuffledUsers = shuffleArray(allUsers);
    //console.log(shuffledUsers);

    let restCounter = allUsers.length % teamCount; // rest
    let basePerTeam = Math.floor(allUsers.length / teamCount); // base per team.

    for (let i = 0; i <= teamCount; i++) {}

    res.redirect("/");
  })
);

app.get(
  "/admin",
  catchAsync(async (req, res) => {
    //throw new ExpressError("You are not an admin!", 403);

    const users = await User.find({});
    const teams = await Team.find({});
    res.render("admin", { users, teams, categories });
  })
);

app.get("/test", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  console.log("***************************");
  console.log("***********ERROR***********");
  console.log("***************************");
  console.log(err);

  const { status = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong";
  res.status(status).render("error", { err });
});

// Fallback
app.get("*", (req, res) => {
  res.render("notfound");
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Velg et tilfeldig indeks fra 0 til i
    [array[i], array[j]] = [array[j], array[i]]; // Bytt om elementene
  }
  return array;
}
