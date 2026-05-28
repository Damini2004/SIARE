const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Inquiry = sequelize.define('Inquiry', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: DataTypes.STRING,
  institution: DataTypes.STRING,
  subject: DataTypes.STRING,
  purpose: DataTypes.STRING,
  tier: DataTypes.STRING,
  message: { type: DataTypes.TEXT('long'), allowNull: true },
  aboutDetails: DataTypes.TEXT('long'),
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

module.exports = Inquiry;
