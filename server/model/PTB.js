const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PTBSchema = new Schema({
   register_no:{
       type:String,
       trim:true,
   },
   student_name:{
       type:String,
       trim:true,
   },
   exam_name:{
       type:String,
       trim:true,
   },
   lang_marks:{
       type:Number,
   },
   lang_marks_obtained:{
       type:Number,
   },
   eng_marks:{
       type:Number,
   },
   eng_marks_obtained:{
       type:Number,
   },
   phy_marks:{
       type:Number,
   },
   phy_marks_obtained:{
       type:Number,
   },

   chem_marks:{
       type:Number,
   },
   chem_marks_obtained:{
       type:Number,
   },
   math_marks:{
    type:Number,
   },
   math_marks_obtained:{
    type:Number,
   },
   combination4_marks:{
    type:Number,
   },
   combination4_obtained:{
    type:Number,
   },
   total_marks:{
    type:Number,
   },
   total_marks_obtained:{
    type:Number,
   },
   percentage:{
    type:Number,
   },


   student_number:{
       type:Number,
       required:[true,'is required']   
   },
   parent_number:{
       type:Number,
       required:[true,'is required']
   },
   sent:{
    type:Boolean,
    default:false,
   },
},{timestamps:true})

module.exports = mongoose.model('PTB',PTBSchema)