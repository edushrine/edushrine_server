const express = require('express')
const router = express.Router()

const {getOneTestinomial,getAllTestinomial,updateTestinomial,deleteTestinomial,createTestinomial} = require('../controller/testinomial')

router.get('/testimonial',getAllTestinomial)
router.get('/testimonial/:id',getOneTestinomial)
router.post('/testimonial',createTestinomial)
router.put('/testimonial/:id',updateTestinomial)
router.delete('/testimonial/:id',deleteTestinomial)

module.exports = router