const CRM = require('../model/crm')
const xlsx =require('xlsx')
const fs = require('fs')
const CRMbranch = require('../model/campus')


/***********Create CRM */
exports.createCRM = async(req,res)=>{
    console.log(req.body)
    try{

        const crm = new CRM(req.body)
        await crm.save()
        
        res.status(201).json({msg:"CRM Created Successfully",crm})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All CRM */
exports.getAllCRM = async (req,res)=>{

    let search = req.query.search 
    let filter = req.query.filter
    let managerFilter=req.query.suhas
    console.log({quary:req.query.suhas})

    try{

        if(req.query.search) {

            const filtercrm =  await CRM.find({$or:[{area:{$regex:search,$options:'i'}},{student_name:{$regex:search,$options:'i'}},{status:{$regex:search,$options:'i'}}
            ]}).sort({ createdAt:-1})
             return res.status(201).json({msg:'Successfully',filtercrm})
            }

        if(filter){
  
        if(filter ==="All"){
            const filtercrm = await CRM.find().populate('branch').sort({ createdAt:-1}).exec()
            return res.status(201).json({msg:'All CRM get Successfully', filtercrm})         
            }

        else{
            const filtercrm = await CRM.find({status:filter}).populate('branch').sort({ createdAt:-1}).exec()
            return  res.status(201).json({msg:'All CRM get Successfully', filtercrm})         
            }      
            }

            if (managerFilter){
                const filtercrm =await CRM.find({branch:managerFilter}).populate('branch').exec()
                return  res.status(201).json({msg:'All CRM get Successfully', filtercrm})
               }

        const crm = await CRM.find().populate('branch').sort({ createdAt:-1}).exec()
        res.status(201).json(crm)

       }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
       }
}  

/*************get one CRM */

exports.getOneCRM = async(req,res)=>{
    try{
        const crm = await CRM.findById(req.params.id)
        res.status(201).json(crm)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update CRM */
exports.updateCRM = async(req,res)=>{
    console.log(req.params)
    try{
        await CRM.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"CRM Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete CRM */
exports.deleteCRM = async(req,res)=>{
    try{
        const crm = await CRM.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"CRM deleted Successfully",crm})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}


exports.uploadfileCRM = async (req,res)=>{
    

    console.log("hello")
    console.log(req.file)
    console.log({suhasfile:req.params.id})

    if(req.error){
        return res.status(500).json({msg:'Excel file Only'})

    }
    let workbook = xlsx.readFile(`./upload/${req.file.filename}`)
  


    var sheet_name_list = workbook.SheetNames
    let data = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
    );
    console.log({s:data})
    try{
        const dbData = await CRM.find()
        for(let i = 0; i< data.length;i++){

           
            if(dbData.length<=0){

                const crm = new CRM()
                crm.student_name = data[i].student_name,
                crm.father_name = data[i].father_name,
                crm.school_name = data[i].school_name,
                crm.course = data[i].course,
                crm.class = data[i].class,
                crm.parent_phone = data[i].parent_phone,
                crm.area = data[i].area,
                crm.branch = req.params.id,
                crm.remarks = data[i].remarks,
                crm.comments = data[i].comments,
                crm.status = data[i].status,
                crm.save()
            }
            else{

           
                dbData.map(async(dbitem)=>{
                    console.log("data is from",data[i])
                     
                        if(dbitem.parent_phone == data[i].parent_phone){
                            await CRM.updateOne({_id:dbitem._id},{$set:{"branch":req.params.id}})
                            await CRM.updateOne({_id:dbitem._id},data[i])
                        }
                       
                            
                        
                  
                })
                const existCRM = await CRM.findOne({parent_phone:data[i].parent_phone})
                            if(!existCRM){
                                const crm = new CRM()
                                crm.student_name = data[i].student_name,
                                crm.father_name = data[i].father_name,
                                crm.school_name = data[i].school_name,
                                crm.course = data[i].course,
                                crm.class = data[i].class,
                                crm.parent_phone = data[i].parent_phone,
                                crm.area = data[i].area,
                                crm.branch = req.params.id,
                                crm.remarks = data[i].remarks,
                                // crm.comments = data[i].comments,
                                // crm.status = data[i].status,
                                crm.save()
                            }
    
                           
              }
            }

            console.log('dbdata is',dbData)
             
            fs.unlink(`./upload/${req.file.filename}`,function(err){
                if(err){
                    throw err
                }else {
                    console.log("Deleted successfully")
                }
            })
            res.status(201).json({msg:"sucessfully uploaded"})
        }


    

    catch(error){
    console.log(error)
    res.status(401).json({msg:"Somthing went Wrong !"})

    }

}