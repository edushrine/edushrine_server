const Testinomial = require('../model/testinomial')

/***********Create Testinomial */
exports.createTestinomial = async(req,res)=>{
    console.log(req.body)
    try{

        const testinomial = new Testinomial(req.body)
        await testinomial.save()
        
        res.status(201).json({msg:"Testinomial Created Successfully",testinomial})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Testinomial */
exports.getAllTestinomial = async (req,res)=>{
    try{
        const testinomial = await Testinomial.find()
        res.status(201).json(testinomial)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Testinomial */

exports.getOneTestinomial = async(req,res)=>{
    try{
        const testinomial = await Testinomial.findById(req.params.id)
        res.status(201).json(testinomial)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Testinomial */
exports.updateTestinomial = async(req,res)=>{
    console.log(req.params)
    try{
        await Testinomial.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Testinomial Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete Testinomial */
exports.deleteTestinomial = async(req,res)=>{
    try{
        const testinomial = await Testinomial.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Testinomial deleted Successfully",testinomial})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}