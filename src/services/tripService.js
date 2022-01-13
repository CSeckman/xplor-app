import * as tokenService from '../services/tokenService'
const BASE_URL = '/api/trips'

function getTrips() {
    return fetch(BASE_URL, {
        headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
        .then(res => res.json())
}

function createTrip(formData) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
}

function addPackingItem(newItemData) {
    return fetch(`${BASE_URL}/${newItemData.trip}/packingList`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItemData)
    })
        .then(res => res.json())
}

function deletePackingItem(itemId, tripId) {
    return fetch(`${BASE_URL}/${tripId}/packList/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
        .then(res => res.json())
}

function addHotel(newHotelData) {
    return fetch(`${BASE_URL}/${newHotelData.trip}/hotel`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify(newHotelData)
    })
        .then(res => res.json())
}

function deleteHotel(hotelId, tripId) {
    return fetch(`${BASE_URL}/${tripId}/hotels/${hotelId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
        .then(res => res.json())
}

function addFlight(newFlightData) {
    return fetch(`${BASE_URL}/${newFlightData.trip}/flight`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFlightData)
    })
        .then(res => res.json())
}

function deleteFlight(flightId, tripId) { 
    return fetch(`${BASE_URL}/${tripId}/flights/${flightId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
        .then(res => res.json())
}

function updateTrip(formData) {
    return fetch(`${BASE_URL}/${formData.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
}

function deleteTrip(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
        .then(res => res.json())
}

function addRestaurant(newRestaurantData, trip) {
    return fetch(`/api/restaurants/${trip._id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRestaurantData)
    })
        .then(res => res.json())
}

function addAttraction(newAttractionData, trip) {
    return fetch(`/api/attractions/${trip._id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAttractionData)
    })
        .then(res => res.json())
}

function deleteRestaurant(restaurantId, tripId) {
    return fetch(`${BASE_URL}/${tripId}/restaurants/${restaurantId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
        .then(res => res.json())
}

function deleteAttraction(attractionId, tripId) {
    return fetch(`${BASE_URL}/${tripId}/attractions/${attractionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
        .then(res => res.json())
}

export {

    getTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    addPackingItem,
    deletePackingItem,
    addHotel,
    addFlight,
    deleteFlight,
    deleteHotel,
    addRestaurant,
    addAttraction,
    deleteAttraction,
    deleteRestaurant
}

