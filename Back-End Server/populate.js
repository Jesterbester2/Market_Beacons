import mongoose from 'mongoose';
import Ad from './models/ad';

const ads = [
  {
    title: 'Knuckles',
    imageUrl: 'https://i.imgur.com/1eJ1q0V.jpg',
    description: 'meme',
  },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ads');

// Go through each ad
ads.map(data => {
  // Initialize a model with ad data
  const ad = new Ad(data);
  // and save it into the database
  ad.save();
});
