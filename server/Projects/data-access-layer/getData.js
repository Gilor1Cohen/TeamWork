const Project = require("./ProjectSchema");
const mongoose = require("mongoose");

async function projectsByUser(UserId) {
  try {
    const projects = await Project.find({
      "Members._id": new mongoose.Types.ObjectId(UserId),
    }).lean();

    return projects;
  } catch (error) {
    throw new Error("Failed to fetch projects by user");
  }
}

async function getProjectData(TeamId) {
  try {
    const project = await Project.find(
      { "Team._id": new mongoose.Types.ObjectId(TeamId) },
      {
        Description: 0,
        Members: 0,
        DueDate: 0,
        Team: 0,
        ProjectName: 0,
      },
    );

    return project;
  } catch (error) {
    throw new Error("Failed to fetch projects by user");
  }
}

async function getProjectMembers(ProjectId) {
  try {
    const objectId = new mongoose.Types.ObjectId(ProjectId);

    const project = await Project.findOne(
      { _id: objectId },
      { Members: 1, _id: 0 },
    ).lean();

    return project.Members;
  } catch (error) {
    throw new Error("Failed to fetch projects by user");
  }
}

async function countProjectsByTeam(TeamId) {
  try {
    const count = await Project.countDocuments({
      "Team._id": new mongoose.Types.ObjectId(TeamId),
    });

    return count;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  projectsByUser,
  getProjectData,
  getProjectMembers,
  countProjectsByTeam,
};
