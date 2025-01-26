const express=require("express");

const Authrouter = require("./Routes/Auth-route");
const Postrouter = require('./Routes/Post-route');
const Taskrouter = require('./Routes/Task-route');

const  mongoose  = require("mongoose");
const app=express();
require('dotenv').config();

app.use(express.json());


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,authorization");
    next();
})


app.use(Authrouter);
app.use(Postrouter);
app.use(Taskrouter);
mongoose.connect(process.env.MONGODB).then((connected)=>{
    console.log("Mongodb connected successfully");
}).catch((err)=>{
    console.log("error in mongodb connection",err);
})

app.listen(5002,()=>{
    console.log("server is running at port 5002");
})