const express = require('express')
const router = express.Router()

const {getOneMarketingManager,getAllMarketingManager,updateMarketingManager,deleteMarketingManager,createMarketingManager,login, isAuthenticate,marketingManagerProfile} = require('../controller/marketManager')


router.get('/marketingManager',getAllMarketingManager)
router.get('/marketingManager/:id',getOneMarketingManager)
router.post('/marketingManager',createMarketingManager)
router.post('/marketingManagerAuth',login)
router.put('/marketingManager/:id',updateMarketingManager)
router.delete('/marketingManager/:id',deleteMarketingManager)
router.get('/marketingManagerProfile',isAuthenticate,marketingManagerProfile)

module.exports = router