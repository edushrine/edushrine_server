const Location = require('../model/location')
const Crm = require('../model/crm')
const xlsx =require('xlsx')
const fs = require('fs')


/***********Create Location */
exports.createLocation = async(req,res)=>{
    console.log(req.body)
    try{

        const location = new Location(req.body)
        await location.save()
        
        res.status(201).json({msg:"Location Created Successfully",location})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Location */
exports.getAllLocation = async (req,res)=>{
    try{
        const location = await Location.find()
        res.status(201).json(location)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Location */

exports.getOneLocation = async(req,res)=>{
    try{
        const location = await Location.findById(req.params.id)
        res.status(201).json(location)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Location */
exports.updateLocation = async(req,res)=>{
    console.log(req.params)
    try{
        await Location.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Location Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete Location */
exports.deleteLocation = async(req,res)=>{
    try{
        const location = await Location.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Location deleted Successfully",location})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}
