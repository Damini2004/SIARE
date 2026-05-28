require("dotenv").config();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const { connectDB } = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const footerContactRoutes = require("./routes/footerContactRoutes");
const publicRoutes = require("./routes/publicRoutes");
const memberRoutes = require("./routes/memberRoutes");
const webinarRoutes = require("./routes/webinarRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const recentViewRoutes = require("./routes/recentViewRoutes");

const { errorHandler, notFound } = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiters");
const { requireAuth } = require("./middleware/auth");
const { csrfProtection, issueCsrfToken } = require("./middleware/csrf");
const { uploadDir } = require("./middleware/upload");

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = (
  process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:9002,http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: process.env.JSON_LIMIT || "10mb" }));
app.use(express.urlencoded({ extended: true, limit: process.env.JSON_LIMIT || "10mb" }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(
  "/uploads",
  express.static(uploadDir, {
    maxAge: process.env.NODE_ENV === "production" ? "7d" : 0,
  })
);

app.use("/api", apiLimiter);
app.get("/api/csrf-token", issueCsrfToken);
app.use("/api", collaborationRoutes);
// IMPORTANT: inquiryRoutes must come before publicRoutes
app.use("/api", inquiryRoutes);
app.use("/api", footerContactRoutes);

app.use("/api/admin", csrfProtection, adminRoutes);
app.use("/api", publicRoutes);
app.use("/api/members", memberRoutes);
app.use("/", webinarRoutes);

app.use(
  "/api/admin/recent-views",
  csrfProtection,
  requireAuth,
  recentViewRoutes
);

app.use(notFound);
app.use(errorHandler);

console.log("SERVER FILE RUNNING");

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express backend running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start server:", error);
    process.exit(1);
  });

module.exports = app;