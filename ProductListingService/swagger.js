const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Listing API',
      version: '1.0.0',
      description: 'API for product catalog listing, search, filtering, and sorting.',
    },
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-KEY',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['id', 'name', 'price', 'availability'],
          properties: {
            id: { type: 'string', description: 'Unique identifier for the product' },
            name: { type: 'string', description: 'Name of the product' },
            price: { type: 'number', format: 'float', description: 'Price of the product' },
            description: { type: 'string', description: 'Detailed description of the product' },
            images: {
              type: 'array',
              description: 'List of product images',
              items: { type: 'string', format: 'uri', description: 'URL of product image' },
            },
            availability: { type: 'boolean', description: 'Availability status of the product' },
            category: { type: 'string', description: 'Product category' },
            brand: { type: 'string', description: 'Product brand' },
            popularity: { type: 'integer', description: 'Popularity score' },
            ratings: { type: 'number', format: 'float', description: 'Average ratings' },
          },
        },
        ErrorResponse: {
          type: 'object',
          required: ['code', 'message'],
          properties: {
            code: { type: 'integer', description: 'Error code' },
            message: { type: 'string', description: 'Error message' },
          },
        },
      },
    },
    tags: [
      { name: 'Products', description: 'Product listing and search' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
