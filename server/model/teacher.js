const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teacherSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },

    email:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },

    phone_no:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    
    department:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },

    password:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },
 
   
},{timestamps:true})

module.exports = mongoose.model('Teacher',teacherSchema)