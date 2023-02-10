const express = require('express')
const router = express.Router()

const {getOneBlog,getAllBlog,updateBlog,deleteBlog,createBlog} = require('../controller/blog')

router.get('/blog',getAllBlog)
router.get('/blog/:id',getOneBlog)
router.post('/blog',createBlog)
router.put('/blog/:id',updateBlog)
router.delete('/blog/:id',deleteBlog)

module.exports = router