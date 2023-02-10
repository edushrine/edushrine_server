const express = require('express')
const router = express.Router()

const {getOneBranch,getAllBranch,updateBranch,deleteBranch,createBranch, getCampusBranch} = require('../controller/branch')

router.get('/branch',getAllBranch)
router.get('/comBranch/:id',getCampusBranch)
router.get('/branch/:id',getOneBranch)
router.post('/branch',createBranch)
router.put('/branch/:id',updateBranch)
router.delete('/branch/:id',deleteBranch)

module.exports = router