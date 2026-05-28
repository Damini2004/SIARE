const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Journal = sequelize.define('Journal', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT('long'),
  issn: DataTypes.STRING,
  domain: DataTypes.STRING,
  indexing: { type: DataTypes.JSON, defaultValue: [] },
  link: DataTypes.STRING,
  imageUrl: DataTypes.TEXT('long'),
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Journal;
