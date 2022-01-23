import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import cors from 'cors'


import { router as usersRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'
import { router as tripsRouter } from './routes/trips.js'
import { router as restaurantsRouter } from './routes/restaurants.js'
import { router as attractionsRouter } from './routes/attractions.js'
import { router as unsplashRouter } from './routes/unsplash.js'

import('./config/database.js')



const app = express()

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)),'build')))
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/trips', tripsRouter)
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/attractions', attractionsRouter)
app.use('/api/unsplash', unsplashRouter)



app.get("/*", function (req, res) {
  res.sendFile(
    path.resolve("build/index.html")
  )
})


const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Express is listening on port ${port}.`)
})


