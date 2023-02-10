const express = require('express')
const router = express.Router()

const {getOneTeacher,getAllTeacher,updateTeacher,deleteTeacher,createTeacher} = require('../controller/teacher')

router.get('/teacher',getAllTeacher)
router.get('/teacher/:id',getOneTeacher)
router.post('/teacher',createTeacher)
router.put('/teacher/:id',updateTeacher)
router.delete('/teacher/:id',deleteTeacher)

module.exports = router