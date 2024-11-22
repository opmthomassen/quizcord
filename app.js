const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Team = require("./models/team");
const Player = require("./models/player.js");
const User = require("./models/user.js");
const session = require("express-session");
const bcrypt = require("bcrypt");

const { urlencoded } = require("express");
const morgan = require("morgan");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const { playerSchema } = require("./schemas.js");
const teamsFunc = require("./utils/teamDescFunc.js");
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
  session({
    secret: "my_secret_is_alright",
    resave: false, // Ikke lagre sesjonen på nytt hvis ingen endringer er gjort
    saveUninitialized: false, // Ikke lagre en ny sesjon hvis det ikke er noe data
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 time
    },
  })
);

app.use(
  "/favicon-dark.png",
  express.static(path.join(__dirname, "resources/favicon-dark.png"))
);

const validatePlayer = (req, res, next) => {
  const { error } = playerSchema.validate(req.body);
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
    const players = await Player.find({});
    const teams = await Team.find({});
    res.render("home", { players, teams });
  })
);

app.get(
  "/players",
  catchAsync(async (req, res) => {
    const activePlayers = await Player.find({ active: true });
    const inactivePlayers = await Player.find({ active: false });
    res.render("players/", { activePlayers, inactivePlayers });
  })
);

app.get(
  "/changeActiveStatus/:id",
  catchAsync(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const { active } = req.query;
    const player = await Player.findById(id);
    player.active = active;
    player.save();
    //const inactivePlayer = await Player.find({ active: false });
    res.redirect("/players/");
  })
);

// Add a new player
app.post(
  "/players",
  validatePlayer,
  catchAsync(async (req, res, next) => {
    const { name } = req.body.player;
    const age = Math.floor(Math.random() * 99) + 1;
    const gender =
      Math.floor(Math.random() * 2) + 1 == 1 ? "♂ Male" : "♀ Female";
    const player = new Player({
      name: name,
      gender: gender,
      age: age,
      active: true,
    });
    await player.save();
    res.redirect("/players/");
  })
);

// Display player specific info with edits.
app.get(
  "/players/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
      throw new ExpressError("Player not found", 404);
    }
    res.render("player/edit", { player, genders });
  })
);

// Save edit
app.put(
  "/players/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, age, gender } = req.body.player;
    const player = await Player.findById(id);
    player.name = name;
    player.age = age;
    player.gender = gender;

    player.save();
    res.redirect("/players/");
  })
);

// Delete player
app.delete(
  "/players/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    await Player.findByIdAndDelete(id);
    res.redirect("/players/");
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
    const { name, hex } = await teamsFunc();
    const randomScore = Math.floor(Math.random() * 99);
    const team = new Team({ name, color: hex, score: randomScore });
    team.save();

    res.redirect("/teams/");
  })
);

// Save team edit
app.put(
  "/teams/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, color } = req.body.team;
    const team = await Team.findById(id);
    team.name = name;
    team.color = color;

    team.save();
    res.redirect("/teams/");
  })
);

// Populate teams
app.get(
  "/populate/:teamCount",
  catchAsync(async (req, res, next) => {
    const { teamCount } = req.params;
    let allPlayers = await Player.find();

    const shuffledPlayers = shuffleArray(allPlayers);
    //console.log(shuffledPlayers);

    let restCounter = allPlayers.length % teamCount; // rest
    let basePerTeam = Math.floor(allPlayers.length / teamCount); // base per team.

    for (let i = 0; i <= teamCount; i++) {}

    res.redirect("/");
  })
);

app.get(
  "/admin",
  catchAsync(async (req, res) => {
    if (!req.session.user_id) {
      return res.send("You are not an admin");
    } else {
      const players = await Player.find({});
      const teams = await Team.find({});
      res.render("admin", { players, teams, categories });
    }
  })
);

// ***********
// ***LOGIN***
// ***********

app.get("/login", (req, res) => {
  res.render("login");
});

// Log in
app.post(
  "/login/",
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findAndValidate(username, password);

    if (user) {
      return res.send("Found user");
    } else {
      return res.send("didnt find user");
    }
  })
);

app.get("/register", (req, res) => {
  res.render("register");
});

// add new user
app.post(
  "/register/",
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    //res.redirect("/admin");
    console.log("post:register");
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
