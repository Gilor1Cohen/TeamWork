const Task = require("./TaskSchema");
const mongoose = require("mongoose");

async function deleteTask(id) {
  try {
    const deleteOneProject = await Task.findByIdAndDelete(id);

    if (!deleteOneProject) {
      throw new Error("Task not found");
    }

    return deleteOneProject;
  } catch (error) {
    throw error;
  }
}

async function removeMember(UserId, ProjectId) {
  try {
    const result = await Task.updateMany(
      { "Project._id": new mongoose.Types.ObjectId(ProjectId) },
      {
        $pull: {
          Members: { _id: new mongoose.Types.ObjectId(UserId) },
        },
      },
    );

    return result.modifiedCount;
  } catch (error) {
    throw error;
  }
}

module.exports = { deleteTask, removeMember };
