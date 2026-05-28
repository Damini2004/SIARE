const FooterContact = require("../models/FooterContact");

exports.getFooterContacts = async (_req, res) => {
  try {
    const data = await FooterContact.findAll({
      where: { isActive: true },
      order: [["order", "ASC"], ["createdAt", "ASC"]],
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createFooterContact = async (req, res) => {
  try {
    const data = await FooterContact.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateFooterContact = async (req, res) => {
  try {
    const item = await FooterContact.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Not found" });

    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteFooterContact = async (req, res) => {
  try {
    const item = await FooterContact.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Not found" });

    await item.destroy();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};