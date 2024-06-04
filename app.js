const express = require("express");
const path = require("path");
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const AppError = require("./AppError");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
}); 

const app = express();

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.engine('ejs', ejsMate)
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function wrapAsync(fn) {
  return function (req, res, next) {
      fn(req, res, next).catch(e => next(e))
  }
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.post("/campgrounds", async (req, res, next) => {
  try {
  const campground = await Campground.create(req.body.campground);
  res.redirect(`/campgrounds/${campground._id}`)
} catch (e) {
  next(e)
}
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/create");
});

app.get("/campgrounds/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/show", { campground });
}));

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground)
  res.redirect(`/campgrounds/${campground._id}`)
});

app.delete("/campgrounds/:id", async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id)
  res.redirect('/campgrounds')
})

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
});

app.use((err, req, res, next) => {
  console.dir(err.name)
  console.log(err.name)
  res.send(err.name)
})

app.listen(3000, () => {
  console.log("Connected on port 3000!");
});
