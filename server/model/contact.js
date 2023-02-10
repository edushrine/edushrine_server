const mongoose = require('mongoose');
 

const Schema = mongoose.Schema

const contactSchema = new Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    message:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    phone_no:{
        type:Number,
        trim:true,
    },
  
    }, {timestamps:true})


module.exports = mongoose.model('Contact', contactSchema)