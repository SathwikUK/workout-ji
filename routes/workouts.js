const express = require('express')
const { createWorkout,getWorkout,getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutControllers')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)//file the middleware func before other routes .... as authenticator to use all other middlewares

router.get('/', getWorkouts)

//get a single workout

router.get('/:id',getWorkout)


router.post('/',createWorkout);


router.delete('/:id' ,deleteWorkout)
router.patch('/:id' ,updateWorkout)

module.exports = router