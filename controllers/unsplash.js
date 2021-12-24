import axios from 'axios'



function getRandom(req,res) {
  axios.get(`https://api.unsplash.com/photos/random/?query=${req.params.query}&client_id=${process.env.UN_API}`)
  .then(apiResponse => res.json(apiResponse.data))
  .catch(err => console.log(err, 'get random backend err'))
}

function searchUnsplash(req,res) {
  console.log(req.params.query)
  axios.get(`https://api.unsplash.com/search/photos?query=${req.params.query}&per_page=8&client_id=${process.env.UN_API}`)
  .then(apiResponse => res.json(apiResponse.data))
  .catch(err => console.log(err, 'search backend err'))
}

export {
  getRandom,
  searchUnsplash,
}


