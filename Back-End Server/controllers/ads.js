import Ad from '../models/ad';
import moment from 'moment';

export const index = (req, res, next) => {
  // Find all ads and return json response
  Ad.find().lean().exec((err, ads) => res.json(
    // Iterate through each ad
    { ads: ads.map(ad => ({
      ...ad,
    }))}
  ));
};
