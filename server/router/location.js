const express = require('express')
const router = express.Router()
const path = require('path')



const {getOneLocation,getAllLocation,updateLocation,deleteLocation,createLocation,} = require('../controller/location')



router.get('/location',getAllLocation)
router.get('/location/:id',getOneLocation)
router.post('/location',createLocation)
router.put('/location/:id',updateLocation)
router.delete('/location/:id',deleteLocation)

module.exports = router