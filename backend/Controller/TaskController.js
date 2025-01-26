const express = require("express");
const Task = require("../Model/task");

exports.CreateTask = (req, res) => {
  const userId = req.userId;
  const { taskName, taskDescription, status } = req.body;

  const newTask = new Task({
    userId,
    taskName,
    taskDescription,
    status,
  });

  newTask
    .save()
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      res.status(400).json({ error: "Error creating task" });
    });
};

exports.GetTasks = (req, res) => {
  const userId = req.userId;
  Task.find({userId}).then((mytask) => {
    res.status(200).json({mytask});
  }).catch((err) => {
    res.status(400).json({message:"Error while fetching my task"});
  });
};

exports.UpdateTask = async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: "Error updating task" });
  }
};

exports.DeleteTask = (req, res) => {
 
  Task.findByIdAndDelete(req.params.taskId).then((success)=>{
    res.status(200).json({ message: "Task deleted" });
  }).catch((error)=>{
    res.status(400).json({ error: "Error deleting task" });
  })
  
};
