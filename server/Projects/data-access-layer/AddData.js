const Project = require("./ProjectSchema");

async function NewProject(Title, Description, DueDate, Team) {
  try {
    const add = Project.create({
      ProjectName: Title,
      Description,
      DueDate,
      Team,
    });

    return add;
  } catch (error) {
    throw new Error("Error occurred while adding project");
  }
}

module.exports = { NewProject };
