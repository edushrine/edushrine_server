const Banner = require('../model/banner')

/***********Create Banner */
exports.createBanner = async(req,res)=>{
    console.log(req.body)
    try{

        const banner = new Banner(req.body)
        await banner.save()
        
        res.status(201).json({msg:"Banner Created Successfully",banner})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Banner */
exports.getAllBanner = async (req,res)=>{
    try{
        const banner = await Banner.find()
        res.status(201).json(banner)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Banner */

exports.getOneBanner = async(req,res)=>{
    try{
        const banner = await Banner.findById(req.params.id)
        res.status(201).json(banner)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Banner */
exports.updateBanner = async(req,res)=>{
    console.log(req.params)
    try{
        await Banner.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Banner Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Banner */
exports.deleteBanner = async(req,res)=>{
    console.log(req.params.id)
    try{
        const banner = await Banner.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Banner deleted Successfully",banner})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}