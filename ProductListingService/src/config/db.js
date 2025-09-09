'use strict';
/**
 * PostgreSQL database pool configuration using node-postgres.
 * Supports DATABASE_URL or discrete PG* environment variables.
 */
const { Pool } = require('pg');
const config = require('./env');

// Build pool config
let poolConfig;
if (config.db.url) {
  poolConfig = {
    connectionString: config.db.url,
    ssl: config.db.ssl ? { rejectUnauthorized: false } : false,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis,
    connectionTimeoutMillis: config.db.connectionTimeoutMillis,
  };
} else {
  poolConfig = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    ssl: config.db.ssl ? { rejectUnauthorized: false } : false,
    max: config.db.max,
    idleTimeoutMillis: config.db.idleTimeoutMillis,
    connectionTimeoutMillis: config.db.connectionTimeoutMillis,
  };
}

const pool = new Pool(poolConfig);

// Health check helper
async function ping() {
  const res = await pool.query('SELECT 1');
  return res && res.rows ? true : false;
}

module.exports = { pool, ping };
