const express = require("express");
const router = express.Router({ mergeParams: true });

const reviews = require("../models/review");
const { reviewSchema } = require("../schemas");
const Campground = require("../models/campground");
const Review = require("../models/review");

const catchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressError");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post("/", validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = await Review.create(req.body.review);
    campground.reviews.push(review);
    await campground.save();
    await campground.populate();
    req.flash('success', 'Created a review successfully')
    res.redirect("/campgrounds/" + req.params.id);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    
    req.flash('success', 'Review Deleted Successfully!')
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
