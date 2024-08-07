const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = await Review.create(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  await campground.populate();
  req.flash("success", "Created a review successfully");
  res.redirect("/campgrounds/" + req.params.id);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted Successfully!");
  res.redirect(`/campgrounds/${id}`);
};
