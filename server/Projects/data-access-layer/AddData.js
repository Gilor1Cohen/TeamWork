const Project = require("./ProjectSchema");
const mongoose = require("mongoose");

async function NewProject(Title, Description, DueDate, Team) {
  try {
    const add = await Project.create({
      ProjectName: Title,
      Description,
      DueDate,
      Team: [
        {
          _id: Team.id,
          Name: Team.name,
        },
      ],
      Members: [],
    });

    return add;
  } catch (error) {
    throw new Error("Error occurred while adding project");
  }
}

async function addMember(Name, Role, UserId, TeamId) {
  try {
    const add = await Project.updateMany(
      { "Team._id": new mongoose.Types.ObjectId(TeamId) },
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

module.exports = { NewProject, addMember };
