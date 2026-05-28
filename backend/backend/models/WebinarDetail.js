const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const jsonDefault = (value) => ({ type: DataTypes.JSON, defaultValue: value });

const WebinarDetail = sequelize.define('WebinarDetail', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  eventId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
  basic: jsonDefault({}),
  hero: jsonDefault({}),
  infoBar: jsonDefault({}),
  about: jsonDefault({ objective: [], benefits: [] }),
  topics: jsonDefault([]),
  speakers: jsonDefault([]),
  joiningSteps: jsonDefault([]),
  registrations: jsonDefault([]),
  targetAudience: jsonDefault([]),
  highlights: jsonDefault([]),
  organizer: jsonDefault({ socialLinks: [] }),
  platform: jsonDefault({}),
  resources: jsonDefault({ resourcePdfs: [], eCertificateConfig: {} }),
  faqs: jsonDefault([]),
  mediaGallery: jsonDefault({ images: [], videos: [], enabled: true }),
  cta: jsonDefault({}),
  seo: jsonDefault({ structuredData: {} }),
  socialSharing: jsonDefault({}),
  analytics: jsonDefault({ attendanceTracking: false, webinarAnalytics: {}, engagementMetrics: {} }),
  controls: jsonDefault({ publishStatus: 'draft', visibility: 'private', featured: false, archive: false, sortOrder: 0 }),
});

module.exports = WebinarDetail;
