const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const jsonDefault = (value) => ({ type: DataTypes.JSON, defaultValue: value });

const WorkshopDetail = sequelize.define('WorkshopDetail', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  eventId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
  basic: jsonDefault({}),
  hero: jsonDefault({}),
  infoBar: jsonDefault({}),
  about: jsonDefault({ objectives: [], benefits: [] }),
  outcomes: jsonDefault([]),
  facilitators: jsonDefault([]),
  targetAudience: jsonDefault([]),
  registrations: jsonDefault([]),
  highlights: jsonDefault([]),
  timeline: jsonDefault([]),
  organizer: jsonDefault({}),
  schedule: jsonDefault([]),
  certificates: jsonDefault({ resourceLinks: [], recordedSessionUrls: [] }),
  mediaGallery: jsonDefault({ images: [], videos: [], enabled: true }),
  testimonials: jsonDefault([]),
  sponsors: jsonDefault([]),
  cta: jsonDefault({}),
  seo: jsonDefault({}),
  socialSharing: jsonDefault({}),
  controls: jsonDefault({ publishStatus: 'draft', visibility: 'private', archive: false, featured: false, sortOrder: 0 }),
});

module.exports = WorkshopDetail;
