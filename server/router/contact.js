const express = require('express');
const router = express.Router()

const {createContact, getOneContact,
     getAllContact,deleteContact,updateContact} =  require('../controller/contact');


router.get('/contact',  getAllContact)
router.get('/contact/:id',  getOneContact)
router.post('/contact', createContact)
router.put('/contact/:id', updateContact)
router.delete('/contact/:id', deleteContact)
 

 


module.exports = router; 