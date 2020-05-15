const express=require("express");
  
const router=express.Router();
const {postById,isPoster,getPosts,createPost,postsByUser,deletePost,updatePost,postPhoto}=require("../controller/post");
const {requireSignin}=require("../controller/auth");
const {userById}=require("../controller/user");
const {createPostValidator}=require("../validator");
//const {userById,allUsers}=require("../controller/user");
router.get("/posts",requireSignin,getPosts);
router.get("/posts/by/:userId",requireSignin,postsByUser);
router.post("/post/new/:userId",requireSignin,createPost,createPostValidator);
router.delete("/post/:postId",requireSignin,isPoster,deletePost);
router.put("/post/:postId",requireSignin,isPoster,updatePost);

router.get("/post/photo/:postId",postPhoto)

router.param("userId",userById);
//const postRouters=require("../controller/auth");
router.param("postId",postById);
//const validator=require("../validator");
//router.post("/signup",validator.userSignupValidator,postRouters.signup);
// router.post("/signin",postRouters.signin);
// router.get("/signout",postRouters.signout);
//router.get("/users",allUsers);
//router.param("userId",userById)//look for the parameter in the route,if any route contains it,it will execue method 
//--here looking for userId,method=userById

module.exports=router;
