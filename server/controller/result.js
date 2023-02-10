const Result = require('../model/result')
const Student = require('../model/student')
const xlsx =require('xlsx')
const fs = require('fs') 

/***********Create Result */
exports.createResult = async(req,res)=>{
    const {register_no} = req.body
    try{

        const result = new Result(req.body)
        
        await result.save()
        
        res.status(201).json({msg:"Result Created Successfully",result})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Result */
exports.getAllResult = async (req,res)=>{
    console.log('========GET ALL RESULTS===>==>',req.body)
 
    try{
        const result = await Result.find()
        res.status(201).json(result)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Result */

exports.getOneResult = async(req,res)=>{


    try{
        const result = await Result.findById(req.params.id)
        console.log(result)
        res.status(201).json(result)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Result */
exports.updateResult = async(req,res)=>{
    console.log(req.params)
    try{
        await Result.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Result Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete Result */
exports.deleteResult = async(req,res)=>{
    try{
        const result = await Result.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Result deleted Successfully",result})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}

exports.uploadfileResult = async (req, res, next) => {
    try {
      let path = req.file.path;
      var workbook = xlsx.readFile(path);
      var sheet_name_list = workbook.SheetNames;
      let jsonData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (jsonData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "xml sheet has no data",
        });
      }
    
        const dbData = await Result.find()
        console.log("The DbData is",dbData)
        if(dbData.length < 1){

            let  savedData = await Result.create(jsonData);
            return res.status(201).json({
                success: true,
                message: savedData.length + " rows added to the database",
              });
        }

    else {


  
        const dbDataAdded = dbData.filter(async (itemDb)=>{

            const notification = jsonData.filter((itemnotify) =>{
               console.log("The Array elements is",itemnotify?.register_no)
               console.log("The Array elements is",itemDb?.register_no)

               if(itemnotify?.register_no !== itemDb?.register_no)
               return itemnotify
           })
           return notification
        }) 
        
      savedData = await Result.create(dbDataAdded);
      return res.status(201).json({
        success: true,
        message: savedData.length + " rows added to the database",
      });
    }      
  
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
