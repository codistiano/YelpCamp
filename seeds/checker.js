// ______________________________________________________THIS TRIALS WERE TO USE THE NEW API OF UNSPLASH __(SUCCESSFULLY DONE!)_________________ 
//const axios = require("axios");

// let img

// fetch('https://api.unsplash.com/collections/483251/photos?client_id=oiO-pWAQpZuW_WVcSPAwUlL9BJoRYA3euARAATEQTPw')
// .then(res => {
//     return res.json()
// })
// .then(data => {
//     console.log(data[0].urls)
//     img = data[0].urls.full
// })

// console.log(img)

// ------------------------------------------------------

// const axios = require("axios");

// async function fetchImage() {
//   try {
//     const response = await axios.get('https://api.unsplash.com/collections/483251/photos?client_id=oiO-pWAQpZuW_WVcSPAwUlL9BJoRYA3euARAATEQTPw');
//     const data = await response.json();
//     console.log(data[0].urls);
//     return data[0].urls.full;
//   } catch (error) {
//     console.error(error);
//     return null; // Or handle the error differently
//   }
// }

// (async () => {
//   const img = await fetchImage();
//   if (img) {
//     console.log("Image URL:", img);
//   } else {
//     console.log("Failed to fetch image");
//   }
// })();

// ___________________________________________________ ANOTHER TRIAL __________________________________

// async function fetchRandomImageUrl() {
//     const unsplashUrl = 'https://api.unsplash.com/collections/483251/photos?client_id=oiO-pWAQpZuW_WVcSPAwUlL9BJoRYA3euARAATEQTPw'; // Replace with your Unsplash API key
//     const response = await fetch(unsplashUrl);
//     const data = await response.json();
//     return data[0].urls.full; // Assuming the regular URL contains the image link
//   }

// async function fetchingDB () {
//     const image = await fetchRandomImageUrl()
//     console.log(image)
// }
// fetchingDB()