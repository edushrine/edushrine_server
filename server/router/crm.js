const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {nanoid} = require('nanoid')


const {getOneCRM,getAllCRM,updateCRM,deleteCRM,createCRM,uploadfileCRM} = require('../controller/crm')


const storage = multer.diskStorage({
        
    destination: function(req, file, cb){
        cb(null,'./upload');
    },
    filename: function(req, file,cb){

        cb(null, file.fieldname + '_' + nanoid(5) +  path.extname(file.originalname));
    }
})

const upload = multer({storage}); 



router.post('/customerByExcel/:id',upload.single('file'),  uploadfileCRM)
router.get('/crm',getAllCRM)
router.get('/crm/:id',getOneCRM)
router.post('/crm',createCRM)
router.put('/crm/:id',updateCRM)
router.delete('/crm/:id',deleteCRM)

module.exports = router