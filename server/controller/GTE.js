const GTEResults = require('../model/GTE')
const xlsx =require('xlsx')
const fs = require('fs') 

/***********Create GTEResults */
exports.createGTEResults = async(req,res)=>{
    try{

        const result = new GTEResults(req.body)
        await result.save()
        
        res.status(201).json({msg:"GTEResults Created Successfully",result})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All GTEResults */
exports.getAllGTEResults = async (req,res)=>{
    let search = req.query.search 
    // console.log({search})
    try{
        if(search){
            const result =  await GTEResults.find({$or:[{register_no:{$regex:search,$options:'i'}},{student_name:{$regex:search,$options:'i'}}]}).sort({ createdAt:-1})
            console.log(result)
             return res.status(201).json(result)
             console.log({result})    
        }
        if( !search){
            const result = await GTEResults.find()
        res.status(201).json(result)
        console.log({result})
        }
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one GTEResults */

exports.getOneGTEResults = async(req,res)=>{


    try{
        const result = await GTEResults.findById(req.params.id)
        console.log(result)
        res.status(201).json(result)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update GTEResults */
exports.updateGTEResults = async(req,res)=>{
    console.log(req.params)
    try{
        await GTEResults.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"GTEResults Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete GTEResults */
exports.deleteGTEResults = async(req,res)=>{
    try{
        const result = await GTEResults.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"GTEResults deleted Successfully",result})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}

exports.uploadGTEResult = async (req, res, next) => {
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
    
        const dbData = await GTEResults.find()
        console.log("The DbData is",dbData)
        if(dbData.length < 1){

            let  savedData = await GTEResults.create(jsonData);
            savedData.exam_name = sheet_name_list[0]
            return res.status(201).json({
                success: true,
                message: savedData.length + " rows added to the database",
              });
        }

    else {


  
    //     const dbDataAdded = dbData.filter(async (itemDb)=>{

    //         const notification = jsonData.filter((itemnotify) =>{
    //            console.log("The Array elements is",itemnotify?.register_no)
    //            console.log("The Array elements is",itemDb?.register_no)

    //            if(itemnotify?.register_no !== itemDb?.register_no)
    //            return itemnotify
    //        })
    //        return notification
    //     }) 
        
    //   savedData = await GTEResults.create(dbDataAdded);
    // let  savedData = await GTEResults.create(jsonData);

    jsonData.map(async(item)=>{
        const GTEadd = new GTEResults(item)
        GTEadd.exam_name = sheet_name_list[0]
        await GTEadd.save()
     
    })  
  } 
    }catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
