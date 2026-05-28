const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const bcrypt = require('bcryptjs');
const { connectDB, sequelize } = require('../config/db');
const Admin = require('../models/Admin');

async function main() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || 'admin@siare.org';
  const plainPassword = process.env.ADMIN_PASSWORD || 'password123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existingAdmin = await Admin.findOne({ where: { email } });

  if (existingAdmin) {
    await existingAdmin.update({
      password: hashedPassword,
      name: process.env.ADMIN_NAME || existingAdmin.name || 'Super Admin',
      role: 'superadmin',
    });
  } else {
    await Admin.create({
      email,
      password: hashedPassword,
      name: process.env.ADMIN_NAME || 'Super Admin',
      role: 'superadmin',
    });
  }

  console.log('Admin account seeded:');
  console.log(`Email: ${email}`);
  console.log(`Password: ${plainPassword}`);

  await sequelize.close();
  process.exit(0);
}

main().catch(async (error) => {
  console.error(error);
  await sequelize.close().catch(() => {});
  process.exit(1);
});
