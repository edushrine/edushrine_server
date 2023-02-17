const mongoose = require('mongoose')

const Schema = mongoose.Schema

const crmSchema = new Schema({

  student_name:{
      type:String,
      trim:true,
      required:[true, 'is required'],
      },
  
      father_name:{
      type:String,
      trim:true,
       },

      school_name:{
      type:String,
      trim:true,
       },

      course:{
      type:String,
      trim:true,
       },

      class:{
      type:String,
      trim:true,
       },

      parent_phone:{
      type:Number,
      trim:true,
      required:[true,'is required']
      },

      area:{
        type:String,
        trim:true,
         },

      branch:{
      type:Schema.Types.ObjectId,
      ref:"Campus",
      },


      remarks:{
      type:String,
      trim:true,
      
      },

      comments:{
      type:String,
      trim:true,
      default:''      
      },

   
      status:{
      type:String,
      trim:true,  
      default:'New'
      },

      }, {timestamps:true})

    module.exports = mongoose.model('CRM', crmSchema)