const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MembershipTier = sequelize.define('MembershipTier', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  icon: DataTypes.STRING,
  priceINR: { type: DataTypes.STRING, allowNull: false },
  priceUSD: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  benefits: { type: DataTypes.JSON, defaultValue: [] },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = MembershipTier;
