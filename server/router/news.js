const express = require('express')
const router = express.Router()

const {getOneNews,getAllNews,updateNews,deleteNews,createNews} = require('../controller/news')

router.get('/news',getAllNews)
router.get('/news/:id',getOneNews)
router.post('/news',createNews)
router.put('/news/:id',updateNews)
router.delete('/news/:id',deleteNews)

module.exports = router