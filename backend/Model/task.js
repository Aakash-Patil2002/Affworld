const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Done"], default: "Pending" },
});

const Task=mongoose.model('task',taskSchema);

module.exports=Task