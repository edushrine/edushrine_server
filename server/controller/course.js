const Course = require('../model/course')
 


/***********Create Course */
exports.createCourse = async(req,res)=>{
    console.log(req.body)
    try{
        const course = new Course(req.body)
        await course.save()

        res.status(201).json({msg:"Course Created Successfully",course})
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Course */
exports.getAllCourse = async (req,res)=>{
    try{
        const course = await Course.find()
        res.status(201).json(course)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Course */

exports.getOneCourse = async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id)
        console.log(course)
        res.status(201).json({msg:"One Course material got succesfully",course})

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Course */
exports.updateCourse = async(req,res)=>{
    console.log(req.params)
    try{
        await Course.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Course Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Course */
exports.deleteCourse = async(req,res)=>{
    console.log(req.params.id)
    try{
        const course = await Course.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Course deleted Successfully",course})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}