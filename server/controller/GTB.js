const GTB = require('../model/GTB')
const xlsx =require('xlsx')
const fs = require('fs') 

/***********Create GTB */
exports.createGTBResult = async(req,res)=>{
    try{

        const result = new GTB(req.body)
        await result.save()
        
        res.status(201).json({msg:"GTB Created Successfully",result})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All GTB */
exports.getAllGTBResult = async (req,res)=>{
    let search = req.query.search 
    // console.log({search})
    try{
        if(search){
            const result =  await GTB.find({$or:[{register_no:{$regex:search,$options:'i'}},{student_name:{$regex:search,$options:'i'}}]}).sort({ createdAt:-1}).exec()
            console.log(result)
             return res.status(201).json(result)
        }
            const result = await GTB.find().exec()
        res.status(201).json(result)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one GTB */

exports.getOneGTBResult = async(req,res)=>{


    try{
        const result = await GTB.findById(req.params.id)
        console.log(result)
        res.status(201).json(result)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update GTB */
exports.updateGTBResult = async(req,res)=>{
    console.log(req.params)
    try{
        await GTB.updateOne({_id:req.params.id},req.body)
 
        res.status(201).json({msg:"GTB Updated Successfully"})
 

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete GTB */
exports.deleteGTBResult = async(req,res)=>{
    try{
        const result = await GTB.findByIdAndDelete({_id:req.params.id})
 
        res.status(201).json({msg:"GTB deleted Successfully",result})
 

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}

exports.uploadGTBResult = async (req, res, next) => {
    console.log("Hello")
    console.log(req.body)
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
    
        const dbData = await GTB.find()
        console.log("The DbData is",dbData)
        if(dbData.length < 1){

            let  savedData = await GTB.create(jsonData);
            savedData.exam_name = sheet_name_list[0]

            return res.status(201).json({
                success: true,
                message: savedData.length + " rows added to the database",
              });
        }

        else{
            console.log("Inside update many of GTB")
            dbData.map(async(dbitem)=>{
                 jsonData.map(async(excelitem)=>{
                    if(dbitem.register_no == excelitem.register_no){
                        console.log("Both side present")
                        await GTB.updateOne({_id:dbitem._id},{$set:{"sent":false}},{$set:{exam_name:sheet_name_list[0]}})
                       await GTB.updateOne({_id:dbitem._id},excelitem)
                    }
                    else{
                        
                    }
                 })
            })

            jsonData.map(async(item)=>{
                const existGTB = await GTB.findOne({register_no:item.register_no})
                console.log('//////////////////////' ,existGTB)
                if(existGTB){
                    return 
                    
                }
               const GTBadd = new GTB(item)
               GTBadd.exam_name = sheet_name_list[0]
               await GTBadd.save()
               
         
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
        
    //   savedData = await GTB.create(dbDataAdded);
    //   return res.status(201).json({
    //     success: true,
    //     message: savedData.length + " rows added to the database",
    //   });
    // }      
  
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
