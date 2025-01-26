const express=require("express");
const router=express.Router();

const CreatePost=require('../Controller/PostController').CreatePost;
const AllPosts=require('../Controller/PostController').AllPosts;
const AuthCheck=require('../Middleware/AuthCheck');

router.post("/post",AuthCheck,CreatePost);
router.get("/allpost",AllPosts);

module.exports=router; 