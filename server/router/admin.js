const express = require('express');
const router = express.Router()

const {register, getOneAdmin, login, adminProfile,
     getAllAdmin, isAuthenticate,deleteAdmin, updateAdmin,updateNotify} = 
     require('../controller/admin');


router.get('/admin',  getAllAdmin)
router.get('/admin/:id',  getOneAdmin)
router.post('/admin', register)
router.post('/adminAuth', login)
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)
router.get('/adminProfile',isAuthenticate, adminProfile)

 


module.exports = router; 