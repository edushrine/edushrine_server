const mongoose = require('mongoose')

const Schema = mongoose.Schema

const marketManagerSchema = new Schema({
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
    password:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },

    branch:[{
        type: Schema.Types.ObjectId, 
        ref: 'Campus'
    }],
 
   
},{timestamps:true})

module.exports = mongoose.model('marketingManager',marketManagerSchema)