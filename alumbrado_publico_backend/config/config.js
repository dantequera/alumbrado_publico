// config/config.js
require('dotenv').config();

const common = {
  username: process.env.DB_USER || process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'alumbrado_publico',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: (process.env.DB_LOGGING === 'true') ? console.log : false,
  pool: {
    max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX, 10) : 5,
    min: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN, 10) : 0,
    acquire: process.env.DB_POOL_ACQUIRE ? parseInt(process.env.DB_POOL_ACQUIRE, 10) : 30000,
    idle: process.env.DB_POOL_IDLE ? parseInt(process.env.DB_POOL_IDLE, 10) : 10000
  }
};

module.exports = {
  development: common,
  test: {
    ...common,
    database: process.env.DB_NAME_TEST || `${common.database}_test`
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
