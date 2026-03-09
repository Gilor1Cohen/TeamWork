const Task = require("./TaskSchema");

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

module.exports = { deleteTask };
