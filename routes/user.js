const express=require("express");

const router=express.Router();  

const {requireSignin}=require("../controller/auth");
const {userById,allUsers,getUser,updateUser,deleteUser}=require("../controller/user");
//router.get("/",requireSignin,getPosts);
const postRouters=require("../controller/auth");
//const validator=require("../validator");
const validator=require("../validator");
router.post("/signup",validator.userSignupValidator,postRouters.signup);
router.post("/signin",postRouters.signin);
router.get("/signout",postRouters.signout);
router.get("/users",allUsers); 
router.get("/user/:userId",requireSignin,getUser);
router.put("/user/:userId",requireSignin,updateUser);
router.delete("/user/:userId",requireSignin,deleteUser);
router.param("userId",userById)//look for the parameter in the route,if any route contains it,it will execue method 
//--here looking for userId,method=userById

module.exports=router;
