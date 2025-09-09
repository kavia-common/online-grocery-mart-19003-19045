'use strict';
/**
 * Environment configuration loader.
 * Loads and validates required env vars for this service.
 */
const path = require('path');
const dotenv = require('dotenv');

// Load .env from project root if present
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000', 10),
  // Database configuration - do not hardcode; all via env
  db: {
    url: process.env.DATABASE_URL || null,
    host: process.env.PGHOST,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : undefined,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: process.env.PGSSL ? process.env.PGSSL.toLowerCase() === 'true' : undefined,
    max: process.env.PGPOOL_MAX ? parseInt(process.env.PGPOOL_MAX, 10) : 10,
    idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT ? parseInt(process.env.PG_IDLE_TIMEOUT, 10) : 30000,
    connectionTimeoutMillis: process.env.PG_CONN_TIMEOUT ? parseInt(process.env.PG_CONN_TIMEOUT, 10) : 5000,
  },
  // Simple API key security (aligns with OpenAPI securityScheme apiKeyAuth)
  apiKeyHeader: process.env.API_KEY_HEADER || 'X-API-KEY',
  apiKeyValue: process.env.API_KEY_VALUE || '', // optional; if empty, security disabled
};

module.exports = config;
