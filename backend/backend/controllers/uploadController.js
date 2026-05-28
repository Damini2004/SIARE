function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'File is required' });
  }

  const url = `/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    url,
    absoluteUrl: `${req.protocol}://${req.get('host')}${url}`,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
}

module.exports = {
  uploadFile,
};
