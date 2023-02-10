const PTEResults = require('../model/PTE')
const xlsx =require('xlsx')
const fs = require('fs') 

/***********Create PTEResults */
exports.createPTEResults = async(req,res)=>{

    try{

        const result = new PTEResults(req.body)
        await result.save()
        
        res.status(201).json({msg:"PTEResults Created Successfully",result})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All PTEResults */
exports.getAllPTEResults = async (req,res)=>{
    let search = req.query.search 
    let filter = req.query.filter
    console.log({search})
    try{
        if(filter){
            if(req.query.filter==='All'){
                const result = await PTEResults.find().sort({ createdAt:-1}).exec()
        res.status(201).json(result)
            }else{
                const result = await PTEResults.find({exam_name:req.query.filter}).sort({ createdAt:-1}).exec()
                res.status(201).json(result)
            }
        }
        if(search){
            const result =  await PTEResults.find({$or:[{register_no:{$regex:search,$options:'i'}},{student_name:{$regex:search,$options:'i'}}]}).sort({ createdAt:-1}).exec()
            console.log(result)
             return res.status(201).json(result)
        }
        if(!filter && !search){
            const result = await PTEResults.find().sort({ createdAt:-1}).exec()
        res.status(201).json(result)
        }
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one PTEResults */

exports.getOnePTEResults = async(req,res)=>{


    try{
        const result = await PTEResults.findById(req.params.id)
        console.log(result)
        res.status(201).json(result)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update PTEResults */
exports.updatePTEResults = async(req,res)=>{
    console.log(req.params)
    try{
        await PTEResults.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"PTEResults Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete PTEResults */
exports.deletePTEResults = async(req,res)=>{
    try{
        const result = await PTEResults.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"PTEResults deleted Successfully",result})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}

exports.uploadPTEResult = async (req, res, next) => {
    // console.log("Hello")
    // console.log(req.body)
    console.log({id:req.params.id})
    try {
      let path = req.file.path;
      var workbook = xlsx.readFile(path);
      var sheet_name_list = workbook.SheetNames;
      let jsonData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );

      console.log(jsonData)
      if (jsonData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "xml sheet has no data",
        });
      }
    
        const dbData = await PTEResults.find({exam_name:req.params.id})
        console.log("The DbData is",dbData)
        if(dbData.length < 1){
            jsonData.map(async(item)=>{
                let  savedData = await PTEResults.create(item);
                savedData.exam_name = req.params.id
                savedData.save()
            })
            return res.status(201).json({
                success: true,
                message: savedData.length + " rows added to the database",
              });
        }

    else {


  
        console.log("Inside update many")
        dbData.map(async(dbitem)=>{
             jsonData.map(async(excelitem)=>{

                if(dbitem.register_no == excelitem.register_no){
                    console.log("Both side present")
                    await PTEResults.updateOne({_id:dbitem._id},{$set:{"sent":false,"exam_name":req.params.id}})
                   await PTEResults.updateOne({_id:dbitem._id},excelitem)
                }
             })
        })

        jsonData.map(async(item)=>{
                 const existPTE = await PTEResults.findOne({register_no:item.register_no})
                 console.log('//////////////////////' ,existPTE)
                 if(existPTE){
                     return 
                     
                 }
                const PTEadd = new PTEResults(item)
                PTEadd.exam_name = req.params.id
                await PTEadd.save()
                
          
        })
    }      
  
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
