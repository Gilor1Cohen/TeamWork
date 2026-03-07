const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  TaskTitle: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  DueDate: {
    type: Date,
    required: true,
  },

  Project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
