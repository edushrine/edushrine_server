const PTB = require('../model/PTB')
const xlsx =require('xlsx')
const fs = require('fs') 

/***********Create PTB */
exports.createPTBResult = async(req,res)=>{
    try{

        const result = new PTB(req.body)
        await result.save()
        
        res.status(201).json({msg:"PTB Created Successfully",result})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All PTB */
exports.getAllPTBResult = async (req,res)=>{
    let search = req.query.search 
    let filter = req.query.filter
    // console.log({search})
    try{
        if(filter){
            if(req.query.filter==='All'){
                const result = await PTB.find().sort({ createdAt:-1}).exec()
                console.log(result)
        res.status(201).json(result)
            }else{
                const result = await PTB.find({exam_name:req.query.filter}).sort({ createdAt:-1}).exec()
                console.log(result)
                res.status(201).json(result)
            }
        }
        if(search){
            const result =  await PTB.find({$or:[{register_no:{$regex:search,$options:'i'}},{student_name:{$regex:search,$options:'i'}}]}).sort({ createdAt:-1}).exec()
            console.log(result)
             return res.status(201).json(result)
        }
        if(!filter && !search){
            const result = await PTB.find().sort({ createdAt:-1}).exec()
            console.log(result)
        res.status(201).json(result)
        }
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one PTB */

exports.getOnePTBResult = async(req,res)=>{


    try{
        const result = await PTB.findById(req.params.id)
        console.log(result)
        res.status(201).json(result)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update PTB */
exports.updatePTBResult = async(req,res)=>{
    console.log(req.params)
    try{
        await PTB.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"PTB Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete PTB */
exports.deletePTBResult = async(req,res)=>{
    try{
        const result = await PTB.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"PTB deleted Successfully",result})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}

exports.uploadPTBResult = async (req, res, next) => {
    // console.log("Inside uploadPTBResult")
    // console.log(req.body)
    console.log({typr:req.params.id})
    try {
      let path = req.file.path;
      var workbook = xlsx.readFile(path);
      var sheet_name_list = workbook.SheetNames;
      let jsonData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );

      console.log(sheet_name_list[0])
      if (jsonData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "xml sheet has no data",
        });
      }
    
        const dbData = await PTB.find({exam_name:req.params.id})

        console.log("The DbData is",dbData)
        if(dbData.length < 1){

             jsonData.map(async(item)=>{
                let  savedData = await PTB.create(item);
                savedData.exam_name = req.params.id
                savedData.save()
            })
            // console.log("Data inserted to db")  
            return res.status(201).json({
                success: true,
                message: savedData.length + " rows added to the database",
              });
        }
        else{  
             
            console.log("Inside update many")
            dbData.map(async(dbitem)=>{
                 jsonData.map(async(excelitem)=>{

                    if(dbitem.register_no == excelitem.register_no){
                        console.log("Both side present")
                        await PTB.updateOne({_id:dbitem._id},{$set:{"sent":false,"exam_name":req.params.id}})
                       await PTB.updateOne({_id:dbitem._id},excelitem)
                    }
                 })
            })

            jsonData.map(async(item)=>{
                     const existPTB = await PTB.findOne({register_no:item.register_no})
                     console.log('//////////////////////' ,existPTB)
                     if(existPTB){
                         return 
                         
                     }
                    const PTBadd = new PTB(item)
                    PTBadd.exam_name = req.params.id
                    await PTBadd.save()
                    
              
            })

            
        }
        

    // else {


  
    //     const dbDataAdded = dbData.filter(async (itemDb)=>{

    //         const notification = jsonData.filter((itemnotify) =>{
    //            console.log("The Array elements is",itemnotify?.register_no)
    //            console.log("The Array elements is",itemDb?.register_no)

    //            if(itemnotify?.register_no !== itemDb?.register_no)
    //            return itemnotify
    //        })
    //        return notification
    //     }) 
        
    //   savedData = await PTB.create(dbDataAdded);
    //   return res.status(201).json({
    //     success: true,
    //     message: savedData.length + " rows added to the database",
    //   });
    // }      
  
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
