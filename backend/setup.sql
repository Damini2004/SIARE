-- ============================================================
-- SIARE Database Setup Script
-- Run this in MySQL Workbench, DBeaver, or mysql CLI
-- ============================================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS siare
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Step 2: Switch to the database
USE siare;

-- Note: Tables are auto-created by Sequelize (DB_SYNC=true in backend .env)
-- Run the backend once and all tables will be created automatically.
--
-- If you deploy with DB_SYNC=false, create the AdminSessions table manually:
--
-- CREATE TABLE IF NOT EXISTS AdminSessions (
--   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--   jti VARCHAR(255) NOT NULL UNIQUE,
--   adminId INT UNSIGNED NOT NULL,
--   expiresAt DATETIME NOT NULL,
--   revokedAt DATETIME NULL,
--   createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE IF NOT EXISTS WorkshopDetails (
--   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--   eventId INT UNSIGNED NOT NULL UNIQUE,
--   basic JSON,
--   hero JSON,
--   infoBar JSON,
--   about JSON,
--   outcomes JSON,
--   facilitators JSON,
--   targetAudience JSON,
--   registrations JSON,
--   highlights JSON,
--   timeline JSON,
--   organizer JSON,
--   schedule JSON,
--   certificates JSON,
--   mediaGallery JSON,
--   testimonials JSON,
--   sponsors JSON,
--   cta JSON,
--   seo JSON,
--   socialSharing JSON,
--   controls JSON,
--   createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- Step 3: (Optional) Seed an admin user manually
-- The backend script `npm run seed:admin` handles this automatically.
-- If you want to do it manually, after starting the backend once (tables created), run:
--
-- INSERT INTO Admins (name, email, password, role, createdAt, updatedAt)
-- VALUES (
--   'Super Admin',
--   'admin@siare.org',
--   '$2b$10$Dn.kP08XYNvKXm44ayv4aOQ7xpkUWQ5RHI2MW7vUkPESqO4ZZpqta',  -- hashed "Admin@1234"
--   'super_admin',
--   NOW(),
--   NOW()
-- );
--
-- Default login:
-- Email: admin@siare.org
-- Password: Admin@1234

-- ============================================================
-- Verify setup
-- ============================================================
SHOW TABLES;
