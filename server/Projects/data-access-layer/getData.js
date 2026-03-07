const Project = require("./ProjectSchema");
const mongoose = require("mongoose");

async function projectsByUser(UserId) {
  try {
    const projects = await Project.find({
      Members: new mongoose.Types.ObjectId(UserId),
    });

    return projects;
  } catch (error) {
    throw new Error("Failed to fetch projects by user");
  }
}

module.exports = { projectsByUser };
