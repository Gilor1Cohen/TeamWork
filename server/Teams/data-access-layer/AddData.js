const Team = require("./TeamSchema");

async function NewTeam(Title, Description) {
  try {
    const add = Team.create({ TeamName: Title, Description });

    return add;
  } catch (error) {
    throw new Error("Error occurred while adding team");
  }
}

module.exports = { NewTeam };
