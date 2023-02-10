const express = require('express')
const router = express.Router()

const {getOneCampus,getAllCampus,updateCampus,deleteCampus,createCampus} = require('../controller/campus')

router.get('/campus',getAllCampus)
router.get('/campus/:id',getOneCampus)
router.post('/campus',createCampus)
router.put('/campus/:id',updateCampus)
router.delete('/campus/:id',deleteCampus)

module.exports = router