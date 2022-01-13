import { Trip } from '../models/trip.js'
import { Restaurant } from '../models/restaurant.js'
import axios from 'axios'


function searchRestaurants(req, res) {
  axios.get(`https://api.yelp.com/v3/businesses/search?location=${req.params.query}&term=restaurants&limit=10`, {
    headers: {
      'Authorization': `Bearer ${process.env.API_KEY}`, 'Content-Type': 'application/json'
    },
  })
    .then(apiResponse => res.json(apiResponse.data))
}

function createRestaurant(req, res) {
  axios.get(`https://api.yelp.com/v3/businesses/{id}`)
    .then(apiResponse => res.json(apiResponse.data))
    .catch(err => console.log(err, 'backend err'))
}

function addRestaurant(req, res) {
  Restaurant.create(req.body)
  .then(rest => {
    Trip.findById(req.params.id)
      .then(trip => {
        trip.restaurants.push(rest)
        trip.save() 
          .then(updatedTrip => {
            updatedTrip.populate('restaurants')
            .then(tripRestaurant => {
              res.json(tripRestaurant)
            })
          })
      })
  })
}


export {
  searchRestaurants,
  createRestaurant,
  addRestaurant
}