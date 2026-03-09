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

  Project: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
      Name: {
        type: String,
        required: true,
      },
    },
  ],

  Members: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      Name: {
        type: String,
        required: true,
      },
      Role: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Task", TaskSchema);
