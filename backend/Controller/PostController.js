const express = require("express");
const Post = require('../Model/post')
exports.CreatePost= (req, res) => {
  const userId=req.userId;
  const { caption, photoUrl } = req.body;
  const newPost=new Post({
    userId,
    caption,
    photoUrl
  })
  
  newPost.save().then((post)=>{
    res.status(201).json({message:"Post uploaded successfully",post:post});
  }).catch((err)=>{
    console.log(err);
  })
  
}


exports.AllPosts= async (req, res) => {
  Post.aggregate([{$lookup:{from:'users',localField:'userId','foreignField':'_id' ,as:"userDetails"}},{$unwind:'$userDetails'}]).then((posts)=>{
    res.status(200).json(posts);
  }).catch((err)=>{
    res.status(400).json({ error: "Error fetching posts" });
  })
}
