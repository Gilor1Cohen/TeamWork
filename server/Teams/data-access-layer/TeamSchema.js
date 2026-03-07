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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Team", TeamSchema);
