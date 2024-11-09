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
    const users = await User.find({});
    res.render("users/", { users });
  })
);

app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/", { campgrounds });
  })
);

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

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
    const user = await User.findByIdAndUpdate(id, req.body.user);
    user.save();
    res.redirect(`/users/`);
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

// ***********
// ***TEAMS***
// ***********

// Show all teams
app.get(
  "/teams/",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const teams = await Team.find({});
    res.render("teams/", { teams });
  })
);

// Generate team
app.post(
  "/teams/",
  catchAsync(async (req, res, next) => {
    const { name, hex } = await jotunFunc();
    const team = new Team({ name, color: hex, score: 0 });
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
    console.log(shuffledUsers);

    let restCounter = allUsers.length % teamCount; // rest
    let basePerTeam = Math.floor(allUsers.length / teamCount); // base per team.

    for (let i = 0; i <= teamCount; i++) {}

    res.redirect("/");
  })
);

app.get("/admin", (req, res) => {
  throw new ExpressError("You are not an admin!", 403);
});

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  console.log("***************************");
  console.log("***********ERROR***********");
  console.log("***************************");

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
