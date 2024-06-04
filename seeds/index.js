const mongoose = require("mongoose");
const axios = require("axios");
const cities = require("./cities.js");
const { descriptors, places } = require("./seedHelpers.js");
const campground = require("../models/campground");
require('dotenv').config();

const clientID = process.env.ClientID

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const rndChooser = (array) => array[Math.floor(Math.random() * array.length)];

async function imgFetcher() {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/collections/483251/photos?client_id=${clientID}`
    );
    const data = response.data;
    console.log(data[0].urls.full);
  } catch (e) {
    console.error(e);
  }
}

async function fetchRandomImageUrl() {
  const unsplashUrl = 'https://api.unsplash.com/collections/483251/photos?client_id='; // Replace with your Unsplash API key
  const response = await fetch(unsplashUrl);
  const data = await response.json();
  return data[0].urls.full; // Assuming the regular URL contains the image link
}

const seedDB = async () => {
  await campground.deleteMany({});

  for (let i = 0; i <= 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;

    const imageURL = await fetchRandomImageUrl()

    await campground.create({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${rndChooser(descriptors)} ${rndChooser(places)}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero maxime reiciendis ullam numquam possimus impedit incidunt nobis dignissimos quam similique.",
      image: imageURL,
      price,
    });
  }
};


seedDB().then(() => {
  mongoose.connection.close();
});
