const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newsSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:[true, 'is required'],        
    },
    image:{
        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    sub_title:{
        type:String,
        trim:true,
        default:"",
    },
    description:{
        type:String,
        trim:true,
        default:''
    },
},{timestamps:true})

module.exports = mongoose.model('News',newsSchema)