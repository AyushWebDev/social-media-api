const User=require("../models/user");
const _=require("lodash");

exports.userById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err){
            return res.status.json({
                error: "user not found"
            });
        }
        req.profile=user;  
        next();
    });
};

exports.hasAutherization=(req,res,next)=>{
    const authorized=req.profile && req.auth && req.profile._id===req.auth._id;
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
};

exports.allUsers=(req,res)=>{
    User.find((err,users)=>{
        if(err){
           return res.status(400).json({
                error: err
            });
        }
         res.json(users);
    }).select("name email updated created");
};

exports.getUser=(req,res)=>{
    req.profile.hashed_password=undefined;//so that password is not shown
    return res.json(req.profile); 
};

exports.updateUser=(req,res,next)=>{
    let user=req.profile;
    user=_.extend(user,req.body);//extend - mutate the source object ,here ->user
    //makes changes to user object according to what we got in req.body
    user.updated=Date.now();
    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error: "you are not authorised to make changes"
            });
        }
        user.hashed_password=undefined;
        res.json({user});
    });
};

exports.deleteUser=(req,res,next)=>{
    let user = req.profile;
    user.remove((err,user)=>{
        if(err){
            return res.status(400).json({
                error: err
            });

        }
        res.json({
            msg: "deleted"
        })
    });
};