const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  type: { type: DataTypes.ENUM('conference','workshop', 'webinar'), allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT('long'),
  speaker: DataTypes.STRING,
  instructor: DataTypes.STRING,
  date: DataTypes.STRING,
  time: DataTypes.STRING,
  location: DataTypes.STRING,
  link: DataTypes.STRING,
  status: DataTypes.STRING,
  color: { type: DataTypes.STRING, defaultValue: 'bg-slate-500' },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  imageUrl: DataTypes.TEXT('long'),
});

module.exports = Event;
