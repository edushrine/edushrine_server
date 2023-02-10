const Contact = require('../model/contact')

/***********Create Contact */
exports.createContact = async(req,res)=>{
    console.log(req.body)
    try{

        const contact = new Contact(req.body)
        await contact.save()
        
        res.status(201).json({msg:"Your Enquiry Sent Successfully",contact})
        console.log("Conatct send succesfully !!!!")

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Contact */
exports.getAllContact = async (req,res)=>{
    const search=req.query.search                                    
    try{
        if(search){
            const filterContact =  await Contact.find({$or:[{name:{$regex:search,$options:'i'}},{email:{$regex:search,$options:'i'}},{message:{$regex:search,$options:'i'}}
            ]}).sort({ createdAt:-1})
             res.status(201).json(filterContact)
        }else{
            const contact = await Contact.find().sort({ createdAt:-1})
        res.status(201).json(contact)
        }
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Contact */

exports.getOneContact = async(req,res)=>{
    try{
        const contact = await Contact.findById(req.params.id)
        res.status(201).json(contact)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Contact */
exports.updateContact = async(req,res)=>{
    console.log(req.params)
    try{
        await Contact.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Contact Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Contact */
exports.deleteContact = async(req,res)=>{
    console.log(req.params.id)
    try{
        const contact = await Contact.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Contact deleted Successfully",contact})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}