const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'is required']
    },
    email:{
        type:String,
        trim:true,
        required:[true,'is required'],
    },
    phone_no:{
        type:String,
        trim:true,
        required:[true,'is required'],
    },
    role:{
        type:String,
        trim:true,
        required:[true,'is required'],
    },
    password:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },

    campus:{
        type: Schema.Types.ObjectId, 
        ref: 'Campus',
        required:[true, 'is required'],
    }
    
  
  
    }, {timestamps:true})


module.exports = mongoose.model('User',userSchema)