'use strict';
const config = require('../config/env');

/**
 * Simple API key header check middleware.
 * If API_KEY_VALUE is not set, middleware is a no-op (security disabled for dev).
 */
function apiKeyAuth(req, res, next) {
  if (!config.apiKeyValue) {
    return next();
  }
  const headerName = config.apiKeyHeader || 'X-API-KEY';
  const provided = req.get(headerName);
  if (provided && provided === config.apiKeyValue) {
    return next();
  }
  return res.status(401).json({ code: 401, message: 'Unauthorized - API key missing or invalid' });
}

module.exports = apiKeyAuth;
