const jwt=require("jsonwebtoken");
const expressJwt=require("express-jwt");
const User=require("../models/user");
const dotenv = require("dotenv"); 

dotenv.config();   
//using async / await
// exports.signup=async (req,res)=>{
//     const userExist=await User.findOne({email: req.body.email});
//     if(userExist)
//         return res.status(404).json({
//             error: "email already taken"
//         });
//     const user=await new User(req.body);
//     await user.save();
//     res.status(200).json({msg: "signed in"});
// };

//without using async/await
exports.signup=(req,res)=>{
    const userExist=User.findOne({email: req.body.email}).then(u=>{
        if(u)
        return res.json({
            error: "email already taken"
        });
    
    const user=new User(req.body);
    const {_id,name,email}=user;
    user.save().then(user=>{
        res.status(200).json({msg: "Signed Up Successfully",user: {_id,name,email}});
    });
});
};

exports.signin=(req,res)=>{
    //find user based on email
    const {email,password}=req.body;
    User.findOne({email}).then(u=>{ 
        if(!u)
        {
            return res.status(401).json({
                error: "user with that email doesn't exist.Please try again"
            });
        }
        //if found, authenticate
        //create authenticate method in user model and use
        if(!u.authenticate(password))
        {
            return res.status(401).json({
                error: "email and password doesn't match"
            });
        }
        //generate a token with user id and secret
        const token=jwt.sign({_id: u._id},process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t",token,{expire: new Date()+9999});
        //return response with user and token to frontend client
        const {_id,name,email}=u;
        return res.json({token,user: { _id,email,name},msg: "Signed In Successfully"});
    });
    
    
    
};
exports.signout=(req,res)=>{
    res.clearCookie("t");
    return res.json({
        msg: "signout success"
    });
};

//for, when user tries to excess some route,we expect user cleint app to send secret key and token
//apply this as middleware where u want to use
exports.requireSignin=expressJwt({
    secret: process.env.JWT_SECRET,//user is authenticated if they are sending token which contain this secret
    //if the token is valid ,express jwt appends the verified user id 
    //in an auth key to request object
    userProperty: "auth"
});