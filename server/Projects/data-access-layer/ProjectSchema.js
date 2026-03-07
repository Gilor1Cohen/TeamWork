const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  ProjectName: {
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

  Team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },

  Members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
