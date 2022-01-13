import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import Users from '../Users/Users'
import TripDetails from '../TripDetails/TripDetails'
import Profile from '../Profile/Profile'
import Unsplash from '../Unsplash/Unsplash'
import * as authService from '../../services/authService'
import TripForm from '../../components/TripForm/TripForm'
import { createTrip, getTrips, addPackingItem, deletePackingItem, deleteTrip, addHotel, addFlight, deleteHotel, deleteFlight, addRestaurant, addAttraction, deleteAttraction, deleteRestaurant} from '../../services/tripService'

const App = () => {
	const [user, setUser] = useState(authService.getUser())
	const [trips, setTrips] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		getTrips()
			.then(trips => setTrips(trips))
	}, [])

	const handleLogout = () => {
		authService.logout()
		setUser(null)
		navigate('/')
	}

	const handleSignupOrLogin = () => {
		setUser(authService.getUser())
	}

	const handleCreateTrip = tripData => {
		createTrip(tripData)
			.then(newTrip => setTrips([...trips, newTrip]))
	}

	const handleAddPackingItem = newItemData => {
		addPackingItem(newItemData)
			.then(updatedTripData => {
				let updatedTrips = trips.map(trip => trip.App_id === updatedTripData._id ? updatedTripData : trip)
				setTrips(updatedTrips)
				navigate('/tripDetails', { state: updatedTripData })
			})
	}

	const handleDeletePackingItem = (itemId, tripId) => {
		deletePackingItem(itemId, tripId)
			.then(updatedTrip => {
				let newTripState = trips.map(trip => trip._id === updatedTrip._id ? updatedTrip : trip)
				setTrips(newTripState)
				navigate('/tripDetails', { state: updatedTrip })
			})
	}

	const handleAddHotel = newHotelData => {
		addHotel(newHotelData)
			.then(updatedTripData => {
				let updatedTrips = trips.map(trip => trip.App_id === updatedTripData._id ? updatedTripData : trip)
				setTrips(updatedTrips)
				navigate('/tripDetails', { state: updatedTripData })
			})
	}

	const handleDeleteHotel = (hotelId, tripId) => {
		deleteHotel(hotelId, tripId)
			.then(updatedTrip => {
				let newTripState = trips.map(trip => trip._id === updatedTrip._id ? updatedTrip : trip)
				setTrips(newTripState)
				navigate('/tripDetails', { state: updatedTrip })
			})
	}

	const handleAddFlight = newFlightData => {
		addFlight(newFlightData)
			.then(updatedTripData => {
				let updatedTrips = trips.map(trip => trip.App_id === updatedTripData._id ? updatedTripData : trip)
				setTrips(updatedTrips)
				navigate('/tripDetails', { state: updatedTripData })
			})
	}

	const handleDeleteFlight = (flightId, tripId) => {
		deleteFlight(flightId, tripId)
			.then(updatedTrip => {
				let newTripState = trips.map(trip => trip._id === updatedTrip._id ? updatedTrip : trip)
				setTrips(newTripState)
				navigate('/tripDetails', { state: updatedTrip })
			})
	}

	const handleDeleteTrip = (id) => {
		deleteTrip(id)
			.then(deletedTrip => {
				setTrips(trips.filter(trip => trip._id !== deletedTrip._id))
				navigate('/profile', { state: trips })
			})
	}

	const handleAddRestaurant = (restaurant, trip) => {
		addRestaurant(restaurant, trip)
			.then(updatedTrip => {
				let updatedTrips = trips.map(trip => trip.App_id === updatedTrip._id ? updatedTrip : trip)
				setTrips(updatedTrips)
				navigate('/tripDetails', { state: updatedTrip })
			})
	}


	const handleAddAttraction = (attraction, trip) => {
	addAttraction(attraction, trip)
		.then(updatedTrip => {
			let updatedTrips = trips.map(trip => trip.App_id === updatedTrip._id ? updatedTrip : trip)
			setTrips(updatedTrips)
			navigate('/tripDetails', { state: updatedTrip })
		})
	}

	const handleDeleteAttraction = (attractionId, tripId) => {
		deleteAttraction(attractionId, tripId)
			.then(updatedTrip => {
				let newTripState = trips.map(trip => trip._id === updatedTrip._id ? updatedTrip : trip)
				setTrips(newTripState)
				navigate('/tripDetails', { state: updatedTrip })
			})
	}

	const handleDeleteRestaurant = (restaurantId, tripId) => {
		deleteRestaurant(restaurantId, tripId)
			.then(updatedTrip => {
				let newTripState = trips.map(trip => trip._id === updatedTrip._id ? updatedTrip : trip)
				setTrips(newTripState)
				navigate('/tripDetails', { state: updatedTrip })
			})
	}

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout} />
			<Routes>
				<Route path='/' element={<Landing user={user} />} />
				<Route path='/signup' element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} />
				<Route path='/login' element={<Login handleSignupOrLogin={handleSignupOrLogin} />} />
				<Route path='/users' element={user ? <Users /> : <Navigate to='/login' />} />
				<Route path='/profile' element={user ? <Profile handleDeleteTrip={handleDeleteTrip} user={user} trips={trips} /> : <Navigate to='/signup' />} />
				<Route path='/addTrip' element={<TripForm handleCreateTrip={handleCreateTrip} />} />
				<Route path='/searchUnsplash' element={<Unsplash />} />
				<Route path='/tripDetails' element={<TripDetails handleAddRestaurant={handleAddRestaurant} handleAddAttraction={handleAddAttraction} handleAddPackingItem={handleAddPackingItem} handleDeletePackingItem={handleDeletePackingItem} handleAddHotel={handleAddHotel} handleAddFlight={handleAddFlight} handleDeleteFlight={handleDeleteFlight} handleDeleteHotel={handleDeleteHotel} handleDeleteRestaurant={handleDeleteRestaurant} handleDeleteAttraction={handleDeleteAttraction}/>} />
			</Routes>
		</>
	);
}

export default App;