const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title Cannot be blank']
    },
    image: {
        type: String,
        required: [true, "Image cannot be empty"]
    },
    price: {
        type: Number,
        required: [true, "Price should be indicated"]
    },
    description: {
        type: String,
        required: [true, "There should be some description about the campground."]
    },
    location: {
        type: String,
        required: [true, "Location is important."]
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)