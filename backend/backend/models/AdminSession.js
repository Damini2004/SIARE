const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AdminSession = sequelize.define('AdminSession', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  jti: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  adminId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = AdminSession;
