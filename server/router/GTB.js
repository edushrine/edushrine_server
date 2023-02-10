const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {nanoid} = require('nanoid')

const {getOneGTBResult,getAllGTBResult,updateGTBResult,deleteGTBResult,createGTBResult,uploadGTBResult} = require('../controller/GTB')


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



router.post('/uploadGTBResult',upload.single('file'),  uploadGTBResult)
router.get('/getAllGTBResults',getAllGTBResult)
router.get('/getOneGTBResults/:id',getOneGTBResult)
router.post('/createGTBResults',createGTBResult)
router.put('/updateGTBResults/:id',updateGTBResult)
router.delete('/deleteGTBResults/:id',deleteGTBResult)

module.exports = router

