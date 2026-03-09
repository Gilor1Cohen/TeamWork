const Project = require("./ProjectSchema");

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

module.exports = { deleteProject };
