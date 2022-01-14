import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const TripForm = (props) => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    city: '',
    startDate: '',
    endDate: '',
    url:{},
  })



  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      props.handleCreateTrip(formData)
      navigate('/profile')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }


  const { city, startDate, endDate} = formData

  const isFormInvalid = () => {
    return !(city, startDate, endDate)
  }

  return (
    <>
      <div className="title-text-div">
        <h1 className="title-text">Create a Trip!</h1>
      </div>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="formContainer"
      >
        <div className="inputContainer">
          <label htmlFor="city" className="label">
            CITY
          </label>
          <input
            type="text"
            autoComplete="off"
            id="city"
            value={city}
            name="city"
            onChange={handleChange} />
        </div>
        <div className="inputContainer">
          <label htmlFor="startDate" className="label">Start Date</label>
          <input
            type="date"
            autoComplete="off"
            id="startDate"
            value={startDate}
            name="startDate"
            onChange={handleChange} />
        </div>
        <div className="inputContainer">
          <label htmlFor="endDate" className="label">End Date</label>
          <input
            type="date"
            autoComplete="off"
            id="endDate"
            value={endDate}
            name="endDate"
            onChange={handleChange} />
        </div>
        <div className="inputContainer">
          <button disabled={isFormInvalid()} className="button">Add Trip</button>
          <Link to="/profile">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default TripForm;