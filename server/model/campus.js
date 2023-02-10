const mongoose = require('mongoose')


const Schema = mongoose.Schema

const campusSchema = new Schema({
    campus:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    
},{timestamps:true})

module.exports = mongoose.model('Campus',campusSchema)