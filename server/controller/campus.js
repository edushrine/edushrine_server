const Campus = require('../model/campus')

/***********Create Campus */
exports.createCampus = async(req,res)=>{
    console.log(req.body)
    const {campus} = req.body
    try{

        const campusexist = await Campus.findOne({campus:req.body.campus})
        console.log(campusexist)
        if(campusexist){
            return res.status(401).json({msg:"Campus already Exists!"})
        }

        const campus = new Campus(req.body)
        await campus.save()
        
        res.status(201).json({msg:"Campus Created Successfully",campus})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Campus */
exports.getAllCampus = async (req,res)=>{
    try{
        const campus = await Campus.find()
        res.status(201).json(campus)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Campus */

exports.getOneCampus = async(req,res)=>{
    try{
        const campus = await Campus.findById(req.params.id)
        res.status(201).json(campus)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Campus */
exports.updateCampus = async(req,res)=>{
    console.log(req.params)
    try{
        await Campus.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Campus Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Campus */
exports.deleteCampus = async(req,res)=>{
    console.log(req.params.id)
    try{
        const campus = await Campus.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Campus deleted Successfully",campus})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}