const dashBroadService = require("../services/dashBroad.Service");

const dashBroadAdmin = async (req, res) => {
  try {
    let data = await dashBroadService.dashBroadAdmin();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>> Error show admin dash broad (Controller): " + error);
    return res.status(500).json({
      EM: "Error show admin dash broad (Controller): " + error,
      EC: 1,
    });
  }
};

const dashBroadCoordinator = async (req, res) => {
  try {
    let data = await dashBroadService.dashBroadCoordinator();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>> Error show coordinator dash broad (Controller): " + error);
    return res.status(500).json({
      EM: "Error show coordinator dash broad (Controller): " + error,
      EC: 1,
    });
  }
};

module.exports = {
  dashBroadAdmin,
  dashBroadCoordinator,
};
