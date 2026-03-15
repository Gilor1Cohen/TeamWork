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

async function tasksByProject(ProjectId) {
  try {
    const count = await Task.countDocuments({
      "Project._id": new mongoose.Types.ObjectId(ProjectId),
    });

    return count;
  } catch (error) {
    throw error;
  }
}

module.exports = { tasksByUser, tasksByProject };
