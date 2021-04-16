'use strict';

const { Client: DBClient } = require('pg');

const dbConfig = {
  user: process.env.ENV_USER || 'undefined ENV_USER',
  host: process.env.ENV_HOST || 'undefined ENV_HOST',
  database: process.env.ENV_DB || 'undefined ENV_DB',
  password: process.env.ENV_PASSWORD || 'undefined ENV_PASSWORD',
  port: 5432,
  ssl: {
    sslmode: 'require',
    rejectUnauthorized: false
  }
};

module.exports = {
  DBClient,
  dbConfig,
};
