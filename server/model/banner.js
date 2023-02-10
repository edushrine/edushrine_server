const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bannerSchema = new Schema({
    banner_title:{
        type:String,
        trim:true,
    },
    banner_image:{
        type:String,
        trim:true,  
    },
    sub_title:{
        type:String,
        trim:true, 
        default:"",
    },
   description:{
      type:String,
       trim:true,
       required:[true,'is required'],
   },
},{timestamps:true})

module.exports = mongoose.model('Banner',bannerSchema)