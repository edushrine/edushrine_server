const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin')
const Student = require('../model/student')
 

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) =>{

return jwt.sign({id},  process.env.JWT_SECRET, {
    expiresIn:maxAge
})
  
}

/******** register ******/
exports.register = async (req,res) =>{

    console.log(req.body)
    console.log("Hello")
    const {email,password,phone_no} = req.body
 
    try {
   const existadmin = await Admin.findOne({email:req.body.email})
    
           if(existadmin){

               return res.status(401).json({msg:"Email already exists!"})
           }

    const admin = new Admin(req.body)
    admin.email=email.toLowerCase()

    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password,salt) 
   
    await admin.save();

    const token =  createToken(admin._id);

    
      res.status(201).json({msg:"Register Successfully", admin,token})
            
        } catch (error) {
                console.log(error)
                 res.status(401).json({err:"Something went wrong !",error})
            
        }
    }

/*******get all admin******/

exports.getAllAdmin = async (req,res)=>{
    let search = req.query.search 

    try {
        if(req.query.search) {
            const filteradmin =  await Admin.find({$or:[{user_name:{$regex:search,$options:'i'}},{phone_number:{$regex:search,$options:'i'}},
            {email:{$regex:search,$options:'i'}},
            ]})
 
            return res.status(201).json({msg:'Successfully',filteradmin})
        }
 
        const admin = await Admin.find({}).sort({ createdAt:-1})
    
        res.status(201).json({msg:"Successfully", admin})

    
    } catch (error) {
    
        res.status(401).json({err:"Something went wrong !",error})
    
    }
    
    }

    /*******get one admin******/
    exports.getOneAdmin = async (req,res)=>{

        try {      
            const admin = await Admin.findById(req.params.id) 
            res.status(201).json({msg:"Successfully", admin})
    
        } catch (error) {
            res.status(401).json({err:"Something went wrong !",error})
        
        }
        
        }
    

/*****update admin**********/
exports.updateAdmin = async (req,res)=>{
    console.log(req.body);
        try{


            const admin = await Admin.findById(req.params.id)
            
            console.log(req.body.password);
            if(req.body.password ) {
                
                const salt = await bcrypt.genSalt(10)
                admin.password = await bcrypt.hash(req.body.password,salt) 
            }

            await Admin.updateOne({_id:req.params.id},req.body)
       
             
           await admin.save()  
       

            res.status(201).json({msg:"Admin Updated Successfully"})

        } catch (error){
         console.log(error);
            res.status(401).json({msg:"Something went wrong !",error})

        }

    }

/*******delete admin********/
exports.deleteAdmin = async (req,res)=>{

        try {
            
            const admin = await Admin.findByIdAndDelete({_id:req.params.id})
            
            res.status(201).json({msg:"Deleted Successfully",admin})
        
        } catch (error) {
        
                    res.status(401).json({err:"Something went wrong !",error})
        
        }
}


/*****admin login********/
exports.login = async (req, res) => {
    const {email, password} = req.body
    try{  

           const admin = await Admin.findOne({email : email})
            if(!admin) {
                    return res.status(400).json({msg:'Invalid User'})
                  }
           const isMatch = await bcrypt.compare(password, admin.password)
           if(!isMatch) {

            return  res.status(400).json({msg:'Invalid Password'})
        }
    
        
      const token = createToken(admin._id);

      res.status(201).json({msg:'Logged-in Successfully', token, admin})
    
     }catch(error){
         console.log(error)
        res.status(401).json({err:"Something went wrong !",error})
     }
    }
    
    
    /********admin profile*********/
    exports.adminProfile = async (req, res)=>{
        try {
           const admin = await Admin.findById(req.admin._id).select('-password')
    // console.log(admin);
           if(!admin) {
    
            return res.status(401).json({json:"no Authorization"})
           }
    
        res.status(201).json(admin) 
    
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
            
                req.admin = await Admin.findById(decoded.id).select('-password')
                next()
        
            } catch (error) {
        
                res.status(401).json({error:error.message}) 
            }
        }   else {

             res.status(500).json({msg:'UnAutherized Access'}) 
        }
    }
   