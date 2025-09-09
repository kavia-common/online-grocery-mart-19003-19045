-- Example schema for products table. This is provided for reference and initial setup.
-- Do NOT hardcode credentials; run this using your configured PostgreSQL.
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  description TEXT,
  images TEXT[] DEFAULT '{}',
  availability BOOLEAN NOT NULL DEFAULT true,
  category TEXT,
  brand TEXT,
  popularity INTEGER DEFAULT 0,
  ratings NUMERIC(3,2) DEFAULT 0
);

-- Optional sample data for local testing
-- INSERT INTO products (name, price, description, images, availability, category, brand, popularity, ratings)
-- VALUES
-- ('Organic Apples', 3.99, 'Fresh organic apples', ARRAY['https://example.com/img/apple.jpg'], true, 'Fruits', 'NatureFresh', 100, 4.5),
-- ('Bananas', 1.29, 'Ripe bananas', ARRAY['https://example.com/img/banana.jpg'], true, 'Fruits', 'Tropicana', 80, 4.2);
