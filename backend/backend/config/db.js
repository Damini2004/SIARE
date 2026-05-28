const path = require('path');
const { Sequelize } = require('sequelize');

let sequelize;

// Support a lightweight local SQLite fallback for development when desired.
if (process.env.DB_CLIENT === 'sqlite') {
  const storage = process.env.SQLITE_STORAGE || path.resolve(__dirname, '..', 'data', 'dev.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage,
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    define: { underscored: false },
  });
} else {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'siare',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT || 3306),
      dialect: 'mysql',
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
      define: { underscored: false },
    }
  );
}

async function connectDB() {
  await sequelize.authenticate();

  // Creates missing tables in development without dropping existing data.
  if (process.env.DB_SYNC !== 'false') {
    await sequelize.sync();
  }

  console.log(process.env.DB_CLIENT === 'sqlite' ? 'SQLite connected' : 'MySQL connected');
}

module.exports = {
  connectDB,
  sequelize,
};
