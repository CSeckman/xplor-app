import { Link } from 'react-router-dom'
import React, { useState , useEffect } from 'react'
import { getTrips } from '../../services/tripService'



const Profile = (props) => {
const [myTrips, setMyTrips] = useState([])

useEffect(() => {
  getTrips()
  .then(allTrips => {
    const allMyTrips = allTrips.filter(trip => trip.tripHolder === props.user.profile)
    setMyTrips(allMyTrips)
  })
}, [])

console.log("my trips", myTrips)
  return (
    <main className="container">
      <h1 className="text">
        {props.user.name}'s Trips
      </h1>
      <Link to='/addTrip' >Add trip</Link>
      <div>
        <ul className="trips">
        {myTrips.map(trip => 
          <li className="trip">
            {trip.city}
          </li>
        )}
        </ul>
      </div>
    </main>
  )
}
 
export default Profile