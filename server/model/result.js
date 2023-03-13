const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resultSchema = new Schema({

    class:{
        type:Number,
    },
   
    exam_name:{
        type:String,
        trim:true,
        default:"",
    },

    register_no:{
        type:String,
        trim:true,
    },
    student_name:{
        type:String,
        trim:true,
    },
    section:{
        type:String,
        trim:true,
    },
    combination:{
        type:String,
        trim:true
    },
    stream:{
        type:String,
        trim:true,
    },
    student_number:{
        type:Number,
        // required:[true,'is required']   
    },
    parent_number:{
        type:Number,
        // required:[true,'is required']
    },
    college:{
        type:String,
        trim:true,
    },
    mentor:{
        type:String,
        trim:true,
    },
 
        language1:Number,
        lang_max_marks:Number,
        english:Number,
        eng_max_marks:Number,

        physics:Number,
        phy_max_marks:Number,
        chemistry:Number,
        chem_max_marks:Number,
        maths:Number,
        math_max_marks:Number,

        finace:Number,
        fin_max_marks:Number,
        marketing:Number,
        marke_max_marks:Number,
        hr:Number,
        hr_max_marks:Number,

        combination4:Number,
        comb4_max_marks:Number,


    total_marks_obtained:{
        type:Number,
    },
    total_marks:{
        type:Number,
    },
    percentage:{
        type:Number,
        default:0
    },
 
},{timestamps:true})
module.exports = mongoose.model('Result',resultSchema)
