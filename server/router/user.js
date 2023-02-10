const express = require('express')
const router = express.Router()

const {getOneUser,getAllUser,updateUser,deleteUser,createUser,login, isAuthenticate,userProfile} = require('../controller/user')


router.get('/user',getAllUser)
router.get('/user/:id',getOneUser)
router.post('/user',createUser)
router.post('/userAuth',login)
router.put('/user/:id',updateUser)
router.delete('/user/:id',deleteUser)
router.get('/userProfile',isAuthenticate,userProfile)

module.exports = router