# ProductListingService

Product Listing microservice for Online Grocery Mart Platform. Provides REST APIs to list, search, filter, and sort products stored in PostgreSQL.

Features:
- Express.js backend with modular structure
- PostgreSQL via node-postgres Pool
- OpenAPI/Swagger docs at /docs
- API key security using X-API-KEY header (optional via environment)
- Pagination, search, filter (category, brand, price range), sort (price, popularity, ratings)

Environment
- Copy .env.example to .env and set values.
- Do not commit secrets.

Database
- PostgreSQL is required. Provide connection via DATABASE_URL or discrete PG* env vars.
- See db/migrations/001_init_products.sql for reference schema (includes helpful columns for sorting).

Run
- Install: npm install
- Dev: npm run dev
- Start: npm start
- Docs: visit /docs after starting the server

API
- GET /products with query params:
  - search: string
  - category: string
  - brand: string
  - priceRange: string pattern "min-max"
  - sortBy: one of price, popularity, ratings
  - page: integer >= 1
  - pageSize: integer [1, 100]

Security
- If API_KEY_VALUE is set, clients must send header X-API-KEY with the configured value.
- If not set, auth check is disabled (for local development).

Notes
- Ensure the products table contains expected columns: id, name, price, description, images (text[]), availability, category, brand, popularity, ratings.
