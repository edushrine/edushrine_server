const Student = require('../model/student')
const Campus = require('../model/campus')
const Branch = require('../model/branch')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PTE = require('../model/PTE');
const GTE = require('../model/GTE')
const PTB = require('../model/PTB');
const GTB = require('../model/GTB')
const Course = require('../model/course')



const maxAge = 3 * 24 * 60 * 60

const createToken = (id) =>{

return jwt.sign({id},  process.env.JWT_SECRET, {
    expiresIn:maxAge
})
  
}

 /***********Create Student */
exports.createStudent = async(req,res)=>{

    console.log(req.body)
    const {student_numb,parent_numb,register_no}= req.body
    
    try{
        const studentexist = await Student.findOne( {$or: [{student_numb:student_numb},{parent_numb:parent_numb},{register_no:register_no}]})

        if(studentexist){
            console.log(studentexist)
            const studentPhoneexist = await Student.findOne({student_numb:student_numb})
            if(studentPhoneexist){

                console.log('student exists')
                return res.status(401).json({msg:"Student Phone number already Exists!"})
            }
            else {
                const parentPhoneexist = await Student.findOne({parent_numb:parent_numb})
                if(parentPhoneexist){
                    console.log('student exists')
                    return res.status(401).json({msg:"Parent Phone number already Exists!"})
                }
                else {
                const studentRegisterexist = await Student.findOne({register_no:register_no})
                if(studentRegisterexist){
                    console.log('student exists')
                    return res.status(401).json({msg:"Student Register number already Exists!"})
                }

            }

            }

        }
        // const existstudent = await Student.findOne({student_numb:student_numb})

        // if(existstudent){
        //     return res.status(401).json({msg:"Student Number already Exists!"})
        // }

        // const existregisterNumber = await Student.findOne({register_no:register_no})
        // if(existregisterNumber){
        //     console.log("Yes here")
        //     return res.status(401).json({msg:"Student Register Number already Exists!"})
        // }


        
        // const existParent = await Student.findOne({parent_numb:parent_numb})
        
        // if(existParent){
        //     return res.status(401).json({msg:"Parent Number already Exists!"})
        // }
        const student = new Student(req.body)
        
        if(req.body.student_password){
            const salt = await bcrypt.genSalt(10)
            student.student_password = await bcrypt.hash(req.body.student_password,salt)
        }
        

         if(req.body.parent_password){
        const salt2 = await bcrypt.genSalt(10)
        student.parent_password = await bcrypt.hash(req.body.parent_password,salt2)
    }
    // const branch = await Branch.findById(req.body.batch)
    // console.log('The Batch is',branch);

    // student.register_no = branch.branch_name+req.body.register_no;

    // console.log("The register number is",student.register_no)
        await student.save()
        
        res.status(201).json({msg:"Student Created Successfully",student})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}

/**********Get All Student */
exports.getAllStudent = async (req,res)=>{
    try{
        const student = await Student.find().populate('campus').populate('batch')
        .exec()
        res.status(201).json(student)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Student */

exports.getOneStudent = async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id).populate('batch').populate('campus').populate('course_materials').exec()
        res.status(201).json(student)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Student */
exports.updateStudent = async(req,res)=>{
    console.log(req.params)
    console.log(req.body)
    try{
        const student = await Student.findById(req.params.id)
        if(req.body.student_password !== student.student_password){
            const salt = await bcrypt.genSalt(10)
            student.student_password = await bcrypt.hash(req.body.student_password,salt)
        }
        
        if(req.body.parent_password!=student.parent_password){
            const salt = await bcrypt.genSalt(10)
            student.parent_password = await bcrypt.hash(req.body.parent_password,salt)
        } 
        
        // const campus = await Campus.findById(req.body.campus)
        // console.log("The Campus is")
        // console.log(campus)


        // const branch = await Branch.findById(req.body.batch)
        // console.log('The Batch is',branch);

        // student.register_no = branch.branch_name+req.body.register_no;

        // console.log("The register number is",student.register_no)
        await Student.updateOne({_id:req.params.id},req.body)
        await student.save()
        res.status(201).json({msg:"Student Updated Successfully",student})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Student */
exports.deleteStudent = async(req,res)=>{
    console.log(req.params.id)
    try{
        const student = await Student.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Student deleted Successfully",student})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}


/*******************login ***********/
exports.login = async(req,res)=>{

    console.log(req.body)

    const {student_numb,parent_numb,student_password,parent_password} = req.body
    try{
        const student = await Student.findOne( {$or: [{student_numb:student_numb},{parent_numb:parent_numb}]}).populate('campus').populate('batch').populate('course_materials.material').populate('ptb_results').
        populate('pte_results').populate('gtb_results').populate('gte_results').sort({createdAt:-1}).exec()

        // console.log(student)

        if(!student){

            return res.status(400).json({msg:'Invalid User'})
        }

        if(student_numb){
            const isMatchStudent = await bcrypt.compare(student_password,student.student_password)
            student.role="student"
            if(!isMatchStudent){
                return  res.status(400).json({msg:'Invalid Student Password'})
            }
        }
        if(parent_numb)
        {
                const isParentMatch = await bcrypt.compare(parent_password,student.parent_password)
                student.role = "parent"
                if(!isParentMatch){
                    return  res.status(400).json({msg:'Invalid Parent Password'})
                }

        }        
         



        const token = createToken(student._id)
        console.log(student.role)
        
        console.log(req.body)
     
        await student.save()

        res.status(201).json({msg:"Logged-in Successfully",token,student,role:student.role})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"something went wrong",error})
    }
}

 
    /******** profile*********/
    exports.loginProfile = async (req, res)=>{


        try {
    
           const student = await Student.findById(req.student._id).select({$or:['student_password','']})
           
           if(!student) {   
    
            return res.status(401).json({json:"no Authorization"})
           }
    
        res.status(201).json(student) 
    
        } catch (error) {
                res.status(401).json({msg:"Something went wrong"}) 
    
        }   
    }
    
    
    /******* Authenticate ********/
    exports.isAuthenticate = async (req, res, next) =>{

        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        
        ){ 
            try {  
            
               let token = req.headers.authorization.split(' ')[1]
                         
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
                req.student = await Admin.findById(decoded.id).select('-password')
                next()
        
            } catch (error) {
        
                res.status(401).json({error:error.message}) 
            }
        }   else {

             res.status(500).json({msg:'UnAutherized Access'}) 
        }
    }

    exports.updateResult = async(req,res)=>{
        try {

            console.log("Inside the update notify")
            console.log(req.params.id)
            console.log(req.body.type)  
            // const student = await Student.find({register_no:req.body.Reg})
            //fetch Student
            const student = await Student.findOne({register_no:req.body.Reg})          
            //fetch Result 
            if(req.body.type === 'pte')
            {

                const PTEresult = await PTE.findById({_id:req.params.id})
                console.log(PTEresult)

                if(PTEresult){  
                    PTEresult.sent = true
                    await PTE.updateOne({_id:req.params.id},PTEresult)
                    await Student.updateOne({register_no:req.body.Reg},{$addToSet:{pte_results:PTEresult._id}})

                }
            }
            else if(req.body.type === 'gte'){
                const GTEresult = await GTE.findById({_id:req.params.id})
                if(GTEresult){
                    GTEresult.sent = true
                    await GTE.updateOne({_id:req.params.id},GTEresult)
                    await Student.updateOne({register_no:req.body.Reg},{$addToSet:{gte_results:GTEresult._id}})

                }

            }
            else if(req.body.type === 'ptb'){
                console.log("Its ptb results")
               const PTBresults = await PTB.findById({_id:req.params.id})
               console.log(PTBresults)
               if(PTBresults){
                PTBresults.sent = true
                await PTB.updateOne({_id:req.params.id},PTBresults)
                await Student.updateOne({register_no:req.body.Reg},{$addToSet:{ptb_results:PTBresults._id}})
               }
            }
            else if(req.body.type === 'gtb'){
                console.log("Its gtb results")
               const GTBresults = await GTB.findById({_id:req.params.id})
               console.log(GTBresults)
               if(GTBresults){
                GTBresults.sent = true
                await GTB.updateOne({_id:req.params.id},GTBresults)
                await Student.updateOne({register_no:req.body.Reg},{$addToSet:{gtb_results:GTBresults._id}})
               }
            }

            

        

            // const notification = student[0].results.filter((itemnotify) =>{
            //     console.log(itemnotify)
            //     console.log(req.params.id)
            //     console.log(itemnotify._id)
            //     if(itemnotify._id != req.params.id)
            //         return result
            // })

            // console.log("The notification is",notification)
            // await Student.updateOne({register_no:req.params.id},{$push:{results:result}})
            // console.log("done dona done",student)
        // return res.status(201).json({msg:"Hello",student})
        } catch (error) {   
            console.log( error );
            res.status(401).json({err:"Something Went Wrong!!",error})

            }    
        }



/***********************Send All************************* */
exports.sendAllStudent = async(req,res)=>{

    console.log(req.body)


    const recievedId = req.body
    recievedId.map(async(item)=>{
        if(item.type === 'ptb'){
           const PTBresult = await PTB.findById({_id:item.id})
           if(PTBresult){
            PTBresult.sent = true
            const type = "result"
            await PTB.updateOne({_id:item.id},PTBresult)
            await Student.updateOne({register_no:item.register_no},{$addToSet:{ptb_results:PTBresult},$push:{notifications:{msg:`${PTBresult.exam_name} result`,notify_on:`${type}`,date: new Date()}}})
           }
        }
        else if(item.type === 'pte'){
            const PTEresult = await PTE.findById({_id:item.id})
           if(PTEresult){
            PTEresult.sent = true
            const type = "result"
            await PTE.updateOne({_id:item.id},PTEresult)
            await Student.updateOne({register_no:item.register_no},{$addToSet:{pte_results:PTEresult},$push:{notifications:{msg:`${PTEresult.exam_name} result`,notify_on:`${type}`,date: new Date()}}})
           }
        }
        else if(item.type === 'gte'){
            const GTEresult = await GTE.findById({_id:item.id})
            if(GTEresult){
                GTEresult.sent = true
                const type = "result"
             await GTE.updateOne({_id:item.id},GTEresult)
             await Student.updateOne({register_no:item.register_no},{$addToSet:{ptb_results:GTEresult},$push:{notifications:{msg:`${GTEresult.exam_name} result`,notify_on:`${type}`,date: new Date()}}})
            }
        }
   
            else if(item.type === 'gtb'){
                const GTBresult = await GTB.findById({_id:item.id})
                if(GTBresult){
                    GTBresult.sent = true
                    const type = "result"
                 await GTB.updateOne({_id:item.id},GTBresult)
                 await Student.updateOne({register_no:item.register_no},{$addToSet:{gtb_results:GTBresult},$push:{notifications:{msg:`${GTBresult.exam_name} result`,notify_on:`${type}`,date: new Date()}}})

                //  notifications:{msg:courseSent.material_type,subject:courseSent.course_subject,isClear:false, isView:false, icon:"FaEnvelope", date: new Date()}
                }
          
        }
        
    }) 
}


/*************get Batch Students*/

exports.getBatchStudent = async(req,res)=>{
    console.log("hello")
    try{
        const student = await Student.find({batch:req.params.id}).populate('batch').populate('campus').exec()
       
        res.status(201).json(student)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/**********************send course materials to batch  students*/


exports.sendStudyMaterial = async(req,res)=>{
    console.log(req.body)
    try{
        // data got course id,comments,batch id
        console.log("Logic here")
        // student with the batchid
        const student = await Student.find({batch:req.body.for_batch}).populate('batch').populate('campus').populate('course_materials').exec()

        const courseSent = await Course.findById(req.body.course)
        console.log("The Course is ",courseSent)

        
            // console.log(item)
            console.log("The course material notification looks like for material type",courseSent.material_type)
            console.log("The subject is ",courseSent.course_subject)
            const type = "course material"
            await Student.updateMany({batch:req.body.for_batch},{$addToSet:{course_materials:{comments:req.body.comment,material:req.body.course}},$push:{notifications:{msg:`${courseSent.material_type} on `,subject:courseSent.course_subject,notify_on:`${type}`,date: new Date()}}})
            // {$push:{notifications:{msg:courseSent.material_type,subject:courseSent.course_subject,isClear:false, isView:false, icon:"FaEnvelope", date: new Date()}}}

            
            console.log("Added the course material" ,student)

      
        res.status(201).json({msg:"course material Sent",student})        
    }
    catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})

    }
}

//update notification

exports.updateNotify  = async(req,res)=>{
    // console.log(req.body)
    console.log(req.params.id)
    try{
        // console.log("Inside try")
        const student = await Student.find()

        // console.log(student)


        student.map(async(item)=>{
            // console.log(item)
            const notification = item.notifications.filter((itemnotify)=>{
                if(itemnotify._id.valueOf() != req.params.id)
                return itemnotify
            })
            console.log("The notification is",notification)
            await Student.updateOne({_id:item._id},{$set:{"notifications":notification}})
        })

        // const notification = student.notifications.filter((itemnotify)=>{
        //     console.log(itemnotify._id.valueOf())
        //     console.log(req.params.id)
            // if(itemnotify._id.valueOf() !== req.params.id){
            //     console.log("Inside if")
                
            // }
            // else 
            // return itemnotify
            
            
        // })
        res.status(201).json({msg:"Notification removed"})


    }
    catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})

    }

    
}




