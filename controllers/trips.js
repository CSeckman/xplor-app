import { Trip } from '../models/trip.js'
import axios from 'axios'

function index(req, res) {
  Trip.find({})
  .populate('restaurants')
  .populate('attractions')
    .then(trips => {
      res.json(trips)
    })
}


function create(req, res) {
  req.body.tripHolder = req.user.profile
  Trip.create(req.body)
    .then(trip => {
      axios.get(`https://api.unsplash.com/search/photos/?query=${trip.city} skyline&client_id=${process.env.UN_API}`)
        .then(response => {
          trip.url = response.data.results[0].urls.full
          trip.save()
          .then(tripAndImage => res.json(tripAndImage))
        })
    })
}

function addPackingItem(req, res) {
  Trip.findById(req.params.id)
    .then(trip => {
      trip.packList.push(req.body)
      trip.save()
        .then(tripWithItem => {
          res.json(tripWithItem)
        })
    })
}

function deletePackingItem(req, res) {
  Trip.findById(req.params.tripId)
    .then(trip => {
      let packItems = trip.packList
      packItems.remove({ _id: req.params.itemId })
      trip.save()
        .then(tripWithOutItem => {
          res.json(tripWithOutItem)
        })
    })
}

function addHotel(req, res) {
  Trip.findById(req.params.id)
    .then(trip => {
      trip.hotel.push(req.body)
      trip.save()
        .then(tripWithHotel => {
          res.json(tripWithHotel)
        })
    })
}

function deleteHotel(req, res) {
  Trip.findById(req.params.tripId)
    .then(trip => {
      let hotels = trip.hotel
      hotels.remove({ _id: req.params.hotelId })
      trip.save()
        .then(tripWithOutHotel => {
          res.json(tripWithOutHotel)
        })
    })
}

function addFlight(req, res) {
  Trip.findById(req.params.id)
    .then(trip => {
      trip.flights.push(req.body)
      trip.save()
        .then(tripWithFlight => {
          res.json(tripWithFlight)
        })
    })
}

function deleteFlight(req, res) {
  Trip.findById(req.params.tripId)
    .then(trip => {
      let allFlights = trip.flights
      allFlights.remove({ _id: req.params.flightId })
      trip.save()
        .then(tripWithOutFlight => {
          res.json(tripWithOutFlight)
        })
    })
}

function deleteTrip(req, res) {
  Trip.findByIdAndDelete(req.params.id)
    .then(trip => {
      res.json(trip)
    })
}

function deleteRestaurant(req, res) {
  Trip.findById(req.params.tripId)
  .populate('restaurants')
  .populate('attractions')
    .then(trip => {
      trip.restaurants.remove({_id: req.params.restaurantId})
      trip.save()
      res.json(trip)
    })
}

function deleteAttraction(req, res) {
  Trip.findById(req.params.tripId)
  .populate('restaurants')
  .populate('attractions')
    .then(trip => {
      trip.attractions.remove({_id: req.params.attractionId})
      trip.save()
      res.json(trip)
    })
}



export {
  index,
  create,
  addPackingItem,
  deletePackingItem,
  deleteTrip as delete,
  addHotel,
  addFlight,
  deleteHotel,
  deleteFlight,
  deleteRestaurant,
  deleteAttraction
}