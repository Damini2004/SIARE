const Collaboration = require("../models/Collaboration");

exports.createCollaboration = async (req, res) => {
  try {
    const item = await Collaboration.create(req.body);

    res.status(201).json({
      success: true,
      message: "Collaboration created successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCollaborations = async (req, res) => {
  try {
    const items = await Collaboration.findAll({
      order: [["sortOrder", "ASC"], ["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCollaboration = async (req, res) => {
  try {
    const item = await Collaboration.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Collaboration not found",
      });
    }

    await item.update(req.body);

    res.status(200).json({
      success: true,
      message: "Collaboration updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCollaboration = async (req, res) => {
  try {
    const item = await Collaboration.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Collaboration not found",
      });
    }

    await item.destroy();

    res.status(200).json({
      success: true,
      message: "Collaboration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};