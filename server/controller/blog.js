const Blog = require('../model/blog')

/***********Create Blog */
exports.createBlog = async(req,res)=>{
    console.log(req.body)
    try{

        const blog = new Blog(req.body)
        await blog.save()
        
        res.status(201).json({msg:"Blog Created Successfully",blog})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something went Wrong!",error})
    }
}


/**********Get All Blog */
exports.getAllBlog = async (req,res)=>{
    try{
        const blog = await Blog.find()
        res.status(201).json(blog)
    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!",error})
    }
}

/*************get one Blog */

exports.getOneBlog = async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        res.status(201).json(blog)

    }catch(error){
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}


/***********Update Blog */
exports.updateBlog = async(req,res)=>{
    console.log(req.params)
    try{
        await Blog.updateOne({_id:req.params.id},req.body)
        res.status(201).json({msg:"Blog Updated Successfully"})

    }catch(error){
        console.log(error)
        res.status(401).json({err:"Something Went Wrong!!",error})
    }
}

/***********Delete Blog */
exports.deleteBlog = async(req,res)=>{
    console.log(req.params.id)
    try{
        const blog = await Blog.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({msg:"Blog deleted Successfully",blog})

    }catch(error){
        res.status(401).json({err:"Something went Wrong!!",error})
    }
}