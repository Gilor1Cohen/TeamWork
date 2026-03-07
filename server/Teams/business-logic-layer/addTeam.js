const { NewTeam } = require("../data-access-layer/AddData");

async function addTeam(Title, Description) {
  return NewTeam(Title, Description);
}

module.exports = { addTeam };
