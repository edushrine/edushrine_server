const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {nanoid} = require('nanoid')

const {getOnePTEResults,getAllPTEResults,updatePTEResults,deletePTEResults,createPTEResults,uploadPTEResult} = require('../controller/PTE')


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



router.post('/uploadPTEResult/:id',upload.single('file'),  uploadPTEResult)
router.get('/getAllPTEResults',getAllPTEResults)
router.get('/getOnePTEResults/:id',getOnePTEResults)
router.post('/createPTEResults',createPTEResults)
router.put('/updatePTEResults/:id',updatePTEResults)
router.delete('/deletePTEResults/:id',deletePTEResults)

module.exports = router

