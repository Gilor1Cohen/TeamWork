const Task = require("./TaskSchema");

async function NewTask(Title, Description, DueDate, Project) {
  try {
    const newTask = Task.create({
      TaskTitle: Title,
      Description,
      DueDate,
      Project,
    });

    return newTask;
  } catch (error) {
    throw new Error("Error occurred while adding task");
  }
}

module.exports = { NewTask };
