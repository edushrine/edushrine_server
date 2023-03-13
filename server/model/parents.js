const mongoose = require('mongoose')

const Schema = mongoose.Schema

const parentsSchema = new Schema({
 
    parents_name:{
        type:String,
        trim:true,
    },
    phone_number:{
        type:Number,
    },
    password:{
        type:String,
        trim:true,
        required:[true,'is required']
    },

},{timestamps:true})
module.exports = mongoose.model('Parents',parentsSchema)
