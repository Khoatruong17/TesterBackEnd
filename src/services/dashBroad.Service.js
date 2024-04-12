const ContributionModel = require("../models/contributionModel");
const TopicModel = require("../models/topicModel");
const FacultyModel = require("../models/facultyModel");

const dashBroadAdmin = async (req, res) => {
  try {
    const adminDashboard = [];
    const dashbroadTopic = [];
    const dashbroadFaculty = [];
    const contributionCount = await ContributionModel.countDocuments();
    const topic = await TopicModel.find();
    const sumTopic = await TopicModel.countDocuments();

    for (const item of topic) {
      const contributionbyTopic = await ContributionModel.countDocuments({
        topic_id: item._id,
      });
      const percentage = (
        (contributionbyTopic / contributionCount) *
        100
      ).toFixed(2);
      const faculty = await FacultyModel.findById(item.faculty_id);
      if (faculty) {
        dashbroadTopic.push({
          topic_name: item.name,
          faculty_name: faculty.faculty_name,
          contribution_count: contributionbyTopic,
          percent: percentage + "%",
        });
      }
      dashbroadTopic.push({
        topic_name: item.name,
        contribution_count: contributionbyTopic,
        percent: percentage + "%",
      });
    }

    const faculty = await FacultyModel.find();
    for (const item of faculty) {
      const contributionbyFaculty = await ContributionModel.countDocuments({
        faculty_id: item._id,
      });
      const percentage = (
        (contributionbyFaculty / contributionCount) *
        100
      ).toFixed(2);
      const uniqueContributors = await ContributionModel.distinct("user_id", {
        faculty_id: item._id,
      });
      dashbroadFaculty.push({
        faculty_name: item.faculty_name,
        contribution_count: contributionbyFaculty,
        unique_contributors: uniqueContributors.length,
        percent: percentage + "%",
      });
    }

    const currentDate = new Date();
    const twoWeeksAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 14)
    );

    const contributionsNoComments = await ContributionModel.find({
      comments: { $size: 0 },
    });

    const contributionsNoRecentComments = await ContributionModel.find({
      "comments.createdAt": { $lte: twoWeeksAgo },
      comments: { $size: 0 },
    });

    adminDashboard.push({
      Sum_of_Contribution: contributionCount,
      topic: {
        Sum_of_Topic: sumTopic,
        dashbroadTopic,
      },
      faculty: {
        Sum_of_Faculty: faculty.length,
        dashbroadFaculty,
      },
      contributions_no_comments: contributionsNoComments.length, // Add contributions with no comments
      contributions_no_comments_apter14days:
        contributionsNoRecentComments.length, // Add contributions with no comments in the last 14 days
    });
    return {
      EM: "Export information successfully",
      EC: 0,
      DT: adminDashboard,
    };
  } catch (error) {
    console.log(">> Dash broad admin error (service): " + error);
    res.status(500).json({
      EM: "Export information fail ",
      EC: 1,
    });
  }
};

const dashBroadCoordinator = async (decoded) => {
  try {
    console.log(decoded);
    return {
      EM: "Export information successfully",
      EC: 0,
      DT: "",
      status: 200,
    };
  } catch (error) {
    console.log(">> Dash broad coordinator error (service): " + error);
    res.status(500).json({
      EM: "Export information fail ",
      EC: 1,
    });
  }
};

module.exports = {
  dashBroadAdmin,
  dashBroadCoordinator,
};
