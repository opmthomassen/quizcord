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

app.get(
  "/users/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new ExpressError("User not found", 404);
    }
    res.render("users/edit", { user });
  })
);

// Edit campground
app.get(
  "/users/:id/edit",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new ExpressError("User not found", 404));
    }
    res.render("users/edit", { user });
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

// Delete campground
app.delete(
  "/users/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/users/");
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
