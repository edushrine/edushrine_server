const mongoose = require('mongoose');
 

const Schema = mongoose.Schema

const broadcastSchema = new Schema({
    title:{
        type:String,
        trim:true,
    },

    target:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
  
    }, {timestamps:true})


module.exports = mongoose.model('Broadcast', broadcastSchema)