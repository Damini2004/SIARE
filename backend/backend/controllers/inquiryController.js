// backend/controllers/inquiryController.js

const Inquiry = require("../models/Inquiry");
const sendInquiryMail = require("../utils/sendMail");

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