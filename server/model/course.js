const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({

    material_type:{
        type:String,
        trim:true,
        required:[true,'is required'],
    },
    course_subject:{
        type: String,
        trim:true,
       required:[true,'is required'],
    },
    chapter:{
        type:String,
        trim:true,
        default:"",
    },

    course_title:{
       type:String,
       trim:true,
       required:[true,'is required'],

    },
    description:{
        type:String,
        trim:true,
        default:"",
    },
    for_class:{
        type:String,
        trim:true,
        default:"",
    },
    prepared_by:{
        type:String,
        trim:true,
        default:'',
    },
  attachments:{
    type:String,
    trim:true,
    
  },



},{timestamps:true})

module.exports = mongoose.model('Course', courseSchema)
