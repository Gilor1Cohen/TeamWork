const Project = require("./ProjectSchema");

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

module.exports = { NewProject };
