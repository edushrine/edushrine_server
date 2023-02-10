const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {nanoid} = require('nanoid')

const {getOneGTEResults,getAllGTEResults,updateGTEResults,deleteGTEResults,createGTEResults,uploadGTEResult} = require('../controller/GTE')


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



router.post('/uploadGTEResult',upload.single('file'),  uploadGTEResult)
router.get('/getAllGTEResults',getAllGTEResults)
router.get('/getOneGTEResults/:id',getOneGTEResults)
router.post('/createGTEResults',createGTEResults)
router.put('/updateGTEResults/:id',updateGTEResults)
router.delete('/deleteGTEResults/:id',deleteGTEResults)

module.exports = router

