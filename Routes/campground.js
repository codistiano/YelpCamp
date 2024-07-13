const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const Campground = require("../models/campground");
const { campgroundSchema } = require("../schemas");
const router = express.Router();

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.post("/", validateCampground, catchAsync(async (req, res, next) => {
    const campground = await Campground.create(req.body.campground);
    req.flash('success', 'Campground created successfully')
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get("/new", (req, res) => {
  res.render("campgrounds/create");
});

router.get("/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews");
    if (!campground) {
        req.flash('error', '404! Campground Not Found!')
        res.redirect('/campgrounds')
    } else {
        res.render("campgrounds/show", { campground });
    }
  })
);

router.put("/:id", validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    req.flash('success', 'Campground updated successfully')
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground deleted successfully')
    res.redirect("/campgrounds");
  })
);

router.get("/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
  })
);

module.exports = router;
