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

  Team: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Team",
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

module.exports = mongoose.model("Project", ProjectSchema);
