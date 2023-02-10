const mongoose = require('mongoose')


const Schema = mongoose.Schema

const branchSchema = new Schema({
    branch_name:{
        type:String,
        trim:true,
    },
            
    campus:{
        type: Schema.Types.ObjectId, 
        ref: 'Campus'
    }

},{timestamps:true})
module.exports = mongoose.model('Branch',branchSchema)