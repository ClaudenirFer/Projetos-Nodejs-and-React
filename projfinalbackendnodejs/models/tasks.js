const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String, required: true },
  priorities: { type: String, required: true },
  taskStaus: { type: String, required: true },
  deadline: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

const Task = mongoose.model("tasks", taskModel);

module.exports = Task;
