const mongoose = require('mongoose')


const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        trim:true,
        required:[true, 'is required'],

    },
    image:{
        type:String,
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
        required:[true, 'is required'],
    },
    author:{
        type:String,
        trim:true,
        default:''
    },
},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)