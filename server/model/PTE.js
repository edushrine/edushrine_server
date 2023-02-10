const mongoose = require('mongoose')


const Schema = mongoose.Schema

const PTESchema = new Schema({
    
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
   phy_r:{
      type:Number,
   },
   phy_w:{
      type:Number,
   },
   phy_l:{
      type:Number,
   },
   phy_m:{
      type:Number,
   },
   phy_rank:{
      type:Number,
   },
   che_r:{
      type:Number,
   },
   che_w:{
      type:Number,
   },
   che_l:{
      type:Number,
   },
   che_m:{
      type:Number,
   },
   che_rank:{
      type:Number,
   },
   mat_r:{
      type:Number,
   },
   mat_w:{
      type:Number,
   },
   mat_l:{
      type:Number,
   },
   math_m:{
      type:Number,
   },
   math_rank:{
      type:Number,
   },
   bio_r:{
      type:Number,
   },
   bio_w:{
      type:Number,
   },
   bio_l:{
      type:Number,
   },
   bio_m:{
      type:Number,
   },
   bio_rank:{
      type:Number,
   },
   total_m:{
      type:Number,
   },
   final_r:{
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

module.exports = mongoose.model('PTE',PTESchema)