const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")


//POST POSTS XD
router.post("/", async (req, res)=>{

    const newPost = new Post(req.body);
    try{

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
        res.status(500).json(err);
    }


})

// UPDATE

router.put("/:id", async (req,res)=>{

    try{
        const post = await Post.findById(req.params.id);
        
        if(post.username === req.body.username){

            try{

                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                },{new:true});

                res.status(200).json(updatedPost)
            }catch(err){
                res.status(404).json("Post not found")
            }
            
        }else{
            res.status(401).json("you can update only your Post")
        }
    }catch (err) {
        res.status(500).json(err);
        
    }


});

//DELETE

router.delete("/:id", async (req,res)=>{

    try{
        const post = await Post.findById(req.params.id);
        
        if(post.username === req.body.username){

            try{

                await post.delete()

                res.status(200).json("Post deleted...")
            }catch(err){
                res.status(404).json("Post not found")
            }
            
        }else{
            res.status(401).json("you can delete only your Post")
        }
    }catch (err) {
        res.status(500).json(err);
        
    }
});

//GET

router.get("/:id", async(req, res)=>{

    try{

        const post = await Post.findById(req.params.id);
        
        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err);
    }

});

router.get("/:id", async(req, res)=>{


});

//GET All Post

router.get("/", async (req, res)=>{

    const username = req.query.username;
    const catName = req.query.categories;

    try{

        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){

            posts = await Post.find({
                categories:{
                    $in:[catName]
                }})
        }else{
            posts = await Post.find();
        }

        res.status(200).json(posts);

    }catch (err){

        res.status(500).json(err);
    }

})
module.exports = router