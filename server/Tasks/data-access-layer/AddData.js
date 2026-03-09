const Task = require("./TaskSchema");

async function NewTask(Title, Description, DueDate, Project) {
  try {
    const newTask = await Task.create({
      TaskTitle: Title,
      Description,
      DueDate,
      Project: [
        {
          _id: Project.id,
          Name: Project.name,
        },
      ],
      Members: [],
    });

    return newTask;
  } catch (error) {
    throw new Error("Error occurred while adding task");
  }
}

module.exports = { NewTask };
