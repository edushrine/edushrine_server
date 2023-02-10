const Broadcast = require('../model/broadcast')

/***********Create Broadcast */
exports.createBroadcast = async(req,res)=>{
    console.log(req.body)
    try{

        const broadcast = new Broadcast(req.body)
        await broadcast.save()
        
        res.status(201).json({msg:"Broadcast Created Successfully",broadcast})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Broadcast */
exports.getAllBroadcast = async (req,res)=>{
    try{
        const broadcast = await Broadcast.find()
        res.status(201).json(broadcast)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}


/*********Get Student Broadcast***********/
exports.getAllBroadcastStudent = async(req,res)=>{
   
    try{
    const broadcast = await Broadcast.find({target:"student"}).sort({ createdAt:-1})
    res.status(201).json({msg:'All Broadcast Customers get Successfully', broadcast})
    }
    catch(error){

    res.status(401).json({msg:"Something went wrong"})
}

}

/*********Get Parent Broadcast***********/
exports.getAllBroadcastParent = async(req,res)=>{
   
    try{

    const broadcast = await Broadcast.find({target:"parent"}).sort({ createdAt:-1})
    res.status(201).json({msg:'All Broadcast Customers get Successfully', broadcast})
    }
    catch(error){

    res.status(401).json({msg:"Something went wrong"})
}

}

/*************get one Broadcast */

exports.getOneBroadcast = async(req,res)=>{
    try{
        const broadcast = await Broadcast.findById(req.params.id)
        res.status(201).json(broadcast)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Broadcast */
exports.updateBroadcast = async(req,res)=>{
    console.log(req.params)
    try{
        await Broadcast.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Broadcast Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Broadcast */
exports.deleteBroadcast = async(req,res)=>{
    console.log(req.params.id)
    try{
        const broadcast = await Broadcast.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Broadcast deleted Successfully",broadcast})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}