const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {nanoid} = require('nanoid')

const {getOneResult,getAllResult,updateResult,deleteResult,createResult,uploadfileResult} = require('../controller/result')


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



router.post('/resultByExcel',upload.single('file'),  uploadfileResult)
router.get('/result',getAllResult)
router.get('/result/:id',getOneResult)
router.post('/result',createResult)
router.put('/result/:id',updateResult)
router.delete('/result/:id',deleteResult)

module.exports = router

