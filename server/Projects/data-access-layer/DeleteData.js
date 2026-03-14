const Project = require("./ProjectSchema");
const mongoose = require("mongoose");

async function deleteProject(id) {
  try {
    const deleteOneProject = await Project.findByIdAndDelete(id);

    if (!deleteOneProject) {
      throw new Error("Project not found");
    }

    return deleteOneProject;
  } catch (error) {
    throw error;
  }
}

async function removeMember(UserId, TeamId) {
  try {
    const member = await Project.updateMany(
      { "Team._id": new mongoose.Types.ObjectId(TeamId) },
      {
        $pull: {
          Members: { _id: new mongoose.Types.ObjectId(UserId) },
        },
      },
    );

    return member.modifiedCount;
  } catch (error) {
    throw error;
  }
}

module.exports = { deleteProject, removeMember };
