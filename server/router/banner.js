const express = require('express')
const router = express.Router()

const {getOneBanner,getAllBanner,updateBanner,deleteBanner,createBanner} = require('../controller/banner')

router.get('/banner',getAllBanner)
router.get('/banner/:id',getOneBanner)
router.post('/banner',createBanner)
router.put('/banner/:id',updateBanner)
router.delete('/banner/:id',deleteBanner)

module.exports = router