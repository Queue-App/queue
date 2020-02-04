const yelpAPI = require('yelp-api');
const axios = require('axios');
require('dotenv').config();

const apiController = {};

// gets the current location of the client
apiController.geolocation = (req, res, next) => {
  axios.get(`http://api.ipapi.com/api/check?access_key=${process.env.GEO_API_KEY}`)
    .then((response) => {
      res.locals.zipcode = response.data.zip;
      return next();
    })
    .catch((err) => {
      throw new Error(`ERROR in apiController.geolocation: ${err}`);
    });
};

apiController.yelp = (req, res, next) => {
  // const ENDPOINT = 'https://api.yelp.com/v3/businesses/search';

  // Create a new yelpAPI object with your API key
  const yelp = new yelpAPI(process.env.YELP_API_KEY);

  // Set any parameters, if applicable (see API documentation for allowed params)
  // let params = [{ location: req.body.location || res.locals.zipcode, limit: 15, offset: 10}];
  // for { location: req.body.location || res.locals.zipcode } --> will use the location that was input into the Location input field, if nothing input then will use current location of the client
  const params = [{ term: req.body.searchInput }, { location: req.body.location || res.locals.zipcode, limit: 50 }];

  // Call the endpoint
  yelp.query('businesses/search', params)
    .then((data) => {
    // Success
      res.locals.businesses = data;
      return next();
    })
    .catch((err) => {
    // Failure
      throw new Error(`ERROR in apiController.yelp: ${err}`);
    });
};


module.exports = apiController;
