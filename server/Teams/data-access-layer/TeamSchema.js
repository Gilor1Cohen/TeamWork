const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamSchema = new Schema({
  TeamName: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

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

module.exports = mongoose.model("Team", TeamSchema);
