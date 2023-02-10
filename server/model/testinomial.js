const mongoose = require('mongoose')

const Schema = mongoose.Schema

const testinomialSchema = new Schema({
    image:{
        type:String,
        trim:true,
        required:[true, 'is required'],

    },
    title:{
        type:String,
        trim:true,
        required:[true, 'is required'],

        
    },
    description:{
        type:String,
        trim:true,
        required:[true, 'is required'],

    },
    author:{
        type:String,
        trim:true,
        required:[true, 'is required'],

    }



},{timeStamps:true})

module.exports = mongoose.model('Testinomial',testinomialSchema)