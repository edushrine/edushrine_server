const express = require('express');
const router = express.Router()

const {createBroadcast,getAllBroadcast, getOneBroadcast, updateBroadcast, getAllBroadcastStudent,getAllBroadcastParent,  deleteBroadcast} = require('../controller/broadcast');


router.post('/broadcast',  createBroadcast)
router.get('/broadcast',  getAllBroadcast)
router.get('/broadcast-student',  getAllBroadcastStudent)
router.get('/broadcast-parent',  getAllBroadcastParent)
router.get('/broadcast/:id',  getOneBroadcast)
router.put('/broadcast/:id',  updateBroadcast)
router.delete('/broadcast/:id',  deleteBroadcast)


module.exports = router