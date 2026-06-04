/*
  # Create Orders Schema for Crispyandeals

  ## New Tables

  ### orders
  - `id` (uuid, primary key)
  - `user_id` (uuid, FK to auth.users)
  - `total_amount` (numeric) - total price of the order
  - `status` (text) - 'pending', 'confirmed', 'delivered'
  - `created_at` (timestamptz)

  ### order_items
  - `id` (uuid, primary key)
  - `order_id` (uuid, FK to orders)
  - `item_name` (text) - name of the food item
  - `item_price` (numeric) - price per item
  - `quantity` (integer) - number of items
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on both tables
  - Users can only read/insert their own orders
  - Users can read/insert order items for their own orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount numeric(10, 2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  item_name text NOT NULL DEFAULT '',
  item_price numeric(10, 2) NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view order items for own orders"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert order items for own orders"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
