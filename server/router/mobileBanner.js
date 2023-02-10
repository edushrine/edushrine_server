const express = require('express')
const router = express.Router()

const {getOnemobileBanner,getAllmobileBanner,updatemobileBanner,deletemobileBanner,createmobileBanner} = require('../controller/mobilebanner')

router.get('/mobile-banner',getAllmobileBanner)
router.get('/mobile-banner/:id',getOnemobileBanner)
router.post('/mobile-banner',createmobileBanner)
router.put('/mobile-banner/:id',updatemobileBanner)
router.delete('/mobile-banner/:id',deletemobileBanner)

module.exports = router