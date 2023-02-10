const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {nanoid} = require('nanoid')

const {getOnePTBResult,getAllPTBResult,updatePTBResult,deletePTBResult,createPTBResult,uploadPTBResult} = require('../controller/PTB')


const storage = multer.diskStorage({
        
    destination: function(req, file, cb){
        console.log('first')
        cb(null,'upload');
    },
    filename: function(req, file,cb){

        cb(null, file.fieldname + '_' + nanoid(5) +  path.extname(file.originalname));
    }
})

const upload = multer({storage}); 



router.post('/uploadPTBResult/:id',upload.single('file'),  uploadPTBResult)
router.get('/getAllPTBResults',getAllPTBResult)
router.get('/getOnePTBResults/:id',getOnePTBResult)
router.post('/createPTBResults',createPTBResult)
router.put('/updatePTBResults/:id',updatePTBResult)
router.delete('/deletePTBResults/:id',deletePTBResult)

module.exports = router

