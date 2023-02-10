const Branch = require('../model/branch')

/***********Create Branch */
exports.createBranch = async(req,res)=>{
    console.log(req.body)

    const {branch_name } = req.body
    try{

        
        const branchexist = await Branch.findOne({branch_name:branch_name})
        console.log(branchexist)
        if(branchexist){
            return res.status(401).json({msg:"Batch already Exists!"})
        }
        
        const branch = new Branch(req.body)
        await branch.save()
        
        res.status(201).json({msg:"Batch Created Successfully",branch})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Branch */
exports.getAllBranch = async (req,res)=>{
    try{
        const branch = await Branch.find().populate('campus').exec()
        res.status(201).json(branch)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

exports.getCampusBranch = async (req,res)=>{
    console.log('========>campus id',req.params.id)
    try{
        const branch = await Branch.find({campus:req.params.id}).populate('campus').exec()
        res.status(201).json(branch)
        console.log('.////////////////')
        console.log(branch )
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Branch */

exports.getOneBranch = async(req,res)=>{
    try{
        const branch = await Branch.findById(req.params.id)
        console.log(branch)
        res.status(201).json(branch)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Branch */
exports.updateBranch = async(req,res)=>{
    console.log(req.params)
    try{
        await Branch.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Branch Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Branch */
exports.deleteBranch = async(req,res)=>{
    console.log(req.params.id)
    try{
        const branch = await Branch.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Branch deleted Successfully",branch})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}