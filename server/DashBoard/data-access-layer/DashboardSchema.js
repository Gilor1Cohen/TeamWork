const mongoose = require("mongoose");
const { Schema } = mongoose;

const DashboardSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Task: {
    Total: { type: Number, default: 0 },
  },

  Projects: {
    Total: { type: Number, default: 0 },
  },

  Teams: {
    Total: { type: Number, default: 0 },
    TotalMembers: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
