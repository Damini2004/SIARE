const Inquiry = require("../models/Inquiry");
const sendInquiryMail = require("../utils/sendMail");

// PUBLIC: CREATE INQUIRY
exports.createInquiry = async (req, res) => {
  try {
    console.log("CONTACT API HIT:", req.body);

    const inquiry = await Inquiry.create(req.body);

    console.log("DB SAVED:", inquiry.id);

    const mailInfo = await sendInquiryMail(req.body);

    console.log("MAIL SENT:", mailInfo.response);

    return res.status(201).json({
      success: true,
      message: "Inquiry saved and mail sent successfully",
      data: inquiry,
      mail: mailInfo.response,
    });
  } catch (error) {
    console.error("INQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Inquiry saved/mail failed",
      error: error.message,
    });
  }
};

// ADMIN: GET ALL INQUIRIES
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("GET INQUIRIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries",
      error: error.message,
    });
  }
};

// ADMIN: DELETE INQUIRY
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    await inquiry.destroy();

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("DELETE INQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete inquiry",
      error: error.message,
    });
  }
};