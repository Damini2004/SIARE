function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter((field) => !String(req.body?.[field] || '').trim());

    if (missing.length) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    next();
  };
}

function validateBody(schema, options = {}) {
  const { partial = false } = options;

  return (req, res, next) => {
    const activeSchema = partial ? schema.partial() : schema;
    const result = activeSchema.safeParse(req.body || {});

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
}

module.exports = {
  requireFields,
  validateBody,
};
