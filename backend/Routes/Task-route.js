const express=require("express");
const router=express.Router();
const CreateTask=require('../Controller/TaskController').CreateTask;
const GetTasks=require('../Controller/TaskController').GetTasks;
const UpdateTask=require('../Controller/TaskController').UpdateTask;
const DeleteTask=require('../Controller/TaskController').DeleteTask;
const AuthCheck=require('../Middleware/AuthCheck');

router.post("/assigntask",AuthCheck, CreateTask);
router.get("/mytasks",AuthCheck,GetTasks);
router.put("/mytask/:taskId",AuthCheck,UpdateTask)
router.delete("/mytask/:taskId",AuthCheck,DeleteTask);


module.exports=router
