const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const multer = require('multer');

const uploadDir = process.env.UPLOAD_DIR || path.resolve(__dirname, '..', 'uploads');
const maxUploadSize = Number(process.env.MAX_UPLOAD_SIZE || 15 * 1024 * 1024);

fs.mkdirSync(uploadDir, { recursive: true });

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]);

const extensionByMimeType = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'application/pdf': '.pdf',
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const ext = extensionByMimeType[file.mimetype] || path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxUploadSize,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return callback(new Error('Only JPG, PNG, WEBP, GIF, and PDF files are allowed'));
    }

    return callback(null, true);
  },
});

module.exports = {
  upload,
  uploadDir,
};
