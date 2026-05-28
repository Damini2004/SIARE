const multer = require('multer');

function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(error, _req, res, _next) {
  const isUploadError = error instanceof multer.MulterError
    || error.message === 'Only JPG, PNG, WEBP, GIF, and PDF files are allowed';
  const statusCode = error.statusCode || (isUploadError || error.name === 'ValidationError' ? 400 : 500);

  if (process.env.NODE_ENV !== 'test') {
    console.error(error);
  }

  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal server error' : error.message,
  });
}

module.exports = {
  errorHandler,
  notFound,
};
