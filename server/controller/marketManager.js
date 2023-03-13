const MarketingManager = require('../model/marketingManager')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60

const createToken = (id) =>{

return jwt.sign({id},  process.env.JWT_SECRET, {
    expiresIn:maxAge
})
  
}

/***********Create MarketingManager */
exports.createMarketingManager = async(req,res)=>{
    console.log(req.body)
    const {name,email,phone_no,password,role} = req.body
    try{

        const existmarketingManager = await MarketingManager.findOne({email:email})
        if(existmarketingManager){
            return res.status(401).json({msg:`Manager ${name} already Exists`})
        }
        console.log(req.body)
        const marketingManager = new MarketingManager(req.body)
        marketingManager.email = email.toLowerCase()
    
        const salt = await bcrypt.genSalt(10)
        marketingManager.password = await bcrypt.hash(password,salt)

        await marketingManager.save()

        const token =  createToken(marketingManager._id);
        
        res.status(201).json({msg:"Marketing Manager Created Successfully",marketingManager,token})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All MarketingManager */
exports.getAllMarketingManager = async (req,res)=>{
    try{
        const marketingManager = await MarketingManager.find().populate('branch').exec()
        res.status(201).json(marketingManager)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one MarketingManager */

exports.getOneMarketingManager = async(req,res)=>{
    try{
        const marketingManager = await MarketingManager.findById(req.params.id)
        res.status(201).json(marketingManager)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update MarketingManager */
exports.updateMarketingManager = async(req,res)=>{
    console.log(req.body.password)
    try{

        const marketingManager = await MarketingManager.findById(req.params.id)
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            marketingManager.password = await bcrypt.hash(req.body.password,salt)
        }
        await MarketingManager.updateOne({_id:req.params.id},req.body)
        await marketingManager.save()

        res.status(201).json({msg:"Marketing Manager details Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete MarketingManager */
exports.deleteMarketingManager = async(req,res)=>{
    try{
        const marketingManager = await MarketingManager.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Marketing Manager deleted Successfully",marketingManager})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}


/*****marketingManager login********/
exports.login = async (req, res) => {
    const {email, password} = req.body
    try{  

           const marketingManager = await MarketingManager.findOne({email : email}).populate('branch').exec()
            if(!marketingManager) {
                    return res.status(400).json({msg:'Invalid Marketing Manager'})
                  }
           const isMatch = await bcrypt.compare(password, marketingManager.password)
           if(!isMatch) {

            return  res.status(400).json({msg:'Invalid Password'})
        }
    
        
      const token = createToken(marketingManager._id);
      console.log('marketingManager')

      res.status(201).json({msg:'Logged-in Successfully', token, marketingManager})
    
     }catch(error){
         console.log(error)
        res.status(401).json({err:"Something went wrong !",error})

        
     }
    }

     /********marketingManager profile*********/
     exports.marketingManagerProfile = async (req, res)=>{
        try {
           const marketingManager = await MarketingManager.findById(req.marketingManager._id).select('-password')
    // console.log(admin);
           if(!marketingManager) {
    
            return res.status(401).json({json:"no Authorization"})
           }
    
        res.status(201).json(marketingManager) 
    
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
                
                    req.marketingManager = await MarketingManager.findById(decoded.id).select('-password')
                    next()
            
                } catch (error) {
            
                    res.status(401).json({error:error.message}) 
                }
            }   else {
    
                 res.status(500).json({msg:'UnAutherized Access'}) 
            }
        }

