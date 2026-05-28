const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PricingPlan = sequelize.define('PricingPlan', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  priceINR: { type: DataTypes.STRING, allowNull: false },
  priceUSD: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  features: { type: DataTypes.JSON, defaultValue: [] },
  cta: DataTypes.STRING,
  highlight: { type: DataTypes.BOOLEAN, defaultValue: false },
  tag: DataTypes.STRING,
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = PricingPlan;
