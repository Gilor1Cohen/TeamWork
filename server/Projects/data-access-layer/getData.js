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
    const project = await Project.findOne(
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

module.exports = { projectsByUser, getProjectData };
