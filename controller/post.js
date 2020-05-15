const Post=require("../models/post");
const formidable=require("formidable");
const fs=require("fs");
const _=require("lodash");

exports.postById=(req,res,next,id)=>{
    Post.findById(id) 
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        req.post=post;
        next();
    });
};

exports.isPoster=(req,res,next)=>{
    const isPoster=req.post && req.auth && req.post.postedBy._id==req.auth._id;
    if(!isPoster){
        return res.status(403).json({
            error: "User is not authorised"
        })
    }
    next();
};

exports.getPosts=(req,res)=>{
    
    const posts=Post.find()
    .populate("postedBy","_id name")//as it is refering to different model
    .select("_id title body created")//for properties of same model
    .sort({created: -1})
    .then((posts)=>{
        res.status(200).json(posts);
    })
    .catch((err)=>{
        console.log(err);
    }); 
    
};

exports.createPost=(req,res,next)=>{
    let form=new formidable.IncomingForm()//gives us incoming form fields
    form.keepExtensions= true;//to keep the extensions e.g. .jpeg etc.
    form.parse(req,(err,fields,files)=>{
        if(err)
        {
            return res.status(400).json({
                err: "image can't be uploaded"
            });
        }
        let post=new Post(fields);
        req.profile.hashed_password=undefined;
        post.postedBy=req.profile;//adding user to post

        if(files.photo){
            post.photo.data= fs.readFileSync(files.photo.path);
            post.photo.contentType= files.photo.type;
        }

        post.save((err,result)=>{
            if(err)
            {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });


    //const post=new Post(req.body);
    // console.log("Creating Post",req.body);
    // post.save((err,result)=>{
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             error: err
    //         });
    //     }
    //     res.status(200).json({
    //         post: result
    //     });
    // });

    // post.save().then(result=>{
    //     res.status(200).json({
    //         post: result
    //     });
    // });
    
};

exports.postsByUser=(req,res)=>{
    Post.find({postedBy: req.profile._id})
    .populate("postedBy","_id name")
    .sort("created")
    .exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({posts});
    });
};

exports.deletePost=(req,res)=>{
    let post=req.post;
    post.remove((err,post)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            msg: "deleted successfully"
        });
    });
};

exports.updatePost=(req,res)=>{
    let post=req.post;
    post =_.extend(post,req.body);
    
    post.save((err)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json(post);
    });
};

exports.postPhoto=(req,res)=>{
    res.set("Content-Type",req.post.photo.contentType);
    return res.send(req.post.photo.data);
}