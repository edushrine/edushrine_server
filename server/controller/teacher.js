const Teacher = require('../model/teacher')
const bcrypt = require('bcryptjs')


/***********Create Teacher */
exports.createTeacher = async(req,res)=>{
    console.log(req.body)
    const {name,email,phone_no,department,password} = req.body
    try{

        const existteacher = await Teacher.findOne({email:req.body.email})
        if(existteacher){
            return res.status(401).json({msg:"email already exists!!"})
        }


        const teacher = new Teacher(req.body)
        const salt = await bcrypt.genSalt(10)
        teacher.password = await bcrypt.hash(password,salt)
        await teacher.save()
        
        res.status(201).json({msg:"Teacher Created Successfully",teacher})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Teacher */
exports.getAllTeacher = async (req,res)=>{
    try{
        const teacher = await Teacher.find()
        res.status(201).json(teacher)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Teacher */

exports.getOneTeacher = async(req,res)=>{
    try{
        const teacher = await Teacher.findById(req.params.id)
        res.status(201).json(teacher)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Teacher */
exports.updateTeacher = async(req,res)=>{
    console.log(req.params)
    try{
        const teacher = await Teacher.findById(req.params.id)
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            teacher.password = await bcrypt.hash(req.body.password,salt)
        }
        await Teacher.updateOne({_id:req.params.id},req.body)
        await teacher.save()
        res.status(201).json({msg:"Teacher Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete Teacher */
exports.deleteTeacher = async(req,res)=>{
    try{
        const teacher = await Teacher.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Teacher deleted Successfully",teacher})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}