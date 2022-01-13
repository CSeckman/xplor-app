import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getTrips } from '../../services/tripService'
import { searchUnsplash } from '../../services/unsplashService'
import 'bootstrap/dist/css/bootstrap.min.css'

const Profile = (props) => {
  const [myTrips, setMyTrips] = useState([])

  const [formData, setFormData] = useState({
    query: ''
  })
  const [results, setResults] = useState([])

  useEffect(() => {
    getTrips()
      .then(allTrips => {
        const allMyTrips = allTrips.filter(trip => trip.tripHolder === props.user.profile)
        setMyTrips(allMyTrips)
      })
  }, [props.trips])

  return (
    <main className="main-area">
      <h1 className="profile-text">
        {props.user.name}'s Trips
      </h1>
      <Link className="btn btn-light" to='/addTrip' >Add trip</Link>
      <div className="parent-div">
        {myTrips.map(trip =>
          <div key={trip._id} className="card child-div" >
            <div className="card-header">
              <h3>{trip.city}</h3>
            </div>
            <div className="prof-trip-img-div">
              <img className="prof-trip-img" src={trip.url} alt="{trip.city}" />
            </div>
            <div className="card-body trip-bottom-card">
              <Link className="btn btn-light" to='/tripDetails' state={trip}>Trip Details</Link>
              <button className="btn btn-light" onClick={() => props.handleDeleteTrip(trip._id)}>Delete Trip</button>
            </div>
          </div>
          )}
      </div>
    </main>
  )
}

export default Profile