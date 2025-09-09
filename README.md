# online-grocery-mart-19003-19045

This workspace contains multiple backend services. For ProductListingService, ensure you provide PostgreSQL connection details via environment variables:

- DATABASE_URL or PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, PGSSL
- Optional pool tuning: PGPOOL_MAX, PG_IDLE_TIMEOUT, PG_CONN_TIMEOUT

See ProductListingService/README.md and ProductListingService/.env.example for details.