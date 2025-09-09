'use strict';
/**
 * Product model mapping helpers.
 * The DB schema is assumed with columns:
 *   id (uuid/text), name (text), price (numeric), description (text),
 *   images (text[]), availability (boolean), category (text), brand (text),
 *   popularity (int), ratings (numeric)
 */

// PUBLIC_INTERFACE
function toApiProduct(row) {
  /** Map a DB row to API Product schema. */
  return {
    id: String(row.id),
    name: row.name,
    price: typeof row.price === 'string' ? parseFloat(row.price) : row.price,
    description: row.description || '',
    images: Array.isArray(row.images) ? row.images : [],
    availability: !!row.availability,
    // Additional helpful fields for clients (not required but useful)
    category: row.category || null,
    brand: row.brand || null,
    popularity: typeof row.popularity === 'number' ? row.popularity : (row.popularity ? parseInt(row.popularity, 10) : null),
    ratings: typeof row.ratings === 'number' ? row.ratings : (row.ratings ? parseFloat(row.ratings) : null),
  };
}

module.exports = {
  toApiProduct,
};
