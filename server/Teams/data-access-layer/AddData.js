const Team = require("./TeamSchema");

async function NewTeam(Title, Description) {
  try {
    const add = await Team.create({
      TeamName: Title,
      Description,
      Members: [],
    });

    return add;
  } catch (error) {
    throw new Error("Error occurred while adding team");
  }
}

async function addMember(Name, Role, UserId, TeamId) {
  try {
    const add = await Team.findByIdAndUpdate(
      TeamId,
      {
        $push: {
          Members: {
            _id: UserId,
            Name: Name,
            Role: Role,
          },
        },
      },
      { new: true },
    );

    return add;
  } catch (error) {
    throw error;
  }
}

module.exports = { NewTeam, addMember };
