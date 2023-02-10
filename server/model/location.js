const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema = new Schema({

     

      location:{
      type:String,
      trim:true,
      required:[true,'is required']
      }
      
    })

    module.exports = mongoose.model('Location', locationSchema)