import { Router } from 'express'
import * as restaurantsCtrl from '../controllers/restaurants.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, restaurantsCtrl.index)

export { router }