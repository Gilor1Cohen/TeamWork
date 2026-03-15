const Dashboard = require("./DashboardSchema");
const mongoose = require("mongoose");

async function addNewDashboard(UserId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      throw new Error("Invalid UserId");
    }

    const data = await Dashboard.create({
      UserId: new mongoose.Types.ObjectId(UserId),
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function addNewTeam(UserId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      throw new Error("Invalid UserId");
    }

    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Teams.Total": 1,
          "Teams.TotalMembers": 1,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function addNewProject(UserId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      throw new Error("Invalid UserId");
    }

    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Projects.Total": 1,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function addNewTeamMember(UserId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      throw new Error("Invalid UserId");
    }

    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Teams.TotalMembers": 1,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function removeProject(UserId) {
  try {
    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Projects.Total": -1,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function addNewTask(UserId) {
  try {
    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Task.Total": 1,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function removeTask(UserId) {
  try {
    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Task.Total": -1,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function addNewProjectBy(UserId, By) {
  try {
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      throw new Error("Invalid UserId");
    }

    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Projects.Total": By,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

async function addNewTaskBy(UserId, By) {
  try {
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      throw new Error("Invalid UserId");
    }

    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Task.Total": By,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addNewDashboard,
  addNewTeam,
  addNewProject,
  addNewTeamMember,
  removeProject,
  addNewTask,
  removeTask,
  addNewProjectBy,
  addNewTaskBy,
};
