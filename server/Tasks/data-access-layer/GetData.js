const mongoose = require("mongoose");
const Task = require("../data-access-layer/TaskSchema");

async function tasksByUser(UserId) {
  try {
    const tasks = await Task.find({
      "Members._id": new mongoose.Types.ObjectId(UserId),
    }).lean();

    return tasks;
  } catch (error) {
    throw error;
  }
}

module.exports = { tasksByUser };
