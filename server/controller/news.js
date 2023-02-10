    const News = require('../model/news')

/***********Create News */
exports.createNews = async(req,res)=>{
    console.log(req.body)
    try{

        const news = new News(req.body)
        await news.save()
        
        res.status(201).json({msg:"News Created Successfully",news})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All News */
exports.getAllNews = async (req,res)=>{
    try{
        const news = await News.find()
        res.status(201).json(news)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one News */

exports.getOneNews = async(req,res)=>{
    try{
        const news = await News.findById(req.params.id)
        res.status(201).json(news)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update News */
exports.updateNews = async(req,res)=>{
    console.log(req.params)
    try{
        await News.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"News Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",errors})
    }
}

/***********Delete News */
exports.deleteNews = async(req,res)=>{
    try{
        const news = await News.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"News deleted Successfully",news})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}