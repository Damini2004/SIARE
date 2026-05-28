const Member = require("../models/Member");

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      attributes: [
        "id",
        "memberCode",
        "name",
        "designation",
        "email",
        "department",
        "phone",
        "imageUrl",
        "scopus",
        "orcid",
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      data: members,
      count: members.length,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};