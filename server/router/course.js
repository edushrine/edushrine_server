const express = require('express')
const router = express.Router()

const {getOneCourse,getAllCourse,updateCourse,deleteCourse,createCourse} = require('../controller/course')

router.get('/course',getAllCourse)
router.get('/course/:id',getOneCourse)
router.post('/course',createCourse)
router.put('/course/:id',updateCourse)
router.delete('/course/:id',deleteCourse)


module.exports = router