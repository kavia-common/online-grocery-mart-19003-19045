'use strict';
const productService = require('../services/productService');

// PUBLIC_INTERFACE
async function getProducts(req, res, next) {
  /** Controller for GET /products */
  try {
    const {
      search,
      category,
      brand,
      priceRange,
      sortBy,
      page,
      pageSize,
    } = req.query;

    const parsed = {
      search,
      category,
      brand,
      priceRange,
      sortBy,
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    };

    const result = await productService.listProducts(parsed);
    return res.status(200).json(result);
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ code: 400, message: err.message });
    }
    return next(err);
  }
}

module.exports = {
  getProducts,
};
