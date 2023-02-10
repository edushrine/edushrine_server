const express = require('express')
const router = express.Router()

const {getOneStudent,getAllStudent,updateStudent,deleteStudent,createStudent,login,updateResult,getBatchStudent,sendAllStudent,sendStudyMaterial,updateNotify} = require('../controller/student')

router.get('/student',getAllStudent)
router.get('/student/:id',getOneStudent)
router.post('/student',createStudent)
router.put('/student/:id',updateStudent)
router.delete('/student/:id',deleteStudent)
router.post('/studentAuth', login)
router.put('/updateResult/:id',updateResult)
router.put('/sendStudyMaterial',sendStudyMaterial)
router.get('/batchStudents/:id',getBatchStudent)
router.put('/sendAll',sendAllStudent)
router.put('/updateNotification/:id',updateNotify)

module.exports = router