'use strict';
const { pool } = require('../config/db');
const { toApiProduct } = require('../models/product');

/**
 * Build WHERE clauses and params based on the query options.
 */
function buildFilters({ search, category, brand, priceRange }) {
  const clauses = [];
  const params = [];
  let idx = 1;

  if (search) {
    // Use ILIKE for case-insensitive search over name and description
    clauses.push(`(name ILIKE $${idx} OR description ILIKE $${idx})`);
    params.push(`%${search}%`);
    idx += 1;
  }
  if (category) {
    clauses.push(`category = $${idx}`);
    params.push(category);
    idx += 1;
  }
  if (brand) {
    clauses.push(`brand = $${idx}`);
    params.push(brand);
    idx += 1;
  }
  if (priceRange) {
    const [minStr, maxStr] = String(priceRange).split('-');
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);
    if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0 || min > max) {
      const error = new Error('Invalid priceRange. Expected format: min-max with non-negative numbers and min <= max.');
      error.status = 400;
      throw error;
    }
    clauses.push(`price >= $${idx} AND price <= $${idx + 1}`);
    params.push(min, max);
    idx += 2;
  }

  const whereSql = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  return { whereSql, params };
}

/**
 * Validate and map sortBy to column
 */
function resolveSort(sortBy) {
  switch (sortBy) {
    case 'price':
      return 'price';
    case 'popularity':
      return 'popularity';
    case 'ratings':
      return 'ratings';
    default:
      return null;
  }
}

// PUBLIC_INTERFACE
async function listProducts(options) {
  /**
   * Retrieve products with search, filtering, sorting, and pagination.
   * options: { search, category, brand, priceRange, sortBy, page, pageSize }
   * Returns: { products, totalCount, page, pageSize }
   */
  const {
    search,
    category,
    brand,
    priceRange,
    sortBy,
    page = 1,
    pageSize = 20,
  } = options || {};

  if (page <= 0) {
    const e = new Error('Invalid page. Must be >= 1.');
    e.status = 400;
    throw e;
  }
  if (pageSize <= 0 || pageSize > 100) {
    const e = new Error('Invalid pageSize. Must be between 1 and 100.');
    e.status = 400;
    throw e;
  }

  const { whereSql, params } = buildFilters({ search, category, brand, priceRange });
  const sortCol = resolveSort(sortBy);

  const orderBySql = sortCol ? `ORDER BY ${sortCol} ASC` : 'ORDER BY name ASC';
  const offset = (page - 1) * pageSize;

  // Count query
  const countSql = `SELECT COUNT(*)::int AS count FROM products ${whereSql};`;

  // Data query - select columns used by model
  const dataSql = `
    SELECT id, name, price, description, images, availability, category, brand, popularity, ratings
    FROM products
    ${whereSql}
    ${orderBySql}
    LIMIT $${params.length + 1}
    OFFSET $${params.length + 2};
  `;

  const client = await pool.connect();
  try {
    const countRes = await client.query(countSql, params);
    const totalCount = countRes.rows[0]?.count || 0;

    const dataParams = params.slice();
    dataParams.push(pageSize, offset);
    const dataRes = await client.query(dataSql, dataParams);

    const products = dataRes.rows.map(toApiProduct);
    return {
      products,
      totalCount,
      page,
      pageSize,
    };
  } finally {
    client.release();
  }
}

module.exports = {
  listProducts,
};
