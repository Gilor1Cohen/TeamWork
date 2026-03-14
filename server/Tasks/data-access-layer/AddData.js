const Task = require("./TaskSchema");
const mongoose = require("mongoose");

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

async function addMember(Name, Role, UserId, ProjectId) {
  try {
    const add = await Task.updateMany(
      { "Project._id": new mongoose.Types.ObjectId(ProjectId) },
      {
        $addToSet: {
          Members: {
            _id: UserId,
            Name: Name,
            Role: Role,
          },
        },
      },
    );

    return add.modifiedCount;
  } catch (error) {
    throw error;
  }
}

module.exports = { NewTask, addMember };
