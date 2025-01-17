import { searchUnsplash } from '../../services/unsplashService'
import React, { useState } from 'react'
import { getAttractions } from '../../services/yelpService'
import { searchRestaurant } from '../../services/yelpService'
import { Link } from 'react-router-dom'

const Landing = ({ user }) => {


  const [formData, setFormData] = useState({
    query: ''
  })
  const [results, setResults] = useState([])

  const [atrResults, setAtrResults] = useState([])
  const [restResults, setRestResults] = useState([])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      searchUnsplash(formData.query)
        .then(results => {
          setResults(results.results)
        })
        .catch(() => {
          console.log("something went wrong!");
        })
    } catch (err) {
      console.log(err)
    }
  }

  const { query } = formData
  const isFormInvalid = () => {
    return !(query)
  }

  const handleSubmitAttraction = async e => {
    e.preventDefault()
    try {
      getAttractions(formData.query)
        .then(results => {
          setAtrResults(results.businesses)
        })
        .catch(() => {
          console.log("something went wrong!");
        })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitRestaurant = async e => {
    e.preventDefault()
    try {
      searchRestaurant(formData.query)
        .then(results => {
          setRestResults(results.businesses)
        })
        .catch(() => {
          console.log("something went wrong!");
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <main className="container-top">
        <div className="flex-top">
          <div className="top-1">
            <h1 className="logo">X'plor</h1>
          </div>
          <div className="top-2">
            <div className="splash-landing">
              <img src='#' alt="" />
              <h1 className='plan-title'>PLAN YOUR NEXT VACATION</h1>
              <div className="suggestion">
                {/* <div className="arrival">Departure <br />
                  <input type="date" />
                </div>
                <div className="departure">Arrival <br />
                  <input type="date" />
                </div> */}
                <div className="destination">
                  <h4>X'plor some cities before you start planning!</h4>
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      value={query}
                      name="query"
                      onChange={handleChange}
                    />
                    <button
                      disabled={isFormInvalid()}
                    >X'plor!
                    </button>
                  </form>
                  <div className="h3-container">
                    <Link to="/addtrip">
                      <button className="plan-btn">I know where I want to go, let's plan!</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="splash-suggestion">

          <div className="choice-container parent">
            {results.length ?
              <>
                <div className="destination-img">
                  {results.map((photos, idx) =>
                    <img key={photos._id} src={photos.urls.regular} className="city-img" alt="unsplash" />
                  )}
                </div>
              </>
              :
              ''
            }
          </div>
        </div>
        <div className="attractions parent">
          <div className="h3-container">
            <h3 className="titles">X'citing Attractions</h3>
            <form
              autoComplete="off"
              onSubmit={handleSubmitAttraction}
              className='form-mrg'
            >
              <input
                type="text"
                value={query}
                name="query"
                onChange={handleChange}
              />
              <button
                disabled={isFormInvalid()}
              >X'Plor Attractions
              </button>
            </form>
          </div>
          <div className="evt-card-container">
            <div className="destination-img parent">
              {atrResults.length ?
                <>
                  {atrResults.map((attraction, idx) =>
                    <div className="atr-box child">
                      <div className="event-img-div">
                        <img key={attraction._id} src={attraction.image_url} className="event-img" alt="..." />
                      </div>
                      {attraction.name &&
                        <div className="atr-txt">
                          <h5>
                          {attraction.name}
                          </h5>
                        </div>
                      }
                    </div>
                  )}
                </>
                :
                <h1></h1>
              }
            </div>
          </div>
        </div>
        <div className="cuisine-container">
          <div className="h3-container">
            <h3 className="titles">X'cuisite Cuisine</h3>
            <form
              autoComplete="off"
              onSubmit={handleSubmitRestaurant}
              className='form-mrg'
            >
              <input
                type="text"
                value={query}
                name="query"
                onChange={handleChange}
              />
              <button
                disabled={isFormInvalid()}
              >X'Plor Restaurants
              </button>
            </form>
          </div>
          <div className="destination-img parent">
            {restResults.length ?
              <>
                {restResults.map((restaurant, idx) =>
                  <div className="atr-box child">
                    <div className="event-img-div">
                      <img key={restaurant._id} src={restaurant.image_url} className="event-img" alt="..." />
                    </div>
                    {restaurant.name &&
                      <div className="atr-txt">
                        <h5>
                        {restaurant.name}
                        </h5>
                      </div>
                    }
                    
                  </div>
                )}
              </>
              :
              <h1></h1>
            }
          </div>
        </div>
        <div className="final-plan">
          <div className="h3-container">
            <Link to="/addtrip">
              <h1>Start Planning HERE!</h1>
            </Link>
          </div>
        </div>
      </main >
    </>
  )
}



export default Landing